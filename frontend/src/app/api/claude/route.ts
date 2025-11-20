import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// Initialize Anthropic client
const getAnthropicClient = (apiKey?: string) => {
  const key = apiKey || process.env.ANTHROPIC_API_KEY;
  if (!key) {
    throw new Error('Anthropic API key is required');
  }
  return new Anthropic({ apiKey: key });
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      prompt,
      systemPrompt,
      model = process.env.NEXT_PUBLIC_DEFAULT_MODEL || 'claude-3-haiku-20240307',
      maxTokens = parseInt(process.env.NEXT_PUBLIC_MAX_TOKENS || '2000'),
      temperature = parseFloat(process.env.NEXT_PUBLIC_TEMPERATURE || '0.0'),
      userApiKey,
    } = body;

    // Validate required fields
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    // Get API key from request or environment
    let apiKey = userApiKey;
    if (!apiKey && process.env.ANTHROPIC_API_KEY) {
      apiKey = process.env.ANTHROPIC_API_KEY;
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required. Please provide your Anthropic API key.' },
        { status: 401 }
      );
    }

    // Initialize client with appropriate API key
    const client = getAnthropicClient(apiKey);

    // Make request to Claude
    const startTime = Date.now();
    const message = await client.messages.create({
      model,
      max_tokens: maxTokens,
      temperature,
      system: systemPrompt || undefined,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseTime = Date.now() - startTime;

    // Extract text content
    const content = message.content[0];
    const text = content.type === 'text' ? content.text : '';

    // Return formatted response
    return NextResponse.json({
      id: message.id,
      content: text,
      model: message.model,
      stopReason: message.stop_reason,
      usage: {
        inputTokens: message.usage.input_tokens,
        outputTokens: message.usage.output_tokens,
      },
      timestamp: new Date().toISOString(),
      responseTime,
    });
  } catch (error) {
    console.error('Claude API error:', error);

    // Handle specific error types
    if (error instanceof Anthropic.APIError) {
      const status = error.status || 500;
      const message = error.message || 'An error occurred while calling Claude API';

      // Check for specific error types
      if (status === 401) {
        return NextResponse.json(
          { error: 'Invalid API key. Please check your Anthropic API key.' },
          { status: 401 }
        );
      }

      if (status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: message },
        { status }
      );
    }

    // Generic error
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
}
