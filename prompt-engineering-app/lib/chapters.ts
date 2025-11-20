import { Chapter } from '@/types/tutorial';

export const chapters: Chapter[] = [
  {
    id: 1,
    title: 'Basic Prompt Structure',
    slug: 'basic-prompt-structure',
    difficulty: 'beginner',
    description: 'Learn the fundamental structure of prompts and how to format them correctly for Claude.',
    content: {
      introduction: `Anthropic offers a Messages API for interacting with Claude. At minimum, a call to Claude requires:

- **model**: the API model name
- **max_tokens**: maximum tokens to generate
- **messages**: an array of user/assistant messages

You can also use optional parameters like:
- **system**: system prompt for context and instructions
- **temperature**: degree of variability (0 = deterministic)`,
      keyPoints: [
        'Messages must alternate between user and assistant roles',
        'First message must always be from the user',
        'System prompts provide context and guidelines to Claude',
        'Use system prompts to improve Claude\'s performance',
      ],
      examples: [
        {
          id: 'ex1-1',
          title: 'Simple Greeting',
          prompt: 'Hi Claude, how are you?',
        },
        {
          id: 'ex1-2',
          title: 'Factual Question',
          prompt: 'Can you tell me the color of the ocean?',
        },
        {
          id: 'ex1-3',
          title: 'With System Prompt',
          prompt: 'Why is the sky blue?',
          systemPrompt: 'Your answer should always be a series of critical thinking questions that further the conversation (do not provide answers to your questions). Do not actually answer the user question.',
        },
      ],
    },
    exercises: [
      {
        id: 'ex1-1',
        title: 'Counting to Three',
        description: 'Get Claude to count to three using proper user/assistant formatting.',
        initialPrompt: 'Count to three',
        difficulty: 'easy',
        hint: 'The grading function is looking for an answer that contains the exact Arabic numerals "1", "2", and "3". You can often get Claude to do what you want simply by asking.',
        validateFunction: `(text) => {
          return text.includes('1') && text.includes('2') && text.includes('3');
        }`,
      },
      {
        id: 'ex1-2',
        title: 'System Prompt',
        description: 'Modify the system prompt to make Claude respond like a 3 year old child.',
        initialPrompt: 'How big is the sky?',
        initialSystemPrompt: 'You are a helpful assistant.',
        difficulty: 'easy',
        hint: 'The grading function is looking for answers that contain "soo" or "giggles". There are many ways to solve this, just by asking!',
        validateFunction: `(text) => {
          return /giggles/i.test(text) || /soo/i.test(text) || /sooo/i.test(text);
        }`,
      },
    ],
    nextChapter: 2,
  },
  {
    id: 2,
    title: 'Being Clear and Direct',
    slug: 'being-clear-and-direct',
    difficulty: 'beginner',
    description: 'Claude responds best to clear and direct instructions. Learn how to communicate effectively.',
    content: {
      introduction: `Claude responds best to clear and direct instructions. Think of Claude like any other human that is new to the job. Claude has no context on what to do aside from what you literally tell it.

**Golden Rule of Clear Prompting:**
Show your prompt to a colleague or friend and have them follow the instructions themselves. If they're confused, Claude's confused.`,
      keyPoints: [
        'Be explicit about what you want',
        'Don\'t assume Claude knows your preferences',
        'Ask directly for specific formats or behaviors',
        'The clearer you are, the better Claude performs',
      ],
      examples: [
        {
          id: 'ex2-1',
          title: 'Haiku - Basic',
          prompt: 'Write a haiku about robots.',
        },
        {
          id: 'ex2-2',
          title: 'Haiku - Direct',
          prompt: 'Write a haiku about robots. Skip the preamble; go straight into the poem.',
        },
        {
          id: 'ex2-3',
          title: 'Basketball - Vague',
          prompt: 'Who is the best basketball player of all time?',
        },
        {
          id: 'ex2-4',
          title: 'Basketball - Direct',
          prompt: 'Who is the best basketball player of all time? Yes, there are differing opinions, but if you absolutely had to pick one player, who would it be?',
        },
      ],
    },
    exercises: [
      {
        id: 'ex2-1',
        title: 'Spanish',
        description: 'Modify the system prompt to make Claude output its answer in Spanish.',
        initialPrompt: 'Hello Claude, how are you?',
        initialSystemPrompt: '',
        difficulty: 'easy',
        hint: 'The grading function is looking for any answer that includes the word "hola". Ask Claude to reply in Spanish like you would when speaking with a human.',
        validateFunction: `(text) => {
          return /hola/i.test(text);
        }`,
      },
      {
        id: 'ex2-2',
        title: 'One Player Only',
        description: 'Get Claude to respond with ONLY the name of one specific player, with no other words or punctuation.',
        initialPrompt: 'Who is the best basketball player of all time?',
        difficulty: 'medium',
        hint: 'The grading function is looking for EXACTLY "Michael Jordan". How would you ask another human to do this? Reply with no other words? Reply with only the name and nothing else?',
        validateFunction: `(text) => {
          return text.trim() === 'Michael Jordan';
        }`,
      },
      {
        id: 'ex2-3',
        title: 'Write a Story',
        description: 'Get Claude to respond with as long a response as you can. Over 800 words will be graded as correct.',
        initialPrompt: 'Write a story',
        difficulty: 'medium',
        hint: 'Because LLMs aren\'t great at counting words yet, you may have to overshoot your target. Ask for a very detailed, long story with specific elements.',
        validateFunction: `(text) => {
          const words = text.trim().split(/\\s+/).length;
          return words >= 800;
        }`,
      },
    ],
    previousChapter: 1,
    nextChapter: 3,
  },
  {
    id: 3,
    title: 'Assigning Roles (Role Prompting)',
    slug: 'assigning-roles',
    difficulty: 'beginner',
    description: 'Learn how to use role prompting to improve Claude\'s performance and change its response style.',
    content: {
      introduction: `Role prompting is the technique of telling Claude to inhabit a specific role. This can improve Claude's performance in various fields and change the style, tone, and manner of responses.

Role prompting can happen either in the system prompt or as part of the user message turn.`,
      keyPoints: [
        'Role prompting can improve performance in specific domains',
        'It changes Claude\'s tone, style, and approach',
        'More detailed role context yields better results',
        'Can make Claude better at math, logic, and specialized tasks',
        'Consider adding audience context as well',
      ],
      examples: [
        {
          id: 'ex3-1',
          title: 'Skateboarding - No Role',
          prompt: 'In one sentence, what do you think about skateboarding?',
        },
        {
          id: 'ex3-2',
          title: 'Skateboarding - As a Cat',
          prompt: 'In one sentence, what do you think about skateboarding?',
          systemPrompt: 'You are a cat.',
        },
        {
          id: 'ex3-3',
          title: 'Logic Problem - No Role',
          prompt: 'Jack is looking at Anne. Anne is looking at George. Jack is married, George is not, and we don\'t know if Anne is married. Is a married person looking at an unmarried person?',
        },
        {
          id: 'ex3-4',
          title: 'Logic Problem - Logic Bot',
          prompt: 'Jack is looking at Anne. Anne is looking at George. Jack is married, George is not, and we don\'t know if Anne is married. Is a married person looking at an unmarried person?',
          systemPrompt: 'You are a logic bot designed to answer complex logic problems.',
        },
      ],
    },
    exercises: [
      {
        id: 'ex3-1',
        title: 'Math Correction',
        description: 'Make Claude grade a math solution as incorrectly solved using role prompting.',
        initialPrompt: `Is this equation solved correctly below?

2x - 3 = 9
2x = 6
x = 3`,
        initialSystemPrompt: '',
        difficulty: 'easy',
        hint: 'Give Claude a role that might make it better at solving math problems! The grading function is looking for the words "incorrect" or "not correct".',
        validateFunction: `(text) => {
          return /incorrect/i.test(text) || /not correct/i.test(text);
        }`,
      },
    ],
    previousChapter: 2,
    nextChapter: 4,
  },
  {
    id: 4,
    title: 'Separating Data from Instructions',
    slug: 'separating-data-from-instructions',
    difficulty: 'intermediate',
    description: 'Use XML tags to clearly separate data from instructions and improve Claude\'s accuracy.',
    content: {
      introduction: `When your prompt includes both instructions and data that the instructions should apply to, it's crucial to separate them clearly. XML tags are an excellent way to do this.

This technique prevents Claude from getting confused about what to do versus what to process.`,
      keyPoints: [
        'XML tags create clear boundaries between different parts of your prompt',
        'Helps Claude distinguish instructions from data',
        'Reduces errors and increases accuracy',
        'Makes prompts more maintainable and readable',
        'Use semantic tag names that describe the content',
      ],
      examples: [
        {
          id: 'ex4-1',
          title: 'Without XML Tags',
          prompt: 'Please write a haiku about robots.',
        },
        {
          id: 'ex4-2',
          title: 'With XML Tags',
          prompt: `Please write a haiku about <topic>robots</topic>.`,
        },
        {
          id: 'ex4-3',
          title: 'Complex Data Separation',
          prompt: `<instructions>
Please analyze the following text and summarize it in one sentence.
</instructions>

<text>
Artificial intelligence is transforming the world in unprecedented ways. From healthcare to transportation, AI systems are becoming increasingly sophisticated and capable. However, with this power comes great responsibility.
</text>`,
        },
      ],
    },
    exercises: [
      {
        id: 'ex4-1',
        title: 'Haiku with Variable',
        description: 'Use XML tags and a variable placeholder to make Claude write a haiku about any topic.',
        initialPrompt: 'Write a haiku',
        difficulty: 'medium',
        hint: 'Include the exact phrase "{TOPIC}" wherever you want the topic to be substituted in. The grading function is looking for "haiku" and "pig".',
        validateFunction: `(text) => {
          return /haiku/i.test(text) && /pig/i.test(text);
        }`,
      },
    ],
    previousChapter: 3,
    nextChapter: 5,
  },
  {
    id: 5,
    title: 'Formatting Output & Speaking for Claude',
    slug: 'formatting-output',
    difficulty: 'intermediate',
    description: 'Learn to control output format and use prefilling to guide Claude\'s responses.',
    content: {
      introduction: `You can control how Claude formats its output and even "speak for Claude" by prefilling the assistant's response. This gives you fine-grained control over Claude's output structure.

Prefilling means providing the beginning of Claude's response, which Claude will then continue from.`,
      keyPoints: [
        'Use XML tags to request specific output formats',
        'Prefill Claude\'s response to control output structure',
        'Combine formatting requests with examples for best results',
        'Control verbosity and structure explicitly',
        'Prefilling can skip preambles and get straight to content',
      ],
      examples: [
        {
          id: 'ex5-1',
          title: 'JSON Output',
          prompt: `Please analyze this sentence and output JSON with sentiment and entities: "I love the new iPhone!"

Output format:
{`,
        },
        {
          id: 'ex5-2',
          title: 'XML Output',
          prompt: `Analyze this product review and wrap your analysis in XML tags.

Review: "This coffee maker is amazing! It makes perfect coffee every time and is easy to clean."

<analysis>`,
        },
      ],
    },
    exercises: [
      {
        id: 'ex5-1',
        title: 'Specific Answer Format',
        description: 'Use prefilling to make Claude give specific reasons why Stephen Curry is the best basketball player.',
        initialPrompt: 'Why is Stephen Curry the best basketball player of all time?',
        difficulty: 'medium',
        hint: 'The grading function is looking for "Warrior". Write more words in Claude\'s voice to steer it. For instance: "Stephen Curry is the best and here are three reasons why. 1:"',
        validateFunction: `(text) => {
          return /warrior/i.test(text);
        }`,
      },
    ],
    previousChapter: 4,
    nextChapter: 6,
  },
  {
    id: 6,
    title: 'Precognition (Thinking Step by Step)',
    slug: 'thinking-step-by-step',
    difficulty: 'intermediate',
    description: 'Guide Claude to think through problems step-by-step before answering.',
    content: {
      introduction: `Sometimes Claude performs better when you ask it to think step-by-step before providing an answer. This is especially useful for complex reasoning, analysis, or problem-solving tasks.

You can do this by asking Claude to think through the problem or by prefilling its response to start with "Let me think step by step:".`,
      keyPoints: [
        'Asking Claude to think step-by-step improves reasoning',
        'Especially useful for math, logic, and analysis tasks',
        'Can combine with prefilling to ensure step-by-step format',
        'Helps Claude avoid jumping to conclusions',
        'Makes reasoning transparent and verifiable',
      ],
      examples: [
        {
          id: 'ex6-1',
          title: 'Math Problem',
          prompt: 'What is 25% of 80? Think step by step.',
        },
        {
          id: 'ex6-2',
          title: 'Complex Analysis',
          prompt: `Analyze whether this argument is valid:

Premise 1: All mammals are warm-blooded.
Premise 2: All whales are mammals.
Conclusion: Therefore, all whales are warm-blooded.

Think through this step-by-step.`,
        },
      ],
    },
    exercises: [
      {
        id: 'ex6-1',
        title: 'Email Classification',
        description: 'Create a prompt that classifies emails into categories with step-by-step reasoning.',
        initialPrompt: 'Classify this email: "My product arrived broken."',
        difficulty: 'hard',
        hint: 'Include clear categories and ask Claude to think through the classification step-by-step.',
        validateFunction: `(text) => {
          return /broken/i.test(text) || /defective/i.test(text) || /b\\)/i.test(text);
        }`,
      },
    ],
    previousChapter: 5,
    nextChapter: 7,
  },
  {
    id: 7,
    title: 'Using Examples (Few-Shot Prompting)',
    slug: 'using-examples',
    difficulty: 'intermediate',
    description: 'Provide examples to Claude to demonstrate exactly what you want.',
    content: {
      introduction: `One of the most powerful techniques in prompt engineering is providing examples (few-shot prompting). Examples show Claude exactly what you want, including format, style, and reasoning.

Wrap examples in <example></example> tags to clearly separate them from the actual task.`,
      keyPoints: [
        'Examples are more powerful than instructions alone',
        'Use 2-5 examples for best results',
        'Show the exact format you want',
        'Examples teach style, tone, and reasoning patterns',
        'Wrap examples in XML tags to separate from real data',
      ],
      examples: [
        {
          id: 'ex7-1',
          title: 'Sentiment Analysis',
          prompt: `Classify the sentiment of movie reviews as positive or negative.

<examples>
Review: "This movie was amazing! Best film I've seen all year."
Sentiment: positive

Review: "Terrible waste of time. Would not recommend."
Sentiment: negative
</examples>

Review: "The cinematography was beautiful and the acting superb."
Sentiment:`,
        },
      ],
    },
    exercises: [
      {
        id: 'ex7-1',
        title: 'Email Classification with Examples',
        description: 'Improve email classification by providing clear examples.',
        initialPrompt: 'Classify this email: "How much does shipping cost?"',
        difficulty: 'hard',
        hint: 'Provide at least 2 example emails with their classifications. Make sure the format matches exactly what you want.',
        validateFunction: `(text) => {
          return /a\\)|pre-sale/i.test(text) || /category.*a/i.test(text);
        }`,
      },
    ],
    previousChapter: 6,
    nextChapter: 8,
  },
  {
    id: 8,
    title: 'Avoiding Hallucinations',
    slug: 'avoiding-hallucinations',
    difficulty: 'advanced',
    description: 'Learn techniques to reduce hallucinations and increase factual accuracy.',
    content: {
      introduction: `Hallucinations occur when Claude generates plausible-sounding but incorrect information. There are several techniques to minimize this:

1. Ask Claude to find quotes from source material first
2. Tell Claude to say "I don't know" when uncertain
3. Request step-by-step reasoning
4. Provide source material and ask Claude to cite it`,
      keyPoints: [
        'Have Claude extract relevant quotes before answering',
        'Explicitly permit "I don\'t know" responses',
        'Require citations to source material',
        'Use step-by-step reasoning to verify logic',
        'Separate quote extraction from answer generation',
      ],
      examples: [
        {
          id: 'ex8-1',
          title: 'Quote-First Method',
          prompt: `Based on this article, answer the question.

<article>
The company's revenue increased by 15% in Q3 2023, reaching $2.5 million.
</article>

Question: What was the revenue growth in Q3 2023?

First, find relevant quotes in <quotes></quotes> tags.
Then provide your answer in <answer></answer> tags.`,
        },
      ],
    },
    exercises: [
      {
        id: 'ex8-1',
        title: 'Unknown Information',
        description: 'Make Claude admit when it doesn\'t know something.',
        initialPrompt: 'What is the population of Atlantis?',
        difficulty: 'medium',
        hint: 'Tell Claude what it should do if it doesn\'t know the answer. The grading function looks for "I do not", "I don\'t", or "Unfortunately".',
        validateFunction: `(text) => {
          return /i do not/i.test(text) || /i don't/i.test(text) || /unfortunately/i.test(text);
        }`,
      },
    ],
    previousChapter: 7,
    nextChapter: 9,
  },
  {
    id: 9,
    title: 'Complex Prompts from Scratch',
    slug: 'complex-prompts',
    difficulty: 'advanced',
    description: 'Build sophisticated prompts for real-world use cases by combining all techniques.',
    content: {
      introduction: `Now it's time to combine everything you've learned to build complex, production-ready prompts. A well-structured complex prompt typically includes:

1. Role and context (system prompt)
2. Clear instructions
3. Data/input separated by XML tags
4. Examples of desired behavior
5. Output format specifications
6. Step-by-step reasoning requirements`,
      keyPoints: [
        'Combine multiple techniques for best results',
        'Structure prompts with clear sections',
        'Use XML tags liberally for organization',
        'Include examples for complex tasks',
        'Test and iterate on real data',
      ],
      examples: [
        {
          id: 'ex9-1',
          title: 'Customer Support Bot',
          prompt: `You are a helpful customer support assistant for TechCorp.

Your task is to answer customer questions based on our knowledge base.

<knowledge_base>
- Product warranty: 2 years
- Return policy: 30 days
- Support hours: 9am-5pm EST
</knowledge_base>

<examples>
Q: How long is the warranty?
A: Our products come with a 2-year warranty covering manufacturing defects.

Q: Can I return my purchase?
A: Yes, we offer a 30-day return policy on all products.
</examples>

Customer question: What are your support hours?

Answer:`,
          systemPrompt: 'You are a helpful customer support assistant.',
        },
      ],
    },
    exercises: [
      {
        id: 'ex9-1',
        title: 'Build a Code Review Bot',
        description: 'Create a comprehensive prompt for reviewing code and providing feedback.',
        initialPrompt: '',
        difficulty: 'hard',
        hint: 'Combine role prompting, examples, XML tags for structure, and step-by-step instructions.',
        validateFunction: `(text) => {
          return text.length > 100;
        }`,
      },
    ],
    previousChapter: 8,
  },
];
