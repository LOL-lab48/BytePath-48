export function runJSCode(userCode, timeout = 2000) {
    return new Promise((resolve) => {
        const worker = new Worker('../workers/jsWorker.js');
        let finished = false;

        const timer = setTimeout(() => {
            if (!finished) {
                worker.terminate();
                resolve({
                    output: "",
                    error: "⏰ Execution timed out (possible infinite loop)"
                });
            }
        }, timeout);

        worker.onmessage = (e) => {
            finished = true;
            clearTimeout(timer);
            resolve(e.data);
            worker.terminate();
        };

        worker.postMessage(userCode);
    });
}
