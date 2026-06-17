import { create } from "zustand";
import type { ProgressData } from "@/types";

interface ProgressState {
  completedTopics: Set<string>;
  passedQuizzes: Set<string>;
  solvedProblems: Set<string>;
  initialized: boolean;

  init(): void;
  markTopicComplete(id: string): void;
  markQuizPassed(id: string): void;
  markProblemSolved(id: string): void;
  isTopicComplete(id: string): boolean;
  isQuizPassed(id: string): boolean;
  isProblemSolved(id: string): boolean;
  completedCount(): number;
  passedCount(): number;
  solvedCount(): number;
}

const STORAGE_KEY = "pa_progress";

function persist(state: {
  completedTopics: Set<string>;
  passedQuizzes: Set<string>;
  solvedProblems: Set<string>;
}) {
  const data: ProgressData = {
    completedTopics: [...state.completedTopics],
    passedQuizzes: [...state.passedQuizzes],
    solvedProblems: [...state.solvedProblems],
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  completedTopics: new Set(),
  passedQuizzes: new Set(),
  solvedProblems: new Set(),
  initialized: false,

  init() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data: ProgressData = JSON.parse(raw);
        set({
          completedTopics: new Set(data.completedTopics ?? []),
          passedQuizzes: new Set(data.passedQuizzes ?? []),
          solvedProblems: new Set(data.solvedProblems ?? []),
          initialized: true,
        });
        return;
      }
    } catch {
      // ignore malformed storage
    }
    set({ initialized: true });
  },

  markTopicComplete(id) {
    set((s) => {
      const completedTopics = new Set(s.completedTopics).add(id);
      persist({ ...s, completedTopics });
      return { completedTopics };
    });
  },

  markQuizPassed(id) {
    set((s) => {
      const passedQuizzes = new Set(s.passedQuizzes).add(id);
      persist({ ...s, passedQuizzes });
      return { passedQuizzes };
    });
  },

  markProblemSolved(id) {
    set((s) => {
      const solvedProblems = new Set(s.solvedProblems).add(id);
      persist({ ...s, solvedProblems });
      return { solvedProblems };
    });
  },

  isTopicComplete: (id) => get().completedTopics.has(id),
  isQuizPassed: (id) => get().passedQuizzes.has(id),
  isProblemSolved: (id) => get().solvedProblems.has(id),
  completedCount: () => get().completedTopics.size,
  passedCount: () => get().passedQuizzes.size,
  solvedCount: () => get().solvedProblems.size,
}));
