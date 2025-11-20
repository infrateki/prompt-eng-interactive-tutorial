/**
 * Content management utilities for loading and parsing course content
 */

import { Chapter, Exercise, Example } from '@/types';

/**
 * Sample chapter data - In production, this would be loaded from MDX files
 * or a CMS. For now, we'll use static data as a placeholder.
 */
export const chapters: Chapter[] = [
  {
    id: '01-basic-prompt-structure',
    number: 1,
    title: 'Basic Prompt Structure',
    slug: '01-basic-prompt-structure',
    difficulty: 'beginner',
    description: 'Learn the fundamental structure of effective prompts using the Messages API',
    lessonContent: `# Chapter 1: Basic Prompt Structure

## Introduction

Welcome to the first chapter of the Prompt Engineering Interactive Tutorial! In this lesson, you'll learn the foundational elements of crafting effective prompts for Claude.

## The Messages API

Anthropic offers the Messages API for interacting with Claude. At minimum, a call to Claude requires:

- **model**: The API model name (e.g., claude-3-haiku-20240307)
- **max_tokens**: Maximum number of tokens to generate
- **messages**: An array of input messages with alternating user/assistant turns

## System Prompts

System prompts provide context and instructions to Claude before the main conversation. They help:
- Set the tone and behavior
- Provide guidelines and rules
- Define the role Claude should take

## Best Practices

1. Always start with a user message
2. Alternate between user and assistant roles
3. Use system prompts for context
4. Be clear and specific
5. Provide examples when needed`,
    examples: [
      {
        id: 'example-1-1',
        title: 'Simple Greeting',
        description: 'A basic example of greeting Claude',
        prompt: 'Hi Claude, how are you?',
        editable: true,
      },
      {
        id: 'example-1-2',
        title: 'Using System Prompt',
        description: 'Example of using a system prompt to modify behavior',
        prompt: 'Why is the sky blue?',
        systemPrompt: 'Your answer should always be a series of critical thinking questions that further the conversation (do not provide answers to your questions). Do not actually answer the user question.',
        showSystemPrompt: true,
        editable: true,
      },
    ],
    exercises: [
      {
        id: 'exercise-1-1',
        title: 'Counting to Three',
        description: 'Practice basic prompt structure',
        instructions: 'Write a prompt that gets Claude to count to three.',
        starterPrompt: 'Replace this text with your prompt',
        hints: [
          {
            id: 'hint-1-1-1',
            level: 1,
            content: 'Try asking Claude directly to perform the counting task.',
          },
          {
            id: 'hint-1-1-2',
            level: 2,
            content: 'Use clear, direct language like "Count from 1 to 3"',
          },
        ],
        solution: {
          prompt: 'Count to three.',
          explanation: 'A simple, direct prompt asking Claude to count from 1 to 3.',
        },
        gradingCriteria: {
          type: 'regex',
          pattern: '^(?=.*1)(?=.*2)(?=.*3).*$',
        },
      },
      {
        id: 'exercise-1-2',
        title: 'System Prompt Practice',
        description: 'Learn to use system prompts effectively',
        instructions: 'Modify the system prompt to make Claude respond like a 3-year-old child.',
        starterPrompt: 'How big is the sky?',
        starterSystemPrompt: 'Replace this with your system prompt',
        hints: [
          {
            id: 'hint-1-2-1',
            level: 1,
            content: 'Think about how a young child would speak - simple words, excitement, wonder.',
          },
          {
            id: 'hint-1-2-2',
            level: 2,
            content: 'Try: "You are a curious and excited 3-year-old child. Use simple words, express wonder, and maybe giggle!"',
          },
        ],
        solution: {
          systemPrompt: 'You are a curious and excited 3-year-old child. Use simple words, express lots of excitement and wonder, and speak in a playful way.',
          prompt: 'How big is the sky?',
          explanation: 'System prompts are great for role-playing and setting the tone of responses.',
        },
        gradingCriteria: {
          type: 'contains',
          keywords: ['giggles', 'soo', 'big', 'wow', '!'],
        },
      },
    ],
    estimatedTime: 15,
    learningObjectives: [
      'Understand the Messages API structure',
      'Learn to format user and assistant messages',
      'Master the use of system prompts',
      'Practice writing clear, effective prompts',
    ],
  },
  // More chapters would be added here
];

/**
 * Get all chapters
 */
export function getAllChapters(): Chapter[] {
  return chapters;
}

/**
 * Get a specific chapter by slug
 */
export function getChapterBySlug(slug: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.slug === slug);
}

/**
 * Get a specific chapter by ID
 */
export function getChapterById(id: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.id === id);
}

/**
 * Get the next chapter
 */
export function getNextChapter(currentSlug: string): Chapter | undefined {
  const currentIndex = chapters.findIndex((ch) => ch.slug === currentSlug);
  if (currentIndex === -1 || currentIndex === chapters.length - 1) {
    return undefined;
  }
  return chapters[currentIndex + 1];
}

/**
 * Get the previous chapter
 */
export function getPreviousChapter(currentSlug: string): Chapter | undefined {
  const currentIndex = chapters.findIndex((ch) => ch.slug === currentSlug);
  if (currentIndex <= 0) {
    return undefined;
  }
  return chapters[currentIndex - 1];
}

/**
 * Get chapters by difficulty
 */
export function getChaptersByDifficulty(difficulty: Chapter['difficulty']): Chapter[] {
  return chapters.filter((chapter) => chapter.difficulty === difficulty);
}

/**
 * Get total chapter count
 */
export function getTotalChapterCount(): number {
  return chapters.length;
}

/**
 * Get completion percentage
 */
export function getCompletionPercentage(completedChapterIds: string[]): number {
  if (chapters.length === 0) return 0;
  return Math.round((completedChapterIds.length / chapters.length) * 100);
}
