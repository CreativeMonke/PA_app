import type { PracticeExam } from "@/types";
import { LEGACY_EXAMS } from "./legacy";
import { SESIUNI_EXAMS } from "./sesiuni";
import { PARTIALE_EXAMS } from "./partiale";
import { MODELE_EXAMS } from "./modele";

// Agregatorul tuturor examenelor. Ordine: restante scrise de mână, apoi
// sesiuni/restante recente, apoi partiale, apoi modele.
export const PRACTICE_EXAMS: PracticeExam[] = [
  ...LEGACY_EXAMS,
  ...SESIUNI_EXAMS,
  ...PARTIALE_EXAMS,
  ...MODELE_EXAMS,
];

export function getExamById(id: string): PracticeExam | undefined {
  return PRACTICE_EXAMS.find((e) => e.id === id);
}
