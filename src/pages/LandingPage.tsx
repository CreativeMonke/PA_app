import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, FlaskConical, LayoutDashboard, ArrowRight } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { useProgressStore } from "@/store/useProgressStore";
import { TOPICS } from "@/data/topics";
import { PRACTICE_EXAMS } from "@/data/practiceExams";

const GLYPHS = [
  { char: "O(n)", x: 12, y: 18, opacity: 0.12, duration: 14, delay: 0 },
  { char: "f[i]", x: 78, y: 8, opacity: 0.10, duration: 18, delay: 2 },
  { char: "dp[][]", x: 88, y: 70, opacity: 0.09, duration: 22, delay: 5 },
  { char: "∀i∈N", x: 5, y: 60, opacity: 0.08, duration: 17, delay: 1 },
  { char: "KMP", x: 65, y: 25, opacity: 0.11, duration: 15, delay: 3 },
  { char: "greedy", x: 30, y: 85, opacity: 0.09, duration: 20, delay: 4 },
  { char: "NP-c", x: 92, y: 40, opacity: 0.08, duration: 25, delay: 6 },
  { char: "BKT", x: 20, y: 45, opacity: 0.07, duration: 19, delay: 7 },
];

const CARDS = [
  {
    path: "/learn",
    icon: BookOpen,
    title: "Teme",
    desc: "Teoria completă: KMP, Boyer-Moore, DP, Greedy, BKT, NP",
    accent: "var(--color-amber)",
    dim: "var(--color-amber-dim)",
  },
  {
    path: "/practice",
    icon: FlaskConical,
    title: "Practică",
    desc: "Probleme din examenele de restanță 2022 și 2024 cu soluții",
    accent: "var(--color-cyan)",
    dim: "rgba(103,232,249,0.10)",
  },
  {
    path: "/overview",
    icon: LayoutDashboard,
    title: "Progres",
    desc: "Vizualizează ce ai acoperit și ce mai rămâne",
    accent: "var(--color-violet)",
    dim: "rgba(196,181,253,0.10)",
  },
] as const;

export default function LandingPage() {
  const navigate = useNavigate();
  const { completedCount, passedCount, solvedCount } = useProgressStore();

  const totalTopics = TOPICS.length;
  const totalProblems = PRACTICE_EXAMS.reduce((s, e) => s + e.problems.length, 0);

  return (
    <div className="relative flex flex-col items-center justify-center h-full overflow-auto py-8 px-4">
      {/* Floating glyphs */}
      {GLYPHS.map((g, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none font-mono text-xs"
          style={{
            left: `${g.x}%`,
            top: `${g.y}%`,
            opacity: g.opacity,
            color: "var(--color-amber)",
          }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: g.duration, delay: g.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {g.char}
        </motion.div>
      ))}

      <motion.div
        className="flex flex-col items-center gap-8 z-10 max-w-2xl w-full"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Hero */}
        <motion.div variants={staggerItem} className="flex flex-col items-center gap-3 text-center">
          <div className="badge badge--amber text-xs mb-2">FII UAIC · Proiectarea Algoritmilor</div>
          <h1
            className="text-4xl font-bold tracking-tight"
            style={{
              background: "linear-gradient(135deg, var(--color-amber) 0%, var(--color-orange) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            PA Restanță
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)", maxWidth: 400 }}>
            Pregătire completă pentru examenul de restanță — teorie, simulatoare interactive și probleme din examene reale.
          </p>
        </motion.div>

        {/* Stat chips */}
        <motion.div variants={staggerItem} className="flex gap-3 flex-wrap justify-center">
          <StatChip
            value={completedCount()}
            max={totalTopics}
            label="teme completate"
            color="var(--color-amber)"
          />
          <StatChip
            value={passedCount()}
            max={totalTopics}
            label="quiz-uri trecute"
            color="var(--color-emerald)"
          />
          <StatChip
            value={solvedCount()}
            max={totalProblems}
            label="probleme rezolvate"
            color="var(--color-cyan)"
          />
        </motion.div>

        {/* CTA Cards */}
        <motion.div variants={staggerItem} className="grid gap-3 w-full" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.button
                key={card.path}
                className="glass-panel flex flex-col gap-3 p-5 text-left cursor-pointer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(card.path)}
                style={{ background: `${card.dim}` }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `${card.dim}`, border: `1px solid ${card.accent}33` }}
                >
                  <Icon size={18} style={{ color: card.accent }} />
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1" style={{ color: card.accent }}>
                    {card.title}
                  </div>
                  <div className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                    {card.desc}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs mt-auto" style={{ color: card.accent }}>
                  Deschide <ArrowRight size={11} />
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Quick actions */}
        <motion.div variants={staggerItem} className="flex gap-2 flex-wrap justify-center">
          <button
            className="pa-btn pa-btn--primary"
            onClick={() => navigate("/learn")}
          >
            Începe cu KMP <ArrowRight size={13} />
          </button>
          <button
            className="pa-btn pa-btn--secondary"
            onClick={() => navigate("/practice")}
          >
            Probleme restanță
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

function StatChip({ value, max, label, color }: { value: number; max: number; label: string; color: string }) {
  return (
    <div className="stat-chip">
      <div className="text-xl font-bold" style={{ color }}>
        {value}<span className="text-sm font-normal" style={{ color: "var(--color-text-dim)" }}>/{max}</span>
      </div>
      <div className="text-xs" style={{ color: "var(--color-text-dim)" }}>{label}</div>
    </div>
  );
}
