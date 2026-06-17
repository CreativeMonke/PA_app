import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

interface BMStep {
  alignStart: number;
  compareK: number; // index in pattern (from right) being compared
  mismatchAt: number | null;
  rule: "bad-char" | "good-suffix" | "match" | "found";
  shift: number;
  description: string;
}

function lastOccurrence(pattern: string): Record<string, number> {
  const occ: Record<string, number> = {};
  for (let i = 0; i < pattern.length; i++) {
    occ[pattern[i]] = i;
  }
  return occ;
}

function computeSteps(text: string, pattern: string): BMStep[] {
  const steps: BMStep[] = [];
  const n = text.length;
  const m = pattern.length;
  if (m === 0 || n < m) return steps;

  const last = lastOccurrence(pattern);
  let i = 0;

  while (i <= n - m) {
    let k = m - 1;

    // Compare from right to left
    while (k >= 0 && pattern[k] === text[i + k]) {
      if (k === m - 1) {
        steps.push({
          alignStart: i, compareK: k,
          mismatchAt: null, rule: "match",
          shift: 0,
          description: `✓ text[${i+k}]='${text[i+k]}' == pattern[${k}]='${pattern[k]}' — potrivire`,
        });
      }
      k--;
    }

    if (k < 0) {
      steps.push({
        alignStart: i, compareK: 0,
        mismatchAt: null, rule: "found",
        shift: m,
        description: `✅ Apariție găsită la poziția ${i}! Salt cu ${m}.`,
      });
      i += m;
    } else {
      const badChar = text[i + k];
      const lastPos = last[badChar] ?? -1;
      const shiftBC = Math.max(1, k - lastPos);

      // Simplified good suffix: just use shift of 1 when not found
      const shiftGS = 1;
      const shift = Math.max(shiftBC, shiftGS);

      const rule = shiftBC >= shiftGS ? "bad-char" : "good-suffix";

      steps.push({
        alignStart: i, compareK: k,
        mismatchAt: k, rule,
        shift,
        description: rule === "bad-char"
          ? `✗ text[${i+k}]='${badChar}' ≠ pattern[${k}]='${pattern[k]}'. Bad char '${badChar}' apare ultima oară la pos ${lastPos === -1 ? "niciodată (−1)" : lastPos} în pattern. Salt bad-char = max(1, ${k}−${lastPos}) = ${shiftBC}.`
          : `✗ Nepotrivire la k=${k}. Regula good-suffix: salt = ${shiftGS}.`,
      });

      i += shift;
    }

    if (steps.length > 200) break;
  }

  return steps;
}

interface Props {
  defaultText?: string;
  defaultPattern?: string;
}

