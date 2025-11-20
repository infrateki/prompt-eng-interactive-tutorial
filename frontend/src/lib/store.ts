/**
 * Global state management using Zustand
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  UserProgress,
  UserPreferences,
  ExerciseAttempt,
  PlaygroundState,
  ClaudeResponse,
  ApiError,
} from '@/types';
import { storage } from './storage';

// User Store
interface UserState {
  hasApiKey: boolean;
  useDemoMode: boolean;
  setApiKey: (apiKey: string) => void;
  clearApiKey: () => void;
  toggleDemoMode: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  hasApiKey: storage.hasApiKey(),
  useDemoMode: false,
  setApiKey: (apiKey: string) => {
    storage.setApiKey(apiKey);
    set({ hasApiKey: true });
  },
  clearApiKey: () => {
    storage.clearApiKey();
    set({ hasApiKey: false });
  },
  toggleDemoMode: () => set((state) => ({ useDemoMode: !state.useDemoMode })),
}));

// Progress Store
interface ProgressState extends UserProgress {
  completeChapter: (chapterId: string) => void;
  completeExercise: (exerciseId: string) => void;
  addExerciseAttempt: (exerciseId: string, attempt: ExerciseAttempt) => void;
  setCurrentChapter: (chapterId: string) => void;
  updateTimeSpent: (minutes: number) => void;
  resetProgress: () => void;
}

const initialProgress: UserProgress = {
  userId: 'anonymous',
  completedChapters: [],
  completedExercises: [],
  currentChapter: '01-basic-prompt-structure',
  exerciseAttempts: {},
  totalTimeSpent: 0,
  streakDays: 0,
  lastStudyDate: new Date(),
  achievements: [],
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      ...initialProgress,
      completeChapter: (chapterId) =>
        set((state) => ({
          completedChapters: [...new Set([...state.completedChapters, chapterId])],
        })),
      completeExercise: (exerciseId) =>
        set((state) => ({
          completedExercises: [...new Set([...state.completedExercises, exerciseId])],
        })),
      addExerciseAttempt: (exerciseId, attempt) =>
        set((state) => ({
          exerciseAttempts: {
            ...state.exerciseAttempts,
            [exerciseId]: [...(state.exerciseAttempts[exerciseId] || []), attempt],
          },
        })),
      setCurrentChapter: (chapterId) =>
        set({ currentChapter: chapterId }),
      updateTimeSpent: (minutes) =>
        set((state) => ({
          totalTimeSpent: state.totalTimeSpent + minutes,
        })),
      resetProgress: () => set(initialProgress),
    }),
    {
      name: 'pet-progress',
    }
  )
);

// Preferences Store
interface PreferencesState extends UserPreferences {
  setTheme: (theme: UserPreferences['theme']) => void;
  setFontSize: (fontSize: UserPreferences['fontSize']) => void;
  toggleAutoSave: () => void;
  toggleHints: () => void;
  toggleSoundEffects: () => void;
  toggleAnimations: () => void;
}

const defaultPreferences: UserPreferences = storage.getDefaultPreferences();

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      ...defaultPreferences,
      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
      toggleAutoSave: () => set((state) => ({ autoSavePrompts: !state.autoSavePrompts })),
      toggleHints: () => set((state) => ({ showHintsAutomatically: !state.showHintsAutomatically })),
      toggleSoundEffects: () => set((state) => ({ enableSoundEffects: !state.enableSoundEffects })),
      toggleAnimations: () => set((state) => ({ enableAnimations: !state.enableAnimations })),
    }),
    {
      name: 'pet-preferences',
    }
  )
);

// Playground Store
interface PlaygroundStore extends PlaygroundState {
  setPrompt: (prompt: string) => void;
  setSystemPrompt: (systemPrompt: string) => void;
  setModel: (model: string) => void;
  setMaxTokens: (maxTokens: number) => void;
  setTemperature: (temperature: number) => void;
  setLoading: (isLoading: boolean) => void;
  setResponse: (response: ClaudeResponse) => void;
  setError: (error: ApiError | undefined) => void;
  reset: () => void;
}

const initialPlaygroundState: PlaygroundState = {
  prompt: '',
  systemPrompt: '',
  model: process.env.NEXT_PUBLIC_DEFAULT_MODEL || 'claude-3-haiku-20240307',
  maxTokens: parseInt(process.env.NEXT_PUBLIC_MAX_TOKENS || '2000'),
  temperature: parseFloat(process.env.NEXT_PUBLIC_TEMPERATURE || '0.0'),
  isLoading: false,
  history: [],
};

export const usePlaygroundStore = create<PlaygroundStore>((set) => ({
  ...initialPlaygroundState,
  setPrompt: (prompt) => set({ prompt }),
  setSystemPrompt: (systemPrompt) => set({ systemPrompt }),
  setModel: (model) => set({ model }),
  setMaxTokens: (maxTokens) => set({ maxTokens }),
  setTemperature: (temperature) => set({ temperature }),
  setLoading: (isLoading) => set({ isLoading }),
  setResponse: (response) => set({ response, error: undefined }),
  setError: (error) => set({ error, response: undefined }),
  reset: () => set(initialPlaygroundState),
}));
