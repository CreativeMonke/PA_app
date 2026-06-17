import type { QuizSet } from "@/types";
import { KMP_QUIZZES } from "./kmp-bm-quizzes";
import { BM_QUIZZES } from "./kmp-bm-quizzes";
import { DP1_QUIZZES } from "./topicQuizzes";
import { DP2_QUIZZES } from "./topicQuizzes";
import { GREEDY_QUIZZES } from "./topicQuizzes";
import { BKT_QUIZZES } from "./quizSets";
import { ANALIZA_QUIZZES } from "./quizSets";
import { NEDET_QUIZZES } from "./quizSets";
import { PROB_QUIZZES } from "./prob-regex-quizzes";
import { REGEX_QUIZZES } from "./prob-regex-quizzes";

export const QUIZZES: Record<string, QuizSet[]> = {
  kmp: KMP_QUIZZES,
  bm: BM_QUIZZES,
  dp1: DP1_QUIZZES,
  dp2: DP2_QUIZZES,
  greedy: GREEDY_QUIZZES,
  bkt: BKT_QUIZZES,
  analiza: ANALIZA_QUIZZES,
  nedet: NEDET_QUIZZES,
  prob: PROB_QUIZZES,
  regex: REGEX_QUIZZES,
};
