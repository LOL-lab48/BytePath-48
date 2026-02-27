// workers/jsWorker.js

self.onmessage = function(e) {
    const userCode = e.data;

    let output = "";
    let error = null;

    // Override console.log to capture output
    const originalConsoleLog = console.log;
    console.log = function(...args) {
        output += args.join(" ") + "\n";
    };

    try {
        // Execute user code safely
        const result = new Function(userCode);
        result();
    } catch (err) {
        error = err.toString();
    }

    // Restore console
    console.log = originalConsoleLog;

    // Send result back
    self.postMessage({
        output: output.trim(),
        error: error
    });
};
