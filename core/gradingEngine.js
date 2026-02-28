// core/gradingEngine.js

export function gradeLesson(userCode, lesson) {
    let feedback = "";
    let isCorrect = false;

    try {
        // Capture console output
        let output = "";
        const originalConsoleLog = console.log;
        console.log = (...args) => {
            output += args.join(" ") + "\n";
        };

        // Execute user code safely
        const fn = new Function(userCode);
        fn();

        console.log = originalConsoleLog;

        const expectedOutput = lesson.example.replace(/[\r\n]+/g, "\n").trim();
        const userOutput = output.trim();

        // Multiple possible responses based on what they did
        if (userOutput === expectedOutput) {
            isCorrect = true;
            feedback = "✅ Perfect! You matched the example exactly.";
        } else if (userOutput.includes(expectedOutput.split(" ")[0])) {
            feedback = "👍 Good attempt! You got part of it right. Check for missing words, punctuation, or variable names.";
        } else if (userOutput.length === 0) {
            feedback = "⚠️ Your code didn't produce any output. Did you forget to use console.log?";
        } else if (/error/i.test(userOutput)) {
            feedback = `❌ There was an error in your code: ${userOutput}. Check syntax and spelling.`;
        } else if (/let|const|var/.test(userCode)) {
            feedback = "💡 You declared a variable correctly, but did you print it?";
        } else {
            feedback = "🤔 Something isn't quite right. Compare your output to the example carefully.";
        }

    } catch (err) {
        feedback = `❌ Error in your code: ${err.message}`;
    }

    return { isCorrect, feedback };
}
