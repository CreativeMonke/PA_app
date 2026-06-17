import type { TestCase, TestResult } from "@/types";

let worker: Worker | null = null;

function getWorker(): Worker {
  if (!worker) {
    worker = new Worker(
      new URL("./sandbox.worker.ts", import.meta.url),
      { type: "module" },
    );
  }
  return worker;
}

export function runCode(
  code: string,
  testCases: TestCase[],
  functionName: string,
  timeoutMs = 5000,
): Promise<TestResult[]> {
  const w = getWorker();

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Execuția a depășit limita de timp."));
    }, timeoutMs);

    const handler = (e: MessageEvent<TestResult[]>) => {
      clearTimeout(timer);
      w.removeEventListener("message", handler);
      resolve(e.data);
    };

    w.addEventListener("message", handler);
    w.postMessage({ code, testCases, functionName });
  });
}

export function terminateWorker() {
  if (worker) {
    worker.terminate();
    worker = null;
  }
}
