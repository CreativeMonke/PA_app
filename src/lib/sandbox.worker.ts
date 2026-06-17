interface TestCase {
  label: string;
  args: unknown[];
  expected: unknown;
}

interface RunMessage {
  code: string;
  testCases: TestCase[];
  functionName: string;
}

self.onmessage = (e: MessageEvent<RunMessage>) => {
  const { code, testCases, functionName } = e.data;

  const results = testCases.map((tc) => {
    const t0 = performance.now();
    try {
      const fn = new Function(`${code}\nreturn typeof ${functionName} === "function" ? ${functionName} : undefined;`)();
      if (typeof fn !== "function") {
        return {
          label: tc.label,
          passed: false,
          actual: "undefined",
          expected: String(tc.expected),
          error: `Funcția "${functionName}" nu a fost definită.`,
          durationMs: performance.now() - t0,
        };
      }

      const result = fn(...tc.args);
      const actual = JSON.stringify(result);
      const expected = JSON.stringify(tc.expected);
      const passed = actual === expected;

      return {
        label: tc.label,
        passed,
        actual,
        expected,
        durationMs: performance.now() - t0,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return {
        label: tc.label,
        passed: false,
        actual: "",
        expected: String(tc.expected),
        error: msg,
        durationMs: performance.now() - t0,
      };
    }
  });

  self.postMessage(results);
};
