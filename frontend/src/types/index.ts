// Core data models for the Prompt Engineering Tutorial

export type ChapterDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'appendix';

export type ExerciseStatus = 'not-started' | 'in-progress' | 'completed' | 'failed';

export interface Chapter {
  id: string;
  number: number;
  title: string;
  slug: string;
  difficulty: ChapterDifficulty;
  description: string;
  lessonContent: string; // MDX content
  examples: Example[];
  exercises: Exercise[];
  estimatedTime: number; // minutes
  prerequisiteChapters?: string[]; // chapter IDs
  learningObjectives: string[];
}

export interface Example {
  id: string;
  title: string;
  description: string;
  prompt: string;
  systemPrompt?: string;
  expectedResponse?: string;
  editable: boolean;
  showSystemPrompt?: boolean;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  instructions: string;
  starterPrompt?: string;
  starterSystemPrompt?: string;
  hints: Hint[];
  solution?: Solution;
  gradingCriteria: GradingCriteria;
  testCases?: TestCase[];
  maxAttempts?: number;
}

export interface Hint {
  id: string;
  level: number; // 1, 2, 3 - progressive hints
  content: string;
  unlockAfterAttempts?: number;
}

export interface Solution {
  prompt: string;
  systemPrompt?: string;
  explanation: string;
  codeExample?: string;
}

export interface GradingCriteria {
  type: 'regex' | 'contains' | 'custom' | 'ai-evaluated';
  pattern?: string | RegExp;
  keywords?: string[];
  customFunction?: string; // Function name for custom grading
  aiPrompt?: string; // For AI-based evaluation
  passingScore?: number;
}

export interface TestCase {
  id: string;
  description: string;
  input: string;
  expectedOutput?: string;
  evaluationCriteria: GradingCriteria;
}

// User and Progress Types

export interface User {
  id: string;
  email?: string;
  apiKey?: string; // Encrypted, stored securely
  hasApiKey: boolean;
  useDemoMode: boolean;
  createdAt: Date;
  lastActive: Date;
}

export interface UserProgress {
  userId: string;
  completedChapters: string[];
  completedExercises: string[];
  currentChapter: string;
  currentExercise?: string;
  exerciseAttempts: Record<string, ExerciseAttempt[]>;
  totalTimeSpent: number; // minutes
  streakDays: number;
  lastStudyDate: Date;
  achievements: Achievement[];
}

export interface ExerciseAttempt {
  id: string;
  exerciseId: string;
  timestamp: Date;
  prompt: string;
  systemPrompt?: string;
  response: string;
  passed: boolean;
  score?: number;
  feedback: string;
  hintsUsed: string[]; // hint IDs
  timeSpent: number; // seconds
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: 'progress' | 'mastery' | 'streak' | 'exploration';
}

// API and Claude Types

export interface ClaudeRequest {
  prompt: string;
  systemPrompt?: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface ClaudeResponse {
  id: string;
  content: string;
  model: string;
  stopReason: string;
  usage: {
    inputTokens: number;
    outputTokens: number;
  };
  timestamp: Date;
}

export interface ApiError {
  message: string;
  type: 'validation' | 'authentication' | 'rate-limit' | 'server' | 'network';
  code?: string;
  details?: unknown;
}

// UI State Types

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  autoSavePrompts: boolean;
  showHintsAutomatically: boolean;
  enableSoundEffects: boolean;
  enableAnimations: boolean;
}

export interface PlaygroundState {
  prompt: string;
  systemPrompt: string;
  model: string;
  maxTokens: number;
  temperature: number;
  isLoading: boolean;
  response?: ClaudeResponse;
  error?: ApiError;
  history: PlaygroundHistoryEntry[];
}

export interface PlaygroundHistoryEntry {
  id: string;
  timestamp: Date;
  prompt: string;
  systemPrompt?: string;
  response: ClaudeResponse;
  saved: boolean;
  tags?: string[];
}

// Content and Navigation Types

export interface TableOfContents {
  sections: ToCSection[];
}

export interface ToCSection {
  title: string;
  difficulty: ChapterDifficulty;
  chapters: ToCChapter[];
}

export interface ToCChapter {
  id: string;
  number: number;
  title: string;
  slug: string;
  isCompleted: boolean;
  isLocked: boolean;
  progress: number; // 0-100
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

// Grading and Feedback Types

export interface GradingResult {
  passed: boolean;
  score: number; // 0-100
  feedback: string;
  suggestions?: string[];
  correctAspects?: string[];
  incorrectAspects?: string[];
}

// Export utility types

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
