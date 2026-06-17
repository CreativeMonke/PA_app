import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Play, RotateCcw, ChevronDown, ChevronUp, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { runCode } from "@/lib/sandbox";
import type { TestCase, TestResult } from "@/types";

interface InteractiveHelperProps {
  codeTemplate: string;
  testCases: TestCase[];
  functionName: string;
}

export default function InteractiveHelper({ codeTemplate, testCases, functionName }: InteractiveHelperProps) {
  const [code, setCode] = useState(codeTemplate);
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [running, setRunning] = useState(false);
  const [showTests, setShowTests] = useState(true);

  const handleRun = useCallback(async () => {
    setRunning(true);
    setResults(null);
    try {
      const res = await runCode(code, testCases, functionName);
      setResults(res);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setResults(
        testCases.map((tc) => ({
          label: tc.label,
          passed: false,
          actual: "",
          expected: String(tc.expected),
          error: msg,
          durationMs: 0,
        })),
      );
    } finally {
      setRunning(false);
    }
  }, [code, testCases, functionName]);

  const handleReset = useCallback(() => {
    setCode(codeTemplate);
    setResults(null);
  }, [codeTemplate]);

  const allPassed = results?.every((r) => r.passed) ?? false;

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold" style={{ color: "var(--color-amber)" }}>
            Scrie soluția ta
          </span>
          <span
            className="rounded px-1.5 py-0.5 text-[9px] font-mono font-semibold"
            style={{ background: "rgba(251,191,36,0.12)", color: "var(--color-amber)" }}
          >
            JavaScript
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="pa-btn pa-btn--ghost"
            style={{ fontSize: 12, padding: "4px 8px" }}
            onClick={handleReset}
          >
            <RotateCcw size={11} />
            Resetează
          </button>
          <button
            className={`pa-btn pa-btn--${running ? "ghost" : "secondary"}`}
            style={{ fontSize: 12, padding: "4px 10px" }}
            onClick={handleRun}
            disabled={running}
          >
            {running ? (
              <Loader2 size={11} className="animate-spin" />
            ) : (
              <Play size={11} />
            )}
            {running ? "Rulează..." : "Rulează testele"}
          </button>
        </div>
      </div>

      {/* CodeMirror editor */}
      <div
        className="rounded-lg overflow-hidden"
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          background: "#0d1117",
        }}
      >
        <CodeMirror
          value={code}
          onChange={(value) => setCode(value)}
          extensions={[javascript()]}
          theme="dark"
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightActiveLine: true,
            foldGutter: false,
            indentOnInput: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: false,
          }}
          style={{ fontSize: 13, minHeight: 120 }}
        />
      </div>

      {/* Test cases info */}
      <button
        className="flex items-center gap-2 text-xs font-medium cursor-pointer select-none"
        style={{ color: "rgba(255,255,255,0.5)" }}
        onClick={() => setShowTests((v) => !v)}
      >
        {showTests ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        {testCases.length} {testCases.length === 1 ? "test" : "testuri"}{results ? (allPassed ? " — toate trecute ✓" : ` — ${results.filter((r) => r.passed).length}/${results.length} trecute`) : ""}
      </button>

      {/* Test cases list */}
      <AnimatePresence>
        {showTests && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: "hidden" }}
          >
            <div className="flex flex-col gap-1.5">
              {testCases.map((tc, i) => {
                const result = results?.[i];
                return (
                  <div
                    key={i}
                    className="rounded-lg px-3 py-2 text-xs font-mono"
                    style={{
                      background: result
                        ? result.passed
                          ? "rgba(52,211,153,0.06)"
                          : result.error
                            ? "rgba(251,113,133,0.06)"
                            : "rgba(251,113,133,0.04)"
                        : "rgba(255,255,255,0.02)",
                      border: `1px solid ${
                        result
                          ? result.passed
                            ? "rgba(52,211,153,0.15)"
                            : "rgba(251,113,133,0.12)"
                          : "rgba(255,255,255,0.04)"
                      }`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {result ? (
                        result.passed ? (
                          <CheckCircle2 size={11} style={{ color: "var(--color-emerald)" }} />
                        ) : (
                          <XCircle size={11} style={{ color: "var(--color-rose)" }} />
                        )
                      ) : (
                        <div
                          style={{
                            width: 11,
                            height: 11,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.08)",
                          }}
                        />
                      )}
                      <span style={{ color: result?.passed ? "var(--color-emerald)" : "rgba(255,255,255,0.5)" }}>
                        {tc.label}
                      </span>
                      {result && !result.passed && result.durationMs > 0 && (
                        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 10 }}>
                          {result.durationMs.toFixed(1)}ms
                        </span>
                      )}
                    </div>
                    {result?.error && (
                      <div style={{ color: "var(--color-rose)", fontSize: 11, marginTop: 2 }}>
                        {result.error}
                      </div>
                    )}
                    {result && !result.passed && !result.error && (
                      <div className="flex gap-4" style={{ marginTop: 2, fontSize: 11 }}>
                        <span style={{ color: "rgba(255,255,255,0.35)" }}>
                          primit: <span style={{ color: "var(--color-rose)" }}>{result.actual}</span>
                        </span>
                        <span style={{ color: "rgba(255,255,255,0.35)" }}>
                          așteptat: <span style={{ color: "var(--color-emerald)" }}>{result.expected}</span>
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
