import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

interface KMPStep {
  i: number;
  k: number;
  textPos: number;
  isMatch: boolean;
  isFound: boolean;
  description: string;
}

function computeFailure(pattern: string): number[] {
  const m = pattern.length;
  const f = new Array<number>(m).fill(0);
  let k = 0;
  for (let i = 1; i < m; i++) {
    while (k > 0 && pattern[i] !== pattern[k]) k = f[k - 1];
    if (pattern[i] === pattern[k]) k++;
    f[i] = k;
  }
  return f;
}

function computeSteps(text: string, pattern: string): KMPStep[] {
  const steps: KMPStep[] = [];
  const n = text.length;
  const m = pattern.length;
  if (m === 0 || n < m) return steps;
  const f = computeFailure(pattern);

  let i = 0;
  let k = 0;

  while (i <= n - m) {
    const textPos = i + k;
    const isMatch = k < m && textPos < n && text[textPos] === pattern[k];
    const isFound = isMatch && k === m - 1;

    steps.push({
      i, k, textPos,
      isMatch,
      isFound,
      description: isFound
        ? `✅ Apariție găsită la poziția ${i}!`
        : isMatch
        ? `✓ text[${textPos}]='${text[textPos]}' == pattern[${k}]='${pattern[k]}' — potrivire!`
        : `✗ text[${textPos}]='${text[textPos] ?? "—"}' ≠ pattern[${k}]='${pattern[k]}' — nepotrivire`,
    });

    if (isMatch) {
      k++;
      if (k === m) {
        const newK = f[k - 1];
        const newI = i + k - newK;
        i = newI;
        k = newK;
      }
    } else {
      if (k === 0) {
        i++;
      } else {
        const newK = f[k - 1];
        const newI = i + k - newK;
        i = newI;
        k = newK;
      }
    }

    if (steps.length > 500) break; // safety cap
  }

  return steps;
}

interface Props {
  defaultText?: string;
  defaultPattern?: string;
}

