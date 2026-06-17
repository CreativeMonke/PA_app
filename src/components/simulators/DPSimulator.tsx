import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

interface DPStep {
  row: number;
  col: number;
  value: number;
  fromAbove: boolean;
  fromLeft: boolean;
  description: string;
}

function computeDPLongestPath(matrix: number[][]): { dp: number[][]; steps: DPStep[] } {
  const N = matrix.length;
  const M = matrix[0].length;
  const dp: number[][] = Array.from({ length: N }, () => new Array(M).fill(0));
  const steps: DPStep[] = [];

  // Base: (0,0)
  dp[0][0] = 1;
  steps.push({ row: 0, col: 0, value: 1, fromAbove: false, fromLeft: false, description: "Caz de bază: dp[0][0] = 1" });

  // First row
  for (let j = 1; j < M; j++) {
    const prev = dp[0][j - 1];
    if (prev > 0 && matrix[0][j - 1] < matrix[0][j]) {
      dp[0][j] = j + 1;
      steps.push({ row: 0, col: j, value: j + 1, fromAbove: false, fromLeft: true, description: `dp[0][${j}] = ${j + 1} (A[0][${j - 1}]=${matrix[0][j - 1]} < A[0][${j}]=${matrix[0][j]} ✓)` });
    } else {
      dp[0][j] = 0;
      steps.push({ row: 0, col: j, value: 0, fromAbove: false, fromLeft: false, description: `dp[0][${j}] = 0 (condiție crescătoare nu e satisfăcută)` });
    }
  }

  // First column
  for (let i = 1; i < N; i++) {
    const prev = dp[i - 1][0];
    if (prev > 0 && matrix[i - 1][0] < matrix[i][0]) {
      dp[i][0] = i + 1;
      steps.push({ row: i, col: 0, value: i + 1, fromAbove: true, fromLeft: false, description: `dp[${i}][0] = ${i + 1} (A[${i - 1}][0]=${matrix[i - 1][0]} < A[${i}][0]=${matrix[i][0]} ✓)` });
    } else {
      dp[i][0] = 0;
      steps.push({ row: i, col: 0, value: 0, fromAbove: false, fromLeft: false, description: `dp[${i}][0] = 0 (condiție crescătoare nu e satisfăcută)` });
    }
  }

  // Fill rest
  for (let i = 1; i < N; i++) {
    for (let j = 1; j < M; j++) {
      const aboveOk = dp[i - 1][j] > 0 && matrix[i - 1][j] < matrix[i][j];
      const leftOk = dp[i][j - 1] > 0 && matrix[i][j - 1] < matrix[i][j];
      if (aboveOk || leftOk) {
        dp[i][j] = i + j + 1;
        steps.push({
          row: i, col: j, value: dp[i][j],
          fromAbove: aboveOk, fromLeft: leftOk,
          description: `dp[${i}][${j}] = ${dp[i][j]} = i+j+1 (${aboveOk ? `sus: ${matrix[i-1][j]}<${matrix[i][j]}` : ""}${aboveOk && leftOk ? ", " : ""}${leftOk ? `stânga: ${matrix[i][j-1]}<${matrix[i][j]}` : ""})`,
        });
      } else {
        dp[i][j] = 0;
        steps.push({
          row: i, col: j, value: 0,
          fromAbove: false, fromLeft: false,
          description: `dp[${i}][${j}] = 0 (niciun vecin valid: sus=${matrix[i-1][j]} vs ${matrix[i][j]}, stânga=${matrix[i][j-1]} vs ${matrix[i][j]})`,
        });
      }
    }
  }

  return { dp, steps };
}

const DEFAULT_MATRIX = [
  [1, 3, 2, 5],
  [2, 4, 6, 3],
  [3, 5, 7, 8],
];

interface Props {
  matrix?: number[][];
}

