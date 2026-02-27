import { userData } from '../core/userData.js';
import { gradeLesson } from '../core/gradingEngine.js';

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
        }

        li.onclick = () => {
            if (index + 1 <= userData.currentLesson) {
                showLessonContent(lesson);
            }
        };

        container.appendChild(li);
    });
}

export function showLessonContent(lesson) {
    currentLessonData = lesson;

    const lessonText = document.getElementById('lesson-text');
    const editor = document.getElementById('editor');
    const unlockContainer = document.getElementById('unlock-container');
    const feedbackContainer = document.getElementById('feedback-container');

    lessonText.innerHTML = `
        <h2>${lesson.title}</h2>
        ${lesson.explanation}
    `;

    editor.textContent = lesson.starterCode;

    unlockContainer.innerHTML = `
        <button id="ad-unlock-btn">Watch Ad to Unlock</button>
        <button id="midnight-unlock-btn">Wait Until Midnight</button>
    `;

    feedbackContainer.innerHTML = '';
}

document.getElementById('check-btn').addEventListener('click', () => {
    const editor = document.getElementById('editor');
    const feedbackContainer = document.getElementById('feedback-container');

    const result = gradeLesson(editor.textContent, currentLessonData.mustContain);

    feedbackContainer.innerHTML = result;
});