export default function KMPSimulator({ defaultText = "HIABABXABABXABABY", defaultPattern = "ABABXABABY" }: Props) {
  const [text, setText] = useState(defaultText);
  const [pattern, setPattern] = useState(defaultPattern);
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = computeSteps(text, pattern);
  const failure = computeFailure(pattern);
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
    const t = setTimeout(() => setStepIdx((s) => s + 1), 800);
    return () => clearTimeout(t);
  }, [isPlaying, stepIdx, total]);

  const matchedRange = step ? [step.i, step.i + step.k - 1] as const : null;

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
            style={{
              background: "var(--color-surface-raised)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
              outline: "none",
            }}
            spellCheck={false}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs" style={{ color: "var(--color-text-muted)" }}>Pattern</label>
          <input
            value={pattern}
            onChange={(e) => setPattern(e.target.value.toUpperCase())}
            className="rounded-lg px-3 py-2 text-sm font-mono"
            style={{
              background: "var(--color-surface-raised)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
              outline: "none",
            }}
            spellCheck={false}
          />
        </div>
      </div>

      {/* Failure function */}
      <div>
        <div className="text-xs mb-2" style={{ color: "var(--color-text-muted)" }}>
          Funcția eșec f[]
        </div>
        <div className="flex gap-1 flex-wrap">
          {pattern.split("").map((ch, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <div className="sim-cell sim-cell--header" style={{ height: 24, width: 36 }}>{i}</div>
              <div
                className="sim-cell"
                style={{
                  background: "rgba(103,232,249,0.1)",
                  borderColor: "rgba(103,232,249,0.3)",
                  color: "var(--color-cyan)",
                  fontSize: 13,
                  width: 36, height: 30,
                }}
              >
                {ch}
              </div>
              <div
                className="sim-cell"
                style={{
                  background: "rgba(251,191,36,0.08)",
                  borderColor: "rgba(251,191,36,0.25)",
                  color: "var(--color-amber)",
                  fontSize: 12,
                  width: 36, height: 30,
                }}
              >
                {failure[i]}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-1 mt-1">
          <span className="text-xs" style={{ color: "var(--color-text-dim)" }}>index / char / f[i]</span>
        </div>
      </div>

      {/* Text visualization */}
      {step !== null && (
        <div>
          <div className="text-xs mb-2" style={{ color: "var(--color-text-muted)" }}>
            Text — aliniere la i={step.i}, k={step.k} potrivit
          </div>
          <div className="flex gap-1 flex-wrap">
            {text.split("").map((ch, idx) => {
              const isCurrentPos = idx === step.textPos;
              const isMatched =
                matchedRange !== null &&
                idx >= matchedRange[0] &&
                idx <= matchedRange[1] &&
                step.k > 0;

              let cls = "sim-cell";
              if (isCurrentPos) cls += step.isMatch ? " sim-cell--match" : " sim-cell--mismatch";
              else if (isMatched) cls += " sim-cell--active";

              return (
                <div key={idx} className="flex flex-col items-center gap-0.5">
                  <div className="sim-cell sim-cell--header" style={{ height: 20, width: 36, fontSize: 10 }}>{idx}</div>
                  <div className={cls} style={{ width: 36 }}>{ch}</div>
                </div>
              );
            })}
          </div>

          {/* Pattern alignment */}
          <div className="flex gap-1 flex-wrap mt-1" style={{ paddingLeft: step.i * (36 + 4) }}>
            {pattern.split("").map((ch, idx) => {
              const inK = idx < step.k;
              const isCurr = idx === step.k;
              let cls = "sim-cell";
              if (isCurr) cls += step.isMatch ? " sim-cell--match" : " sim-cell--mismatch";
              else if (inK) cls += " sim-cell--active";
              return (
                <div key={idx} className={cls} style={{ width: 36 }}>{ch}</div>
              );
            })}
          </div>
          <div className="text-xs mt-1" style={{ color: "var(--color-text-dim)" }}>pattern ↑</div>
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
            className="rounded-lg px-4 py-3 text-sm font-mono"
            style={{
              background: step.isFound
                ? "rgba(52,211,153,0.1)"
                : step.isMatch
                ? "rgba(52,211,153,0.06)"
                : "rgba(251,113,133,0.06)",
              border: `1px solid ${step.isFound ? "rgba(52,211,153,0.3)" : step.isMatch ? "rgba(52,211,153,0.2)" : "rgba(251,113,133,0.2)"}`,
              color: step.isFound ? "var(--color-emerald)" : step.isMatch ? "var(--color-emerald)" : "var(--color-rose)",
            }}
          >
            {step.description}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          className="pa-btn pa-btn--icon pa-btn--ghost"
          onClick={() => { setStepIdx(0); setIsPlaying(false); }}
          disabled={stepIdx === 0}
          title="Reset"
        >
          <SkipBack size={14} />
        </button>
        <button
          className="pa-btn pa-btn--icon pa-btn--ghost"
          onClick={() => go(-1)}
          disabled={stepIdx === 0}
          title="Previous"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          className="pa-btn pa-btn--primary"
          style={{ padding: "7px 16px", fontSize: 13 }}
          onClick={() => setIsPlaying((p) => !p)}
          disabled={total === 0}
        >
          {isPlaying ? <Pause size={13} /> : <Play size={13} />}
          {isPlaying ? "Pauză" : "Auto"}
        </button>
        <button
          className="pa-btn pa-btn--icon pa-btn--ghost"
          onClick={() => go(1)}
          disabled={stepIdx >= total - 1}
          title="Next"
        >
          <ChevronRight size={14} />
        </button>
        <button
          className="pa-btn pa-btn--icon pa-btn--ghost"
          onClick={() => { setStepIdx(0); setText(defaultText); setPattern(defaultPattern); }}
          title="Reset example"
        >
          <RotateCcw size={14} />
        </button>
        <span className="text-xs ml-auto" style={{ color: "var(--color-text-dim)" }}>
          Pas {total > 0 ? stepIdx + 1 : 0} / {total}
        </span>
      </div>
    </div>
  );
}
