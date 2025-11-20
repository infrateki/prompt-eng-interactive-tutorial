/**
 * Client-side Claude API wrapper
 */

import { ClaudeRequest, ClaudeResponse, ApiError } from '@/types';
import { storage } from './storage';

/**
 * Call Claude API through our Next.js API route
 */
export async function callClaude(
  request: ClaudeRequest
): Promise<ClaudeResponse> {
  const apiKey = storage.getApiKey();

  try {
    const response = await fetch('/api/claude', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: request.prompt,
        systemPrompt: request.systemPrompt,
        model: request.model,
        maxTokens: request.maxTokens,
        temperature: request.temperature,
        userApiKey: apiKey,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw createApiError(errorData.error, response.status);
    }

    const data = await response.json();
    return {
      id: data.id,
      content: data.content,
      model: data.model,
      stopReason: data.stopReason,
      usage: data.usage,
      timestamp: new Date(data.timestamp),
    };
  } catch (error) {
    if (error instanceof Error && 'type' in error) {
      throw error; // Re-throw API errors
    }

    // Network or other errors
    throw createApiError(
      error instanceof Error ? error.message : 'Network error occurred',
      0,
      'network'
    );
  }
}

/**
 * Create a standardized API error
 */
function createApiError(
  message: string,
  status: number,
  type?: ApiError['type']
): ApiError {
  let errorType: ApiError['type'] = type || 'server';

  if (status === 401) {
    errorType = 'authentication';
  } else if (status === 429) {
    errorType = 'rate-limit';
  } else if (status === 400) {
    errorType = 'validation';
  } else if (status === 0) {
    errorType = 'network';
  }

  const error: ApiError = {
    message,
    type: errorType,
  };

  return error;
}

/**
 * Validate API key format (basic check)
 */
export function validateApiKey(apiKey: string): boolean {
  // Anthropic API keys start with "sk-ant-" and are followed by alphanumeric characters
  const pattern = /^sk-ant-[a-zA-Z0-9-_]+$/;
  return pattern.test(apiKey);
}

/**
 * Check API health
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch('/api/claude', {
      method: 'GET',
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Estimate token count (rough approximation)
 * Note: This is a simplified version. For accurate counts, use the Anthropic tokenizer
 */
export function estimateTokenCount(text: string): number {
  // Rough estimate: ~4 characters per token for English text
  return Math.ceil(text.length / 4);
}

/**
 * Check if prompt + response will exceed token limit
 */
export function willExceedTokenLimit(
  prompt: string,
  systemPrompt: string = '',
  maxTokens: number = 2000
): { willExceed: boolean; estimatedTotal: number; limit: number } {
  const promptTokens = estimateTokenCount(prompt + systemPrompt);
  const estimatedTotal = promptTokens + maxTokens;
  const limit = 200000; // Claude 3 Haiku context window

  return {
    willExceed: estimatedTotal > limit,
    estimatedTotal,
    limit,
  };
}
