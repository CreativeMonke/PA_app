import { create } from "zustand";
import type { ProgressData } from "@/types";

interface ProgressState {
  passedQuizzes: Set<string>;
  solvedProblems: Set<string>;
  initialized: boolean;

  init(): void;
  markQuizPassed(topicId: string, difficulty: string): void;
  markProblemSolved(id: string): void;
  isDifficultyPassed(topicId: string, difficulty: string): boolean;
  isQuizPassed(topicId: string): boolean;
  isTopicComplete(id: string): boolean;
  isProblemSolved(id: string): boolean;
  getPassedQuizCount(topicId: string): number;
  completedCount(): number;
  passedCount(): number;
  solvedCount(): number;
}

const STORAGE_KEY = "pa_progress";

function persist(state: {
  passedQuizzes: Set<string>;
  solvedProblems: Set<string>;
}) {
  const data: ProgressData = {
    completedTopics: [],
    passedQuizzes: [...state.passedQuizzes],
    solvedProblems: [...state.solvedProblems],
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  passedQuizzes: new Set(),
  solvedProblems: new Set(),
  initialized: false,

  init() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data: ProgressData = JSON.parse(raw);
        set({
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

  markQuizPassed(topicId, difficulty) {
    set((s) => {
      const passedQuizzes = new Set(s.passedQuizzes).add(`${topicId}|${difficulty}`);
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

  isDifficultyPassed(topicId, difficulty) {
    return get().passedQuizzes.has(`${topicId}|${difficulty}`);
  },

  isQuizPassed(topicId) {
    return get().getPassedQuizCount(topicId) >= 3;
  },

  isTopicComplete(id) {
    return get().getPassedQuizCount(id) >= 3;
  },

  isProblemSolved: (id) => get().solvedProblems.has(id),

  getPassedQuizCount(topicId) {
    const prefix = `${topicId}|`;
    let count = 0;
    for (const key of get().passedQuizzes) {
      if (key.startsWith(prefix)) count++;
    }
    return count;
  },

  completedCount() {
    const counts = new Map<string, number>();
    for (const key of get().passedQuizzes) {
      const [topicId] = key.split("|");
      counts.set(topicId, (counts.get(topicId) ?? 0) + 1);
    }
    let total = 0;
    for (const c of counts.values()) {
      if (c >= 3) total++;
    }
    return total;
  },

  passedCount: () => get().passedQuizzes.size,

  solvedCount: () => get().solvedProblems.size,
}));
