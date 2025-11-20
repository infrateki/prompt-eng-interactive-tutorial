/**
 * Grading utilities for evaluating exercise submissions
 */

import { GradingCriteria, GradingResult } from '@/types';
import { matchesPattern, containsKeywords } from './utils';

/**
 * Grade a response based on grading criteria
 */
export function gradeResponse(
  response: string,
  criteria: GradingCriteria
): GradingResult {
  switch (criteria.type) {
    case 'regex':
      return gradeWithRegex(response, criteria);
    case 'contains':
      return gradeWithKeywords(response, criteria);
    case 'custom':
      return gradeWithCustomFunction(response, criteria);
    case 'ai-evaluated':
      return gradeWithAI(response, criteria);
    default:
      return {
        passed: false,
        score: 0,
        feedback: 'Invalid grading criteria type',
      };
  }
}

/**
 * Grade using regex pattern matching
 */
function gradeWithRegex(
  response: string,
  criteria: GradingCriteria
): GradingResult {
  if (!criteria.pattern) {
    return {
      passed: false,
      score: 0,
      feedback: 'No pattern specified for regex grading',
    };
  }

  const passed = matchesPattern(response, criteria.pattern);
  const score = passed ? 100 : 0;

  return {
    passed,
    score,
    feedback: passed
      ? 'Excellent! Your response matches the expected pattern.'
      : 'Your response doesn\'t match the expected pattern. Please try again.',
    suggestions: passed
      ? undefined
      : ['Review the exercise instructions', 'Check the hints for guidance'],
  };
}

/**
 * Grade using keyword matching
 */
function gradeWithKeywords(
  response: string,
  criteria: GradingCriteria
): GradingResult {
  if (!criteria.keywords || criteria.keywords.length === 0) {
    return {
      passed: false,
      score: 0,
      feedback: 'No keywords specified for grading',
    };
  }

  const lowerResponse = response.toLowerCase();
  const foundKeywords = criteria.keywords.filter((keyword) =>
    lowerResponse.includes(keyword.toLowerCase())
  );

  const score = Math.round((foundKeywords.length / criteria.keywords.length) * 100);
  const passed = score >= (criteria.passingScore || 50);

  const missingKeywords = criteria.keywords.filter(
    (keyword) => !foundKeywords.includes(keyword)
  );

  return {
    passed,
    score,
    feedback: passed
      ? `Great job! Your response includes ${foundKeywords.length} of ${criteria.keywords.length} expected elements.`
      : `Your response is missing some key elements. Found ${foundKeywords.length} of ${criteria.keywords.length} expected elements.`,
    correctAspects: foundKeywords.length > 0
      ? [`Includes: ${foundKeywords.join(', ')}`]
      : undefined,
    incorrectAspects: missingKeywords.length > 0
      ? [`Missing: ${missingKeywords.join(', ')}`]
      : undefined,
    suggestions: passed
      ? undefined
      : [
          'Check the hints for guidance',
          'Try incorporating the missing elements',
        ],
  };
}

/**
 * Grade using a custom function
 * Note: In production, this would execute sandboxed custom grading logic
 */
function gradeWithCustomFunction(
  response: string,
  criteria: GradingCriteria
): GradingResult {
  // Placeholder for custom grading logic
  return {
    passed: false,
    score: 0,
    feedback: 'Custom grading not yet implemented',
  };
}

/**
 * Grade using AI evaluation
 * Note: This would make an API call to evaluate the response
 */
function gradeWithAI(
  response: string,
  criteria: GradingCriteria
): GradingResult {
  // Placeholder for AI-based grading
  return {
    passed: false,
    score: 0,
    feedback: 'AI grading not yet implemented',
  };
}

/**
 * Generate feedback based on score
 */
export function generateFeedback(score: number): string {
  if (score >= 90) return 'Excellent work! You\'ve mastered this exercise.';
  if (score >= 70) return 'Good job! You\'re on the right track.';
  if (score >= 50) return 'Not bad, but there\'s room for improvement.';
  return 'Keep trying! Review the hints and lesson content.';
}

/**
 * Calculate overall exercise score
 */
export function calculateExerciseScore(attempts: number, hints: number): number {
  let score = 100;

  // Deduct points for multiple attempts (max 30 points)
  if (attempts > 1) {
    score -= Math.min((attempts - 1) * 10, 30);
  }

  // Deduct points for using hints (max 20 points)
  if (hints > 0) {
    score -= Math.min(hints * 10, 20);
  }

  return Math.max(score, 0);
}
