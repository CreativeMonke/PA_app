import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, ChevronRight } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { useProgressStore } from "@/store/useProgressStore";
import { TOPICS } from "@/data/topics";
import { PRACTICE_EXAMS } from "@/data/practiceExams";

export default function Sidebar() {
  const { sidebarOpen, mode } = useAppStore();

  return (
    <AnimatePresence initial={false}>
      {sidebarOpen && (
        <motion.aside
          className="sidebar"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 240, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.1, duration: 0.35 }}
          style={{ overflow: "hidden" }}
        >
          <div style={{ minWidth: 240 }}>
            {mode === "learn" && <LearnSidebar />}
            {mode === "practice" && <PracticeSidebar />}
            {mode === "overview" && <OverviewSidebar />}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function LearnSidebar() {
  const { activeTopicId, setActiveTopicId } = useAppStore();
  const { isTopicComplete, getPassedQuizCount } = useProgressStore();

  return (
    <>
      <div className="sidebar-section-label">Teme</div>
      {TOPICS.map((topic) => {
        const complete = isTopicComplete(topic.id);
        const count = getPassedQuizCount(topic.id);
        const inProgress = count > 0 && count < 3;
        const active = activeTopicId === topic.id;

        return (
          <button
            key={topic.id}
            className={`sidebar-item w-full ${active ? "sidebar-item--active" : ""}`}
            onClick={() => setActiveTopicId(topic.id)}
          >
            <span style={{ fontSize: 16 }}>{topic.icon}</span>
            <div className="flex-1 min-w-0">
              <div
                className="text-sm truncate"
                style={{ fontWeight: active ? 600 : 500 }}
              >
                {topic.title}
              </div>
              <div
                className="text-xs truncate"
                style={{ color: active ? "rgba(251,191,36,0.7)" : "var(--color-text-dim)" }}
              >
                {topic.subtitle}
              </div>
            </div>
            {complete ? (
              <CheckCircle2 size={14} style={{ color: "var(--color-emerald)", flexShrink: 0 }} />
            ) : inProgress ? (
              <span className="text-xs font-mono" style={{ color: "var(--color-amber)", flexShrink: 0 }}>
                {count}/5
              </span>
            ) : (
              <Circle size={13} style={{ color: "var(--color-text-dim)", flexShrink: 0 }} />
            )}
          </button>
        );
      })}
    </>
  );
}

function PracticeSidebar() {
  const { activeExamId, setActiveExamId, setActiveProblemIndex } = useAppStore();
  const { solvedProblems } = useProgressStore();

  return (
    <>
      <div className="sidebar-section-label">Examene Restanță</div>
      {PRACTICE_EXAMS.map((exam) => {
        const active = activeExamId === exam.id;
        const solved = exam.problems.filter((p) =>
          solvedProblems.has(`${exam.id}-${p.id}`)
        ).length;

        return (
          <div key={exam.id}>
            <button
              className={`sidebar-item w-full ${active ? "sidebar-item--active" : ""}`}
              onClick={() => { setActiveExamId(exam.id); setActiveProblemIndex(0); }}
            >
              <span style={{ fontSize: 16 }}>📝</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm truncate" style={{ fontWeight: active ? 600 : 500 }}>
                  {exam.title}
                </div>
                <div className="text-xs" style={{ color: "var(--color-text-dim)" }}>
                  {solved}/{exam.problems.length} rezolvate · {exam.totalPoints}p
                </div>
              </div>
              <ChevronRight
                size={13}
                style={{
                  color: "var(--color-text-dim)",
                  transform: active ? "rotate(90deg)" : "none",
                  transition: "transform 0.2s",
                  flexShrink: 0,
                }}
              />
            </button>

            <AnimatePresence>
              {active && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: "hidden" }}
                >
                  <ProblemSubList exam={exam} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </>
  );
}

function ProblemSubList({ exam }: { exam: (typeof PRACTICE_EXAMS)[number] }) {
  const { activeProblemIndex, setActiveProblemIndex } = useAppStore();
  const { isProblemSolved } = useProgressStore();

  return (
    <div style={{ paddingLeft: 12, paddingBottom: 4 }}>
      {exam.problems.map((problem, idx) => {
        const active = activeProblemIndex === idx;
        const solved = isProblemSolved(`${exam.id}-${problem.id}`);

        return (
          <button
            key={problem.id}
            className={`sidebar-item w-full ${active ? "sidebar-item--active" : ""}`}
            style={{ padding: "6px 10px", fontSize: 12 }}
            onClick={() => setActiveProblemIndex(idx)}
          >
            <div
              className="sidebar-dot"
              style={{
                background: solved
                  ? "var(--color-emerald)"
                  : active
                  ? "var(--color-amber)"
                  : "var(--color-text-dim)",
              }}
            />
            <span className="flex-1 text-left truncate">
              Problema {problem.number}
            </span>
            <span
              className="badge"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "var(--color-text-dim)",
                fontSize: 10,
                padding: "1px 5px",
              }}
            >
              {problem.points}p
            </span>
          </button>
        );
      })}
    </div>
  );
}

function OverviewSidebar() {
  return (
    <div className="p-4">
      <p className="text-xs" style={{ color: "var(--color-text-dim)" }}>
        Vizualizare progres complet
      </p>
    </div>
  );
}
