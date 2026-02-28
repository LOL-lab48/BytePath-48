// core/gradingEngine.js

export function gradeLesson(userCode, lesson) {

    let feedback = "";
    let isCorrect = false;

    try {

        // ===== CAPTURE USER OUTPUT =====
        let userOutput = "";
        const originalConsoleLog = console.log;

        console.log = (...args) => {
            userOutput += args.join(" ") + "\n";
        };

        new Function(userCode)();

        // ===== CAPTURE EXPECTED OUTPUT =====
        let expectedOutput = "";

        console.log = (...args) => {
            expectedOutput += args.join(" ") + "\n";
        };

        new Function(lesson.example)();

        console.log = originalConsoleLog;

        userOutput = userOutput.trim();
        expectedOutput = expectedOutput.trim();

        // ===== GRADING LOGIC =====

        if (userOutput === expectedOutput) {
            isCorrect = true;
            feedback = "✅ Perfect! That is exactly correct. Great work!";
        }

        else if (userOutput.length === 0) {
            feedback = "⚠️ Your code didn't print anything. Did you forget console.log()?";
        }

        else if (!userCode.includes("console.log")) {
            feedback = "💡 You wrote code, but you need to use console.log() to print your answer.";
        }

        else if (userOutput.toLowerCase() === expectedOutput.toLowerCase()) {
            feedback = "👍 Almost perfect! Check capital letters and punctuation.";
        }

        else if (userOutput.includes(expectedOutput.split(" ")[0])) {
            feedback = "🙂 You're close! Compare your output carefully to the example.";
        }

        else {
            feedback = "❌ Not quite right. Look carefully at the example and match it exactly.";
        }

    } catch (err) {
        feedback = "❌ There is an error in your code: " + err.message;
    }

    return { isCorrect, feedback };
}
