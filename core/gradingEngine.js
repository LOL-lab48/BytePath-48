import { runJSCode } from './executionEngine.js';

export async function gradeLesson(userCode, lessonRequirements) {
    let feedback = [];
    let passed = true;

    // Structural checks
    if (lessonRequirements.mustContain) {
        lessonRequirements.mustContain.forEach((keyword) => {
            if (!userCode.includes(keyword)) {
                feedback.push(`❌ Your code is missing: ${keyword}`);
                passed = false;
            }
        });
    }

    // Execute code safely
    if (lessonRequirements.language === "javascript") {
        const result = await runJSCode(userCode);

        if (result.error) {
            feedback.push(`❌ Runtime error: ${result.error}`);
            passed = false;
        }

        if (
            lessonRequirements.expectedOutput &&
            result.output.trim() !== lessonRequirements.expectedOutput.trim()
        ) {
            feedback.push(
                `❌ Output mismatch. Expected: "${lessonRequirements.expectedOutput}", Got: "${result.output}"`
            );
            passed = false;
        } else if (lessonRequirements.expectedOutput) {
            feedback.push(`✅ Output matches expected result`);
        }
    }

    return {
        passed,
        feedback
    };
}
