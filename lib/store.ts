import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  completedChapters: Set<number>;
  completedExercises: Set<string>;
  currentChapter: number;
  apiKey: string;
  toggleChapterComplete: (chapterId: number) => void;
  toggleExerciseComplete: (exerciseId: string) => void;
  setCurrentChapter: (chapterId: number) => void;
  setApiKey: (key: string) => void;
  reset: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      completedChapters: new Set<number>(),
      completedExercises: new Set<string>(),
      currentChapter: 1,
      apiKey: '',
      toggleChapterComplete: (chapterId) =>
        set((state) => {
          const newCompleted = new Set(state.completedChapters);
          if (newCompleted.has(chapterId)) {
            newCompleted.delete(chapterId);
          } else {
            newCompleted.add(chapterId);
          }
          return { completedChapters: newCompleted };
        }),
      toggleExerciseComplete: (exerciseId) =>
        set((state) => {
          const newCompleted = new Set(state.completedExercises);
          if (newCompleted.has(exerciseId)) {
            newCompleted.delete(exerciseId);
          } else {
            newCompleted.add(exerciseId);
          }
          return { completedExercises: newCompleted };
        }),
      setCurrentChapter: (chapterId) => set({ currentChapter: chapterId }),
      setApiKey: (key) => set({ apiKey: key }),
      reset: () =>
        set({
          completedChapters: new Set(),
          completedExercises: new Set(),
          currentChapter: 1,
        }),
    }),
    {
      name: 'prompt-engineering-progress',
      partialize: (state) => ({
        completedChapters: Array.from(state.completedChapters),
        completedExercises: Array.from(state.completedExercises),
        currentChapter: state.currentChapter,
        apiKey: state.apiKey,
      }),
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        ...persistedState,
        completedChapters: new Set(persistedState?.completedChapters || []),
        completedExercises: new Set(persistedState?.completedExercises || []),
      }),
    }
  )
);
