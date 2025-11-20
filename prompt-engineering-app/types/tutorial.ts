export interface Exercise {
  id: string;
  title: string;
  description: string;
  initialPrompt?: string;
  initialSystemPrompt?: string;
  hint?: string;
  solution?: string;
  validateFunction: string; // JavaScript function as string
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface CodeExample {
  id: string;
  title: string;
  prompt: string;
  systemPrompt?: string;
  expectedOutput?: string;
}

export interface Chapter {
  id: number;
  title: string;
  slug: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'appendix';
  content: {
    introduction: string;
    keyPoints: string[];
    examples: CodeExample[];
  };
  exercises: Exercise[];
  nextChapter?: number;
  previousChapter?: number;
}

export interface UserProgress {
  completedChapters: number[];
  completedExercises: string[];
  currentChapter: number;
}
