import { userData } from '../core/userData.js';
import { gradeLesson } from '../core/gradingEngine.js';
import { startAdPopups } from './adManager.js';

let currentLessonData = null;

export function renderLessonList(containerId, lessons, currentLesson) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    lessons.forEach((lesson, index) => {
        const li = document.createElement('li');
        li.textContent = lesson.title;

        if (index + 1 <= currentLesson) {
            li.classList.add('unlocked');
        } else {
            li.classList.add('locked');
            li.textContent += ' 🔒';
        }

        li.addEventListener('click', () => {
            if (index + 1 <= userData.currentLesson) {
                showLessonContent(lesson);
            } else {
                alert('Lesson locked! Unlock at midnight or watch an ad.');
            }
        });

        container.appendChild(li);
    });
}

export function showLessonContent(lesson) {
    currentLessonData = lesson;

    const lessonText = document.getElementById('lesson-text');
    const editor = document.getElementById('editor');
    const feedbackContainer = document.getElementById('feedback-container');
    const unlockContainer = document.getElementById('unlock-container');

    // Clear old feedback
    feedbackContainer.innerHTML = '';

    // Show lesson title
    lessonText.innerHTML = `<h2>${lesson.title}</h2>`;

    // Show instructions
    lesson.instructions.forEach((step, index) => {
        const p = document.createElement('p');
        p.innerHTML = `<strong>Step ${index + 1}:</strong> ${step}`;
        lessonText.appendChild(p);
    });

    // Load starter code
    editor.textContent = lesson.starterCode || "// Type your code here";

    // Setup unlock buttons
    unlockContainer.innerHTML = `
        <button id="ad-unlock-btn">Watch Ad to Unlock Next Lesson</button>
        <button id="midnight-unlock-btn">Wait Until Midnight</button>
    `;

    document.getElementById('ad-unlock-btn').addEventListener('click', () => {
        startAdPopups();
    });

    document.getElementById('midnight-unlock-btn').addEventListener('click', () => {
        alert("⏰ Next lesson unlocks at midnight.");
    });
}

/* ---------- CHECK CODE BUTTON ---------- */

const checkBtn = document.getElementById('check-btn');

if (checkBtn) {
    checkBtn.addEventListener('click', async () => {
        if (!currentLessonData) return;

        const editor = document.getElementById('editor');
        const feedbackContainer = document.getElementById('feedback-container');

        const userCode = editor.textContent;

        const result = await gradeLesson(userCode, {
            language: currentLessonData.language,
            expectedOutput: currentLessonData.expectedOutput,
            mustContain: currentLessonData.mustContain || []
        });

        feedbackContainer.innerHTML = '';

        result.feedback.forEach(msg => {
            const p = document.createElement('p');
            p.textContent = msg;
            feedbackContainer.appendChild(p);
        });

        if (result.passed) {
            feedbackContainer.innerHTML += `<p>🎉 Lesson Complete!</p>`;

            if (userData.currentLesson < userData.totalLessons) {
                userData.currentLesson++;
            }
        }
    });
}