export default function BMSimulator({
  defaultText = "BAABCABCABCABC",
  defaultPattern = "ABCAB",
}: Props) {
  const [text, setText] = useState(defaultText);
  const [pattern, setPattern] = useState(defaultPattern);
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = computeSteps(text, pattern);
  const step = steps[stepIdx] ?? null;
  const total = steps.length;

  const go = useCallback((dir: 1 | -1) => {
    setStepIdx((s) => Math.max(0, Math.min(total - 1, s + dir)));
  }, [total]);

  useEffect(() => {
    setStepIdx(0);
    setIsPlaying(false);
  }, [text, pattern]);

  useEffect(() => {
    if (!isPlaying) return;
    if (stepIdx >= total - 1) { setIsPlaying(false); return; }
    const t = setTimeout(() => setStepIdx((s) => s + 1), 900);
    return () => clearTimeout(t);
  }, [isPlaying, stepIdx, total]);

  const last = lastOccurrence(pattern);

  return (
    <div className="flex flex-col gap-4">
      {/* Input row */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <label className="text-xs" style={{ color: "var(--color-text-muted)" }}>Text</label>
          <input
            value={text}
            onChange={(e) => setText(e.target.value.toUpperCase())}
            className="rounded-lg px-3 py-2 text-sm font-mono"
            style={{ background: "var(--color-surface-raised)", border: "1px solid var(--color-border)", color: "var(--color-text)", outline: "none" }}
            spellCheck={false}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs" style={{ color: "var(--color-text-muted)" }}>Pattern</label>
          <input
            value={pattern}
            onChange={(e) => setPattern(e.target.value.toUpperCase())}
            className="rounded-lg px-3 py-2 text-sm font-mono"
            style={{ background: "var(--color-surface-raised)", border: "1px solid var(--color-border)", color: "var(--color-text)", outline: "none" }}
            spellCheck={false}
          />
        </div>
      </div>

      {/* Last occurrence table */}
      <div>
        <div className="text-xs mb-2" style={{ color: "var(--color-text-muted)" }}>
          Ultima apariție în pattern (bad character)
        </div>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(last).map(([ch, pos]) => (
            <div key={ch} className="flex flex-col items-center gap-0.5">
              <div
                className="sim-cell"
                style={{ background: "rgba(103,232,249,0.1)", borderColor: "rgba(103,232,249,0.3)", color: "var(--color-cyan)", width: 36, height: 30 }}
              >
                {ch}
              </div>
              <div
                className="sim-cell"
                style={{ background: "rgba(251,191,36,0.08)", borderColor: "rgba(251,191,36,0.25)", color: "var(--color-amber)", fontSize: 12, width: 36, height: 26 }}
              >
                {pos}
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs mt-1" style={{ color: "var(--color-text-dim)" }}>char / pos</div>
      </div>

      {/* Visualization */}
      {step !== null && (
        <div>
          <div className="text-xs mb-2" style={{ color: "var(--color-text-muted)" }}>
            Aliniere la i={step.alignStart}
          </div>
          <div className="flex gap-1 flex-wrap">
            {text.split("").map((ch, idx) => {
              const inWindow = idx >= step.alignStart && idx < step.alignStart + pattern.length;
              const isCompare = idx === step.alignStart + step.compareK;
              const found = step.rule === "found";

              let cls = "sim-cell";
              if (found && inWindow) cls += " sim-cell--match";
              else if (isCompare && step.mismatchAt !== null) cls += " sim-cell--mismatch";
              else if (isCompare) cls += " sim-cell--match";
              else if (inWindow) cls += " sim-cell--active";

              return (
                <div key={idx} className="flex flex-col items-center gap-0.5">
                  <div className="sim-cell sim-cell--header" style={{ height: 20, width: 36, fontSize: 10 }}>{idx}</div>
                  <div className={cls} style={{ width: 36 }}>{ch}</div>
                </div>
              );
            })}
          </div>

          {/* Pattern below */}
          <div
            className="flex gap-1 flex-wrap mt-1"
            style={{ paddingLeft: step.alignStart * (36 + 4) }}
          >
            {pattern.split("").map((ch, idx) => {
              const found = step.rule === "found";
              const isCurr = idx === step.compareK;
              let cls = "sim-cell";
              if (found) cls += " sim-cell--match";
              else if (isCurr && step.mismatchAt !== null) cls += " sim-cell--mismatch";
              else if (isCurr) cls += " sim-cell--match";
              return (
                <div key={idx} className={cls} style={{ width: 36 }}>{ch}</div>
              );
            })}
          </div>
          <div className="text-xs mt-0.5" style={{ color: "var(--color-text-dim)" }}>pattern ↑ (comparație de la dreapta)</div>
        </div>
      )}

      {/* Description */}
      <AnimatePresence mode="wait">
        {step && (
          <motion.div
            key={stepIdx}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-lg px-4 py-3 text-xs font-mono leading-relaxed"
            style={{
              background: step.rule === "found" ? "rgba(52,211,153,0.1)" : step.rule === "match" ? "rgba(52,211,153,0.06)" : "rgba(251,113,133,0.06)",
              border: `1px solid ${step.rule === "found" || step.rule === "match" ? "rgba(52,211,153,0.25)" : "rgba(251,113,133,0.2)"}`,
              color: step.rule === "found" || step.rule === "match" ? "var(--color-emerald)" : "var(--color-text)",
            }}
          >
            {step.description}
            {step.shift > 0 && step.rule !== "found" && (
              <span style={{ color: "var(--color-amber)", display: "block", marginTop: 4 }}>
                → Deplasare cu {step.shift} poziții
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button className="pa-btn pa-btn--icon pa-btn--ghost" onClick={() => { setStepIdx(0); setIsPlaying(false); }} disabled={stepIdx === 0} title="Reset">
          <SkipBack size={14} />
        </button>
        <button className="pa-btn pa-btn--icon pa-btn--ghost" onClick={() => go(-1)} disabled={stepIdx === 0}>
          <ChevronLeft size={14} />
        </button>
        <button className="pa-btn pa-btn--primary" style={{ padding: "7px 16px", fontSize: 13 }} onClick={() => setIsPlaying((p) => !p)} disabled={total === 0}>
          {isPlaying ? <Pause size={13} /> : <Play size={13} />}
          {isPlaying ? "Pauză" : "Auto"}
        </button>
        <button className="pa-btn pa-btn--icon pa-btn--ghost" onClick={() => go(1)} disabled={stepIdx >= total - 1}>
          <ChevronRight size={14} />
        </button>
        <button className="pa-btn pa-btn--icon pa-btn--ghost" onClick={() => { setStepIdx(0); setText(defaultText); setPattern(defaultPattern); }} title="Reset example">
          <RotateCcw size={14} />
        </button>
        <span className="text-xs ml-auto" style={{ color: "var(--color-text-dim)" }}>
          Pas {total > 0 ? stepIdx + 1 : 0} / {total}
        </span>
      </div>
    </div>
  );
}
