// core/executionEngine.js

export function runJSCode(userCode, timeout = 2000) {
    return new Promise((resolve) => {
        const worker = new Worker('../workers/jsWorker.js');

        let finished = false;

        // Set up timeout
        const timer = setTimeout(() => {
            if (!finished) {
                worker.terminate();
                resolve({
                    output: "",
                    error: "⏰ Execution timed out (possible infinite loop)"
                });
            }
        }, timeout);

        // Listen for worker messages
        worker.onmessage = (e) => {
            finished = true;
            clearTimeout(timer);
            resolve(e.data);
            worker.terminate();
        };

        // Send code to worker
        worker.postMessage(userCode);
    });
}
