import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, BookOpen, FlaskConical, LayoutDashboard } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { useProgressStore } from "@/store/useProgressStore";

const MODES = [
  { id: "learn", label: "Învață", icon: BookOpen, path: "/learn" },
  { id: "practice", label: "Practică", icon: FlaskConical, path: "/practice" },
  { id: "overview", label: "Progres", icon: LayoutDashboard, path: "/overview" },
] as const;

export default function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleSidebar } = useAppStore();
  const { completedCount, passedCount, solvedCount } = useProgressStore();

  const currentMode = MODES.find((m) => location.pathname.startsWith(m.path))?.id ?? "learn";

  return (
    <div className="topbar">
      <button
        className="pa-btn pa-btn--icon pa-btn--ghost flex-shrink-0"
        onClick={toggleSidebar}
        title="Toggle sidebar"
      >
        <Menu size={16} />
      </button>

      <span className="text-sm font-semibold" style={{ color: "var(--color-amber)" }}>
        PA<span style={{ color: "var(--color-text-muted)", fontWeight: 400 }}> · Restanță</span>
      </span>

      <div className="flex-1" />

      {/* Mode Pill */}
      <nav className="mode-pill-track" aria-label="Navigation">
        {MODES.map((m) => {
          const active = currentMode === m.id;
          return (
            <button
              key={m.id}
              className={`mode-pill-btn ${active ? "mode-pill-btn--active" : ""}`}
              onClick={() => navigate(m.path)}
            >
              {active && (
                <motion.div
                  layoutId="mode-pill"
                  className="mode-pill-bg"
                  transition={{ type: "spring", bounce: 0.22, duration: 0.38 }}
                />
              )}
              {m.label}
            </button>
          );
        })}
      </nav>

      <div className="flex-1" />

      {/* Progress summary */}
      <div className="flex items-center gap-3">
        <AnimatePresence>
          {(completedCount() > 0 || passedCount() > 0 || solvedCount() > 0) && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-xs"
              style={{ color: "var(--color-text-muted)" }}
            >
              {completedCount() > 0 && (
                <span className="badge badge--emerald">{completedCount()} teme</span>
              )}
              {solvedCount() > 0 && (
                <span className="badge badge--amber">{solvedCount()} probleme</span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
