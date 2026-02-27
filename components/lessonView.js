// components/lessonView.js
import { userData } from '../core/userData.js';
import { gradeLesson } from '../core/gradingEngine.js';
import { startAdPopups } from './adManager.js';

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
            if (index + 1 <= currentLesson) {
                showLessonContent(lesson);
            } else {
                alert('Lesson locked! Unlock at midnight or via bonus challenge.');
            }
        });

        container.appendChild(li);
    });
}

export async function showLessonContent(lesson) {
    const lessonText = document.getElementById('lesson-text');
    const editor = document.getElementById('editor');
    const feedbackContainer = document.getElementById('feedback-container');
    const unlockContainer = document.getElementById('unlock-container');

    // Show instructions
    lessonText.innerHTML = `<h2>${lesson.title}</h2>`;
    lesson.instructions.forEach((step, i) => {
        lessonText.innerHTML += `<p><strong>Step ${i + 1}:</strong> ${step}</p>`;
    });

    // Load starter code
    editor.textContent = lesson.starterCode;

    // Add Check My Code button
    let checkBtn = document.getElementById('check-btn');
    if (!checkBtn) {
        checkBtn = document.createElement('button');
        checkBtn.id = 'check-btn';
        checkBtn.textContent = "Check My Code";
        checkBtn.style.marginTop = "10px";
        lessonText.appendChild(checkBtn);
    }

    // Add unlock buttons
    unlockContainer.innerHTML = `
        <button id="ad-unlock-btn">Watch Ad to Unlock Next Lesson</button>
        <button id="midnight-unlock-btn">Wait Until Midnight to Unlock</button>
    `;

    document.getElementById('ad-unlock-btn').addEventListener('click', () => {
        startAdPopups(userData);
    });

    document.getElementById('midnight-unlock-btn').addEventListener('click', () => {
        alert("⏰ The lesson will unlock automatically at midnight.");
    });

    // Check code functionality
    checkBtn.addEventListener('click', async () => {
        const userCode = editor.textContent;

        const result = await gradeLesson(userCode, {
            language: lesson.language,
            expectedOutput: lesson.expectedOutput,
            mustContain: lesson.mustContain || []
        });

        // Show feedback
        feedbackContainer.innerHTML = '';
        result.feedback.forEach(msg => {
            const p = document.createElement('p');
            p.textContent = msg;
            feedbackContainer.appendChild(p);
        });

        // Unlock next lesson if passed
        if (result.passed && userData.currentLesson < userData.totalLessons) {
            userData.currentLesson++;
        }
    });
}
