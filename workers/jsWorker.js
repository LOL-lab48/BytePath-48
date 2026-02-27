self.onmessage = function(e) {
    const userCode = e.data;
    let output = "";
    let error = null;

    const originalConsoleLog = console.log;
    console.log = function(...args) {
        output += args.join(" ") + "\n";
    };

    try {
        const result = new Function(userCode);
        result();
    } catch (err) {
        error = err.toString();
    }

    console.log = originalConsoleLog;

    self.postMessage({
        output: output.trim(),
        error: error
    });
};
