import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from "lucide-react";
import type { QuizQuestion } from "@/types";

interface Props {
  topicId: string;
  questions: QuizQuestion[];
  onPass(): void;
  alreadyPassed?: boolean;
}

export default function Quiz({ topicId: _topicId, questions, onPass, alreadyPassed }: Props) {
  const allIndices = useMemo(() => questions.map((_, i) => i), [questions]);
  const [round, setRound] = useState<number[]>(allIndices);
  const [roundIndex, setRoundIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [wrongInRound, setWrongInRound] = useState<Set<number>>(new Set());
  const [passed, setPassed] = useState(false);
  const [retaking, setRetaking] = useState(false);

  const showPassed = (passed || alreadyPassed) && !retaking;

  function resetQuiz() {
    setRound(allIndices);
    setRoundIndex(0);
    setSelected(null);
    setWrongInRound(new Set());
    setPassed(false);
    setRetaking(true);
  }

  const q = questions[round[roundIndex]];
  const answered = selected !== null;
  const isCorrect = selected === q.correctIndex;

  function handleSelect(idx: number) {
    if (answered) return;
    setSelected(idx);
    if (idx !== q.correctIndex) {
      setWrongInRound((prev) => new Set(prev).add(round[roundIndex]));
    }
  }

  function handleNext() {
    if (roundIndex < round.length - 1) {
      setRoundIndex((i) => i + 1);
      setSelected(null);
    } else {
      if (wrongInRound.size === 0) {
        setPassed(true);
        setRetaking(false);
        onPass();
      } else {
        const nextRound = [...wrongInRound];
        setRound(nextRound);
        setRoundIndex(0);
        setSelected(null);
        setWrongInRound(new Set());
      }
    }
  }

  if (showPassed) {
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
        <button className="pa-btn pa-btn--secondary mt-2" onClick={resetQuiz}>
          <RotateCcw size={13} className="mr-1" /> Retake Quiz
        </button>
      </motion.div>
    );
  }

  const total = questions.length;
  const done = total - round.length + roundIndex;
  const roundLabel = round.length < total
    ? `Restanțe (${round.length}) — ${roundIndex + 1} / ${round.length}`
    : `${done} / ${total}`;

  return (
    <div className="flex flex-col gap-4">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="progress-track flex-1">
          <div
            className="progress-fill"
            style={{ width: `${(done / total) * 100}%` }}
          />
        </div>
        <span className="text-xs" style={{ color: "var(--color-text-dim)" }}>
          {roundLabel}
        </span>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${round.length}-${roundIndex}`}
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
            {roundIndex === round.length - 1 && wrongInRound.size > 0 && (
              <span className="text-xs" style={{ color: "var(--color-rose)" }}>
                {wrongInRound.size} întrebare{wrongInRound.size > 1 ? "i" : ""} greșită{wrongInRound.size > 1 ? "" : ""} — vei repeta doar a{wrongInRound.size > 1 ? "cestea" : "ceasta"}.
              </span>
            )}
            <button
              className="pa-btn pa-btn--primary ml-auto"
              onClick={handleNext}
            >
              {roundIndex < round.length - 1 ? (
                <>Continuă <ArrowRight size={13} /></>
              ) : wrongInRound.size > 0 ? (
                <>Retake {wrongInRound.size} greșit{wrongInRound.size > 1 ? "e" : "ă"} <RotateCcw size={13} /></>
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
