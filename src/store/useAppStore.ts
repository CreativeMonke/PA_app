import { create } from "zustand";
import type { AppMode } from "@/types";

interface AppState {
  mode: AppMode;
  sidebarOpen: boolean;
  activeTopicId: string;
  activeExamId: string;
  activeProblemIndex: number;

  setMode(mode: AppMode): void;
  toggleSidebar(): void;
  setSidebarOpen(open: boolean): void;
  setActiveTopicId(id: string): void;
  setActiveExamId(id: string): void;
  setActiveProblemIndex(idx: number): void;
}

export const useAppStore = create<AppState>((set) => ({
  mode: "learn",
  sidebarOpen: true,
  activeTopicId: "kmp",
  activeExamId: "2023-2024",
  activeProblemIndex: 0,

  setMode: (mode) => set({ mode }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveTopicId: (id) => set({ activeTopicId: id }),
  setActiveExamId: (id) => set({ activeExamId: id, activeProblemIndex: 0 }),
  setActiveProblemIndex: (idx) => set({ activeProblemIndex: idx }),
}));
