import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, CheckCircle2, BookOpen, Code2, Cpu, HelpCircle } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import KMPSimulator from "@/components/simulators/KMPSimulator";
import BMSimulator from "@/components/simulators/BMSimulator";
import DPSimulator from "@/components/simulators/DPSimulator";
import Quiz from "@/components/quiz/Quiz";
import { useAppStore } from "@/store/useAppStore";
import { useProgressStore } from "@/store/useProgressStore";
import { TOPICS, getTopicById } from "@/data/topics";
import { QUIZZES } from "@/data/quizzes";
import type { QuizSet } from "@/types";
import { pageVariants } from "@/lib/animations";
import { DIFFICULTIES } from "@/data/difficultyConfig";

type Step = "theory" | "code" | "simulator" | "quiz";

const STEP_CONFIG: { id: Step; label: string; icon: React.ElementType }[] = [
  { id: "theory", label: "Teorie", icon: BookOpen },
  { id: "code", label: "Cod", icon: Code2 },
  { id: "simulator", label: "Simulator", icon: Cpu },
  { id: "quiz", label: "Quiz", icon: HelpCircle },
];

export default function LearnPage() {
  const { activeTopicId, setActiveTopicId } = useAppStore();
  const { isTopicComplete, isDifficultyPassed, markQuizPassed } = useProgressStore();
  const [step, setStep] = useState<Step>("theory");
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);

  const topic = getTopicById(activeTopicId);
  const quizSets: QuizSet[] = QUIZZES[activeTopicId] ?? [];

  if (!topic) {
    return (
      <div className="flex h-full items-center justify-center">
        <div style={{ color: "var(--color-text-muted)" }}>Selectează o temă din sidebar.</div>
      </div>
    );
  }

  const currentTopicIndex = TOPICS.findIndex((t) => t.id === activeTopicId);
  const nextTopic = TOPICS[currentTopicIndex + 1];
  const complete = isTopicComplete(activeTopicId);
  const activeDifficulty = quizSets[activeQuizIndex]?.difficulty ?? "";
  const alreadyPassed = isDifficultyPassed(activeTopicId, activeDifficulty);

  function handleQuizPass() {
    const difficulty = quizSets[activeQuizIndex]?.difficulty;
    if (difficulty) markQuizPassed(activeTopicId, difficulty);
  }

  const stepsForTopic = STEP_CONFIG.filter(
    (s) => s.id !== "simulator" || topic.hasSimulator
  );

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
        {/* Step tabs */}
        <div
          className="flex items-center gap-1 px-5 py-3 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <span
            className="text-sm font-semibold mr-4"
            style={{ color: "var(--color-amber)" }}
          >
            {topic.icon} {topic.title}
          </span>
          {stepsForTopic.map((s) => {
            const Icon = s.icon;
            const active = step === s.id;
            return (
              <button
                key={s.id}
                className={`pa-btn pa-btn--${active ? "secondary" : "ghost"}`}
                style={{
                  padding: "5px 12px",
                  fontSize: 12,
                  color: active ? "var(--color-text)" : "var(--color-text-muted)",
                  borderColor: active ? "var(--color-border-raised)" : "transparent",
                  background: active ? "var(--color-surface-raised)" : "transparent",
                }}
                onClick={() => setStep(s.id)}
              >
                <Icon size={13} />
                {s.label}
              </button>
            );
          })}
          {complete && (
            <span className="badge badge--emerald ml-auto">
              <CheckCircle2 size={11} className="mr-1" /> Completat
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTopicId}-${step}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {step === "theory" && <TheoryStep topic={topic} />}
              {step === "code" && <CodeStep topic={topic} />}
              {step === "simulator" && topic.hasSimulator && (
                <SimulatorStep topicId={topic.id} />
              )}
              {step === "quiz" && (
                <QuizStep
                  topicId={topic.id}
                  quizSets={quizSets}
                  activeQuizIndex={activeQuizIndex}
                  onSelectQuiz={setActiveQuizIndex}
                  onPass={handleQuizPass}
                  alreadyPassed={alreadyPassed}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer nav */}
        <div
          className="flex items-center justify-between px-5 py-3 flex-shrink-0"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <div className="flex items-center gap-2">
            {stepsForTopic.map((s, i) => (
              <div
                key={s.id}
                className="w-2 h-2 rounded-full"
                style={{
                  background:
                    s.id === step
                      ? "var(--color-amber)"
                      : step === "quiz" && i < stepsForTopic.findIndex((x) => x.id === step)
                      ? "var(--color-emerald)"
                      : "var(--color-border)",
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Next step in topic */}
            {step !== "quiz" && (
              <button
                className="pa-btn pa-btn--secondary"
                style={{ fontSize: 12, padding: "6px 14px" }}
                onClick={() => {
                  const idx = stepsForTopic.findIndex((s) => s.id === step);
                  if (idx < stepsForTopic.length - 1) setStep(stepsForTopic[idx + 1].id);
                }}
              >
                Pasul următor <ChevronRight size={13} />
              </button>
            )}

            {/* Next topic */}
            {nextTopic && complete && (
              <button
                className="pa-btn pa-btn--primary"
                style={{ fontSize: 12, padding: "6px 14px" }}
                onClick={() => {
                  setActiveTopicId(nextTopic.id);
                  setStep("theory");
                }}
              >
                Tema: {nextTopic.title} <ChevronRight size={13} />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TheoryStep({ topic }: { topic: ReturnType<typeof getTopicById> & object }) {
  return (
    <div className="max-w-3xl">
      <div className="step-label"><span className="step-number">1</span>Teorie</div>

      {/* Key points */}
      <div className="glass-panel p-4 mb-5">
        <div className="text-xs font-semibold mb-3" style={{ color: "var(--color-amber)" }}>
          Puncte cheie
        </div>
        <ul className="flex flex-col gap-2">
          {topic!.keyPoints.map((pt, i) => (
            <li key={i} className="flex gap-2 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
              <span style={{ color: "var(--color-amber)", flexShrink: 0 }}>→</span>
              {pt}
            </li>
          ))}
        </ul>
      </div>

      {/* Theory text */}
      <div
        className="prose-pa"
        dangerouslySetInnerHTML={{ __html: markdownToHtml(topic!.description) }}
      />
    </div>
  );
}

function CodeStep({ topic }: { topic: ReturnType<typeof getTopicById> & object }) {
  return (
    <div className="max-w-3xl">
      <div className="step-label"><span className="step-number">2</span>Exemple de Cod (ALK)</div>
      <div className="flex flex-col gap-5">
        {topic!.codeExamples.map((ex, i) => (
          <div key={i}>
            <div className="code-block-header">{ex.title}</div>
            <pre className="code-block">{ex.code}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimulatorStep({ topicId }: { topicId: string }) {
  return (
    <div className="max-w-3xl">
      <div className="step-label"><span className="step-number">3</span>Simulator Interactiv</div>
      <div className="glass-panel p-5">
        {topicId === "kmp" && <KMPSimulator />}
        {topicId === "bm" && <BMSimulator />}
        {(topicId === "dp1" || topicId === "dp2") && <DPSimulator />}
      </div>
    </div>
  );
}

function QuizStep({ topicId, quizSets, activeQuizIndex, onSelectQuiz, onPass, alreadyPassed }: {
  topicId: string;
  quizSets: QuizSet[];
  activeQuizIndex: number;
  onSelectQuiz(index: number): void;
  onPass(): void;
  alreadyPassed: boolean;
}) {
  const { isDifficultyPassed, getPassedQuizCount } = useProgressStore();
  const activeQuiz = quizSets[activeQuizIndex];
  const passedCount = getPassedQuizCount(topicId);

  if (quizSets.length === 0) {
    return (
      <div className="max-w-xl">
        <div className="step-label"><span className="step-number">4</span>Quiz</div>
        <div className="glass-panel p-5">
          <div style={{ color: "var(--color-text-muted)" }}>Quiz indisponibil pentru această temă.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <div className="step-label"><span className="step-number">4</span>Quiz</div>

      {passedCount > 0 && (
        <div className="text-xs mb-3" style={{ color: "var(--color-emerald)" }}>
          <CheckCircle2 size={11} className="inline mr-1" />
          {passedCount}/{quizSets.length} quiz-uri trecute
          {passedCount >= 3 && " — Tema completată!"}
        </div>
      )}

      {/* Difficulty selector */}
      {quizSets.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {quizSets.map((qs, i) => {
            const passed = isDifficultyPassed(topicId, qs.difficulty);
            const diffCfg = DIFFICULTIES[i] ?? DIFFICULTIES[0];
            const active = i === activeQuizIndex;
            return (
              <button
                key={i}
                className={`pa-btn ${active ? "pa-btn--secondary" : "pa-btn--ghost"}`}
                style={{
                  fontSize: 12,
                  padding: "4px 12px",
                  borderLeft: `3px solid ${active ? diffCfg.color : "transparent"}`,
                  borderColor: active ? "var(--color-border-raised)" : "transparent",
                  background: active
                    ? `linear-gradient(90deg, ${diffCfg.bgColor}, rgba(255,255,255,0.03))`
                    : "transparent",
                }}
                onClick={() => onSelectQuiz(i)}
              >
                <span
                  className="w-2 h-2 rounded-full inline-block mr-1.5 shrink-0"
                  style={{ background: diffCfg.color }}
                />
                {passed && <CheckCircle2 size={11} className="mr-1" style={{ color: "var(--color-emerald)" }} />}
                {qs.difficulty}
              </button>
            );
          })}
        </div>
      )}

      <div className="glass-panel p-5">
        {activeQuiz ? (
          <Quiz
            key={`${topicId}-${activeQuizIndex}`}
            topicId={topicId}
            questions={activeQuiz.questions}
            onPass={onPass}
            alreadyPassed={alreadyPassed}
          />
        ) : (
          <div style={{ color: "var(--color-text-muted)" }}>Selectează un quiz de mai sus.</div>
        )}
      </div>
    </div>
  );
}

// Minimal markdown → HTML for the theory content
function markdownToHtml(md: string): string {
  return md
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^#### (.+)$/gm, "<h4>$1</h4>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/^```[\w]*\n([\s\S]*?)```$/gm, (_: string, code: string) => `<pre><code>${escHtml(code)}</code></pre>`)
    .replace(/^---$/gm, "<hr>")
    .replace(/^\| (.+) \|$/gm, (line: string) => {
      const cells = line.slice(2, -2).split(" | ");
      return `<tr>${cells.map((c) => `<td>${c}</td>`).join("")}</tr>`;
    })
    .replace(/^(<tr>.*<\/tr>\n?)+/gm, (t: string) => `<table>${t}</table>`)
    .replace(/^\*\s(.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (list: string) => `<ul>${list}</ul>`)
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[h|u|t|p|c|h|l|o])/gm, "")
    .replace(/<\/h\d>\n/g, "</h2>")
    || md;
}

function escHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
