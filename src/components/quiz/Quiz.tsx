import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import type { QuizQuestion } from "@/types";

interface Props {
  topicId: string;
  questions: QuizQuestion[];
  onPass(): void;
  alreadyPassed?: boolean;
}

export default function Quiz({ topicId: _topicId, questions, onPass, alreadyPassed }: Props) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [wrong, setWrong] = useState(false);
  const [passed, setPassed] = useState(alreadyPassed ?? false);

  const q = questions[current];
  const answered = selected !== null;
  const isCorrect = selected === q.correctIndex;

  function handleSelect(idx: number) {
    if (answered) return;
    setSelected(idx);
    if (idx !== q.correctIndex) setWrong(true);
  }

  function handleNext() {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setWrong(false);
    } else {
      if (!wrong) {
        setPassed(true);
        onPass();
      } else {
        // Reset and try again
        setCurrent(0);
        setSelected(null);
        setWrong(false);
      }
    }
  }

  if (passed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 py-8"
      >
        <CheckCircle2 size={40} style={{ color: "var(--color-emerald)" }} />
        <div className="text-base font-semibold" style={{ color: "var(--color-emerald)" }}>
          Quiz trecut! 🎉
        </div>
        <div className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          Toate {questions.length} întrebări corecte.
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="progress-track flex-1">
          <div
            className="progress-fill"
            style={{ width: `${((current) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-xs" style={{ color: "var(--color-text-dim)" }}>
          {current + 1} / {questions.length}
        </span>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-3"
        >
          <div className="text-sm font-medium leading-relaxed" style={{ color: "var(--color-text)" }}>
            {q.question}
          </div>

          {/* Options */}
          <div className="flex flex-col gap-2">
            {q.options.map((opt, idx) => {
              let cls = "quiz-option";
              if (answered) {
                if (idx === q.correctIndex) cls += " quiz-option--correct";
                else if (idx === selected) cls += " quiz-option--wrong";
                cls += " quiz-option--disabled";
              }

              return (
                <button
                  key={idx}
                  className={cls}
                  onClick={() => handleSelect(idx)}
                  disabled={answered}
                >
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background:
                        answered && idx === q.correctIndex
                          ? "rgba(52,211,153,0.2)"
                          : answered && idx === selected && idx !== q.correctIndex
                          ? "rgba(251,113,133,0.2)"
                          : "rgba(255,255,255,0.08)",
                      color:
                        answered && idx === q.correctIndex
                          ? "var(--color-emerald)"
                          : answered && idx === selected
                          ? "var(--color-rose)"
                          : "var(--color-text-muted)",
                    }}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                  {answered && idx === q.correctIndex && (
                    <CheckCircle2 size={14} className="ml-auto flex-shrink-0" style={{ color: "var(--color-emerald)" }} />
                  )}
                  {answered && idx === selected && idx !== q.correctIndex && (
                    <XCircle size={14} className="ml-auto flex-shrink-0" style={{ color: "var(--color-rose)" }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {answered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div
                  className="rounded-lg p-3 text-sm leading-relaxed"
                  style={{
                    background: isCorrect ? "rgba(52,211,153,0.07)" : "rgba(251,113,133,0.07)",
                    border: `1px solid ${isCorrect ? "rgba(52,211,153,0.25)" : "rgba(251,113,133,0.25)"}`,
                    color: "rgba(255,255,255,0.75)",
                    marginTop: 4,
                  }}
                >
                  <span style={{ fontWeight: 600, color: isCorrect ? "var(--color-emerald)" : "var(--color-rose)" }}>
                    {isCorrect ? "Corect! " : "Greșit. "}
                  </span>
                  {q.explanation}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Next button */}
      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            {wrong && current === questions.length - 1 && (
              <span className="text-xs" style={{ color: "var(--color-rose)" }}>
                Ai greșit o întrebare — quiz-ul va fi reluat de la început.
              </span>
            )}
            <button
              className="pa-btn pa-btn--primary ml-auto"
              onClick={handleNext}
            >
              {current < questions.length - 1 ? (
                <>Continuă <ArrowRight size={13} /></>
              ) : wrong ? (
                <>Încearcă din nou <RotateCcwIcon /></>
              ) : (
                <>Finalizează <CheckCircle2 size={13} /></>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RotateCcwIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}
