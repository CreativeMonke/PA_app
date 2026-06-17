import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import ConceptTree from "@/components/overview/ConceptTree";
import ExamTree from "@/components/overview/ExamTree";
import { useProgressStore } from "@/store/useProgressStore";
import { useAppStore } from "@/store/useAppStore";
import { TOPICS } from "@/data/topics";
import { PRACTICE_EXAMS } from "@/data/practiceExams";
import { pageVariants, staggerContainer, staggerItem } from "@/lib/animations";

export default function OverviewPage() {
  const navigate = useNavigate();
  const { setMode, setActiveTopicId } = useAppStore();
  const { completedCount, passedCount, solvedCount, isTopicComplete } = useProgressStore();

  const totalTopics = TOPICS.length;
  const totalQuizzes = totalTopics * 5;
  const totalProblems = PRACTICE_EXAMS.reduce((s, e) => s + e.problems.length, 0);
  const overallPct = Math.round(
    ((completedCount() + passedCount() + solvedCount()) / (totalTopics + totalQuizzes + totalProblems)) * 100
  );

  const firstIncomplete = TOPICS.find((t) => !isTopicComplete(t.id));

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex h-full overflow-hidden"
    >
      <Sidebar />

      <div className="flex-1 overflow-y-auto p-5">
        <motion.div
          className="max-w-3xl mx-auto flex flex-col gap-5"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Header */}
          <motion.div variants={staggerItem}>
            <h1 className="text-xl font-bold mb-1" style={{ color: "var(--color-text)" }}>
              Progres General
            </h1>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Vizualizare completă a activității tale
            </p>
          </motion.div>

          {/* Radial gauge + stats */}
          <motion.div variants={staggerItem} className="glass-panel p-5 flex flex-wrap gap-6 items-center">
            <RadialGauge pct={overallPct} />
            <div className="flex flex-col gap-3 flex-1 min-w-[200px]">
              <StatRow
                label="Teme completate"
                value={completedCount()}
                total={totalTopics}
                color="var(--color-amber)"
              />
              <StatRow
                label="Quiz-uri trecute"
                value={passedCount()}
                total={totalQuizzes}
                color="var(--color-emerald)"
              />
              <StatRow
                label="Probleme rezolvate"
                value={solvedCount()}
                total={totalProblems}
                color="var(--color-cyan)"
              />
            </div>
          </motion.div>

          {/* Continue card */}
          {firstIncomplete && (
            <motion.div variants={staggerItem}>
              <button
                className="glass-panel glass-panel--active w-full flex items-center gap-4 p-4 cursor-pointer"
                onClick={() => {
                  setMode("learn");
                  setActiveTopicId(firstIncomplete.id);
                  navigate("/learn");
                }}
              >
                <span className="text-2xl">{firstIncomplete.icon}</span>
                <div className="flex-1 text-left">
                  <div className="text-xs mb-1" style={{ color: "var(--color-amber)" }}>
                    CONTINUĂ DE UNDE AI RĂMAS
                  </div>
                  <div className="font-semibold text-sm">{firstIncomplete.title}</div>
                  <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                    {firstIncomplete.subtitle}
                  </div>
                </div>
                <ArrowRight size={16} style={{ color: "var(--color-amber)" }} />
              </button>
            </motion.div>
          )}

          {/* Concept tree graph */}
          <motion.div variants={staggerItem}>
            <ConceptTree nextTopicId={firstIncomplete?.id ?? null} />
          </motion.div>

          {/* Exam tree graph */}
          <motion.div variants={staggerItem}>
            <ExamTree />
          </motion.div>

          {/* Exam readiness */}
          <motion.div variants={staggerItem}>
            <div
              className="glass-panel p-5"
              style={{
                background: overallPct >= 80 ? "rgba(52,211,153,0.05)" : "var(--color-surface)",
                borderColor: overallPct >= 80 ? "rgba(52,211,153,0.2)" : "var(--color-border)",
              }}
            >
              <div className="text-sm font-semibold mb-2">
                🎯 Pregătire Examen
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: readinessColor(overallPct) }}>
                {readinessLabel(overallPct)}
              </div>
              <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                {overallPct < 40 && "Continuă cu teoria — KMP și DP sunt esențiale."}
                {overallPct >= 40 && overallPct < 70 && "Bine! Exersează problemele de restanță pentru a consolida."}
                {overallPct >= 70 && overallPct < 90 && "Aproape gata! Revizuiește temele neterminate."}
                {overallPct >= 90 && "Excellent! Ești pregătit pentru examen."}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function readinessColor(pct: number) {
  if (pct >= 80) return "var(--color-emerald)";
  if (pct >= 50) return "var(--color-amber)";
  return "var(--color-rose)";
}

function readinessLabel(pct: number) {
  if (pct >= 90) return "Excelent — Gata de examen!";
  if (pct >= 70) return "Bine — Mai puțin de finalizat";
  if (pct >= 40) return "Progres bun — Continuă!";
  return "La început — Mult de parcurs";
}

function StatRow({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const pct = total > 0 ? (value / total) * 100 : 0;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-xs">
        <span style={{ color: "var(--color-text-muted)" }}>{label}</span>
        <span style={{ color, fontWeight: 600 }}>{value}/{total}</span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

function RadialGauge({ pct }: { pct: number }) {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const dash = ((100 - pct) / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={110} height={110} viewBox="0 0 110 110">
        <circle className="gauge-track" cx={55} cy={55} r={r} strokeWidth={8} />
        <motion.circle
          className="gauge-fill"
          cx={55} cy={55} r={r}
          strokeWidth={8}
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: dash }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          transform="rotate(-90 55 55)"
        />
        <text
          x={55} y={55}
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--color-amber)"
          fontSize={18}
          fontWeight={700}
          fontFamily="Outfit, sans-serif"
        >
          {pct}%
        </text>
      </svg>
      <div className="text-xs" style={{ color: "var(--color-text-dim)" }}>progres total</div>
    </div>
  );
}
