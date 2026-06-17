import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lightbulb, CheckCircle2 } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import InteractiveHelper from "@/components/practice/InteractiveHelper";
import { useAppStore } from "@/store/useAppStore";
import { useProgressStore } from "@/store/useProgressStore";
import { getExamById } from "@/data/practiceExams";
import { pageVariants } from "@/lib/animations";
import { markdownToHtml } from "@/lib/markdown";

export default function PracticePage() {
  const { activeExamId, activeProblemIndex, setActiveProblemIndex } = useAppStore();
  const { isProblemSolved, markProblemSolved } = useProgressStore();

  const exam = getExamById(activeExamId);
  const problem = exam?.problems[activeProblemIndex];
  const problemKey = exam && problem ? `${exam.id}-${problem.id}` : "";

  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);

  // Reset state when problem changes
  const [lastKey, setLastKey] = useState(problemKey);
  if (problemKey !== lastKey) {
    setShowHints(false);
    setShowSolution(false);
    setHintIndex(0);
    setLastKey(problemKey);
  }

  function handleSolvedToggle() {
    if (problemKey) markProblemSolved(problemKey);
  }

  const solved = problemKey ? isProblemSolved(problemKey) : false;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex h-full overflow-hidden"
    >
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {exam && (
          <div
            className="flex items-center gap-3 px-5 py-3 flex-shrink-0"
            style={{ borderBottom: "1px solid var(--color-border)" }}
          >
            <span className="text-sm font-semibold" style={{ color: "var(--color-amber)" }}>
              📝 {exam.title}
            </span>
            <span className="badge badge--amber">{exam.totalPoints}p total</span>
            <div className="flex-1" />
            {/* Problem tabs */}
            <div className="flex gap-1">
              {exam.problems.map((p, idx) => {
                const pSolved = isProblemSolved(`${exam.id}-${p.id}`);
                return (
                  <button
                    key={p.id}
                    className={`pa-btn pa-btn--${activeProblemIndex === idx ? "secondary" : "ghost"}`}
                    style={{ padding: "4px 10px", fontSize: 12, minWidth: 36 }}
                    onClick={() => setActiveProblemIndex(idx)}
                  >
                    {pSolved ? <CheckCircle2 size={11} style={{ color: "var(--color-emerald)" }} /> : `${p.number}`}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {!exam ? (
            <div className="flex items-center justify-center h-full">
              <div style={{ color: "var(--color-text-muted)" }}>
                Selectează un examen din sidebar.
              </div>
            </div>
          ) : !problem ? (
            <div className="flex items-center justify-center h-full">
              <div style={{ color: "var(--color-text-muted)" }}>Selectează o problemă.</div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={problemKey}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="max-w-3xl mx-auto p-5 flex flex-col gap-5"
              >
                {/* Problem header */}
                <div className="flex items-start gap-3">
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="badge badge--amber">Problema {problem.number}</span>
                      <span className="badge badge--cyan">{problem.points}p</span>
                      <span className="badge badge--violet">{topicLabel(problem.topic)}</span>
                      {solved && <span className="badge badge--emerald">✓ Rezolvat</span>}
                    </div>
                  </div>
                </div>

                {/* Statement */}
                <div
                  className="glass-panel p-5 prose-pa"
                  dangerouslySetInnerHTML={{ __html: markdownToHtml(problem.statement) }}
                />

                {/* Interactive code helper */}
                {problem.codeTemplate && problem.testCases && (
                  <div className="glass-panel p-5" style={{ borderColor: "rgba(251,191,36,0.15)" }}>
                    <InteractiveHelper
                      codeTemplate={problem.codeTemplate}
                      testCases={problem.testCases}
                      functionName={extractFunctionName(problem.codeTemplate)}
                    />
                  </div>
                )}

                {/* Actions row */}
                <div className="flex gap-2 flex-wrap">
                  {problem.hints.length > 0 && (
                    <button
                      className={`pa-btn pa-btn--${showHints ? "secondary" : "ghost"}`}
                      style={{ fontSize: 13 }}
                      onClick={() => setShowHints((v) => !v)}
                    >
                      <Lightbulb size={13} />
                      {showHints ? "Ascunde indicii" : `Indicii (${problem.hints.length})`}
                    </button>
                  )}
                  <button
                    className={`pa-btn pa-btn--${showSolution ? "danger" : "secondary"}`}
                    style={{ fontSize: 13 }}
                    onClick={() => setShowSolution((v) => !v)}
                  >
                    {showSolution ? <EyeOff size={13} /> : <Eye size={13} />}
                    {showSolution ? "Ascunde soluția" : "Arată soluția"}
                  </button>
                  <button
                    className={`pa-btn pa-btn--${solved ? "success" : "ghost"} ml-auto`}
                    style={{ fontSize: 13 }}
                    onClick={handleSolvedToggle}
                  >
                    <CheckCircle2 size={13} />
                    {solved ? "Rezolvat ✓" : "Marchează rezolvat"}
                  </button>
                </div>

                {/* Hints */}
                <AnimatePresence>
                  {showHints && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="glass-panel p-4 flex flex-col gap-3">
                        <div className="text-xs font-semibold" style={{ color: "var(--color-amber)" }}>
                          💡 Indicii
                        </div>
                        <div className="flex flex-col gap-2">
                          {problem.hints.slice(0, hintIndex + 1).map((hint, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="text-sm rounded-lg p-3"
                              style={{
                                background: "var(--color-amber-dim)",
                                border: "1px solid rgba(251,191,36,0.2)",
                                color: "rgba(255,255,255,0.8)",
                              }}
                            >
                              <span style={{ color: "var(--color-amber)", fontWeight: 600 }}>
                                #{i + 1}
                              </span>{" "}
                              {hint}
                            </motion.div>
                          ))}
                        </div>
                        {hintIndex < problem.hints.length - 1 && (
                          <button
                            className="pa-btn pa-btn--ghost"
                            style={{ fontSize: 12, alignSelf: "flex-start" }}
                            onClick={() => setHintIndex((h) => h + 1)}
                          >
                            Indiciu următor →
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Solution */}
                <AnimatePresence>
                  {showSolution && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        className="glass-panel p-5 prose-pa"
                        style={{
                          borderColor: "rgba(52,211,153,0.2)",
                          background: "rgba(52,211,153,0.03)",
                        }}
                      >
                        <div className="text-xs font-semibold mb-4" style={{ color: "var(--color-emerald)" }}>
                          ✅ Soluție completă
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: markdownToHtml(problem.solution) }} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between pt-2">
                  <button
                    className="pa-btn pa-btn--ghost"
                    style={{ fontSize: 12 }}
                    disabled={activeProblemIndex === 0}
                    onClick={() => setActiveProblemIndex(activeProblemIndex - 1)}
                  >
                    ← Problema anterioară
                  </button>
                  <button
                    className="pa-btn pa-btn--secondary"
                    style={{ fontSize: 12 }}
                    disabled={activeProblemIndex >= (exam?.problems.length ?? 1) - 1}
                    onClick={() => setActiveProblemIndex(activeProblemIndex + 1)}
                  >
                    Problema următoare →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function topicLabel(topicId: string): string {
  const map: Record<string, string> = {
    kmp: "KMP",
    bm: "Boyer-Moore",
    dp1: "DP Matrice",
    dp2: "DP Șiruri",
    greedy: "Greedy",
    bkt: "BKT/NP",
    analiza: "Analiză",
    nedet: "Nedeterminist",
    prob: "Probabilist",
    regex: "Regex/Automate",
  };
  return map[topicId] ?? topicId;
}

function extractFunctionName(template: string): string {
  const match = template.match(/function\s+(\w+)\s*\(/);
  return match ? match[1] : "solution";
}