export default function DPSimulator({ matrix = DEFAULT_MATRIX }: Props) {
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { dp, steps } = computeDPLongestPath(matrix);
  const total = steps.length;
  const step = steps[stepIdx] ?? null;

  // Build partial dp to show
  const partialDP: number[][] = Array.from({ length: matrix.length }, () =>
    new Array(matrix[0].length).fill(-1)
  );
  for (let s = 0; s <= stepIdx && s < steps.length; s++) {
    const { row, col, value } = steps[s];
    partialDP[row][col] = value;
  }

  const go = useCallback((dir: 1 | -1) => {
    setStepIdx((s) => Math.max(0, Math.min(total - 1, s + dir)));
  }, [total]);

  useEffect(() => {
    if (!isPlaying) return;
    if (stepIdx >= total - 1) { setIsPlaying(false); return; }
    const t = setTimeout(() => setStepIdx((s) => s + 1), 700);
    return () => clearTimeout(t);
  }, [isPlaying, stepIdx, total]);

  const maxVal = Math.max(...dp.flat());

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-6 flex-wrap">
        {/* Matrix A */}
        <div>
          <div className="text-xs mb-2" style={{ color: "var(--color-text-muted)" }}>Matricea A</div>
          <div className="flex flex-col gap-1">
            {matrix.map((row, i) => (
              <div key={i} className="flex gap-1">
                {row.map((val, j) => {
                  const isCurrent = step && step.row === i && step.col === j;
                  return (
                    <div
                      key={j}
                      className={`sim-cell ${isCurrent ? "sim-cell--active" : ""}`}
                      style={{ width: 42, height: 38, fontSize: 15 }}
                    >
                      {val}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* DP Table */}
        <div>
          <div className="text-xs mb-2" style={{ color: "var(--color-text-muted)" }}>Tabelul DP</div>
          <div className="flex flex-col gap-1">
            {matrix.map((row, i) => (
              <div key={i} className="flex gap-1">
                {row.map((_, j) => {
                  const val = partialDP[i][j];
                  const isCurrent = step && step.row === i && step.col === j;
                  const isMax = val === maxVal && val > 0;

                  return (
                    <motion.div
                      key={j}
                      className={`sim-cell ${
                        isCurrent
                          ? val > 0 ? "sim-cell--match" : "sim-cell--mismatch"
                          : val > 0 && isMax
                          ? "sim-cell--active"
                          : val > 0
                          ? "sim-cell--dp-filled"
                          : ""
                      }`}
                      style={{ width: 42, height: 38, fontSize: 15 }}
                      animate={isCurrent ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {val === -1 ? "" : val === 0 ? "—" : val}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2 justify-start pt-5">
          {maxVal > 0 && stepIdx === total - 1 && (
            <div className="badge badge--amber">
              max = {maxVal}
            </div>
          )}
          <div className="text-xs" style={{ color: "var(--color-text-dim)" }}>
            <span className="sim-cell sim-cell--dp-filled" style={{ display: "inline-flex", width: 14, height: 14, fontSize: 9, borderRadius: 3 }} /> umplut
          </div>
          <div className="text-xs" style={{ color: "var(--color-text-dim)" }}>
            <span className="sim-cell sim-cell--active" style={{ display: "inline-flex", width: 14, height: 14, fontSize: 9, borderRadius: 3 }} /> maxim
          </div>
        </div>
      </div>

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
              background: step.value > 0 ? "rgba(52,211,153,0.06)" : "rgba(251,113,133,0.06)",
              border: `1px solid ${step.value > 0 ? "rgba(52,211,153,0.2)" : "rgba(251,113,133,0.2)"}`,
              color: step.value > 0 ? "var(--color-emerald)" : "rgba(255,255,255,0.6)",
            }}
          >
            {step.description}
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
        <button className="pa-btn pa-btn--icon pa-btn--ghost" onClick={() => setStepIdx(0)} title="Reset">
          <RotateCcw size={14} />
        </button>
        <span className="text-xs ml-auto" style={{ color: "var(--color-text-dim)" }}>
          Pas {total > 0 ? stepIdx + 1 : 0} / {total}
        </span>
      </div>
    </div>
  );
}
