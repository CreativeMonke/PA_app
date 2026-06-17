export type AppMode = "learn" | "practice" | "overview";

export interface CodeExample {
  title: string;
  code: string;
}

export interface Topic {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  keyPoints: string[];
  codeExamples: CodeExample[];
  hasSimulator: boolean;
  simulatorType?: "kmp" | "bm" | "dp1" | "dp2";
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizSet {
  difficulty: string;
  questions: QuizQuestion[];
}

export interface ExamProblem {
  id: string;
  number: string;
  points: number;
  topic: string;
  statement: string;
  hints: string[];
  solution: string;
  codeTemplate?: string;
  testCases?: TestCase[];
}

export interface TestCase {
  label: string;
  args: unknown[];
  expected: unknown;
}

export interface TestResult {
  label: string;
  passed: boolean;
  actual: string;
  expected: string;
  error?: string;
  durationMs: number;
}

export interface PracticeExam {
  id: string;
  year: string;
  title: string;
  totalPoints: number;
  problems: ExamProblem[];
}

export interface ProgressData {
  completedTopics: string[];
  passedQuizzes: string[];
  solvedProblems: string[];
}
