import { userData } from '../core/userData.js';
import { lessons } from '../lessons.config.js';

let currentLessonData = null;

export function renderLessonList(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    lessons.forEach((lesson, index) => {
        const li = document.createElement('li');
        li.textContent = lesson.title;

        if (index + 1 <= userData.currentLesson) {
            li.classList.add('unlocked');
        } else {
            li.classList.add('locked');
        }

        li.onclick = () => {
            if (index + 1 <= userData.currentLesson) {
                showLessonContent(lesson);
            } else {
                alert("Lesson locked! Watch an ad or wait until midnight.");
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
        <h3>What You Need To Do:</h3>
        <p>${lesson.task}</p>
        <h3>Example:</h3>
        <pre>${lesson.example}</pre>
    `;

    editor.textContent = lesson.starterCode;
    feedbackContainer.innerHTML = '';

    unlockContainer.innerHTML = `
        <button id="ad-unlock-btn">Watch Ad (10s) to Unlock</button>
        <button id="midnight-unlock-btn">Wait Until Midnight</button>
    `;

    setupUnlockButtons();
}

function setupUnlockButtons() {

    document.getElementById('ad-unlock-btn').onclick = () => {
        simulateAdWatch();
    };

    document.getElementById('midnight-unlock-btn').onclick = () => {
        checkMidnightUnlock();
    };
}

/* ===== WATCH AD UNLOCK ===== */

function simulateAdWatch() {
    alert("Ad playing... please wait 10 seconds.");

    setTimeout(() => {
        unlockNextLesson();
        alert("Lesson Unlocked!");
    }, 10000);
}

/* ===== MIDNIGHT UNLOCK ===== */

function checkMidnightUnlock() {

    const now = new Date();
    const today = now.toDateString();

    if (userData.lastUnlockDate === today) {
        alert("You already unlocked a lesson today.");
        return;
    }

    if (now.getHours() === 0) {
        userData.lastUnlockDate = today;
        unlockNextLesson();
        alert("Midnight Unlock Successful!");
    } else {
        alert("You can unlock the next lesson at midnight (00:00).");
    }
}

/* ===== UNLOCK FUNCTION ===== */

function unlockNextLesson() {
    if (userData.currentLesson < userData.totalLessons) {
        userData.currentLesson++;
        renderLessonList('lesson-list');
    }
}
