// components/lessonView.js
import { userData, saveUserData } from '../core/userData.js';
import { lessons } from '../lessons.config.js';

let currentLessonData = null;

// ====== Render the Lesson Sidebar ======
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

// ====== Show Lesson Content ======
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

    // Load starter code into editor
    editor.textContent = lesson.starterCode;

    // Clear previous feedback
    feedbackContainer.innerHTML = '';

    // Add Unlock Buttons
    unlockContainer.innerHTML = `
        <button id="ad-unlock-btn" class="unlock-btn">Watch Ad (10s) to Unlock</button>
        <button id="midnight-unlock-btn" class="unlock-btn">Wait Until Midnight</button>
    `;

    // Style buttons (small improvement)
    const buttons = unlockContainer.querySelectorAll('.unlock-btn');
    buttons.forEach(btn => {
        btn.style.padding = '10px 20px';
        btn.style.margin = '5px';
        btn.style.backgroundColor = '#4CAF50';
        btn.style.color = 'white';
        btn.style.border = 'none';
        btn.style.borderRadius = '5px';
        btn.style.cursor = 'pointer';
        btn.onmouseover = () => btn.style.backgroundColor = '#45a049';
        btn.onmouseout = () => btn.style.backgroundColor = '#4CAF50';
    });

    setupUnlockButtons();
}

// ====== Setup Unlock Buttons ======
function setupUnlockButtons() {
    document.getElementById('ad-unlock-btn').onclick = () => {
        simulateAdWatch();
    };

    document.getElementById('midnight-unlock-btn').onclick = () => {
        checkMidnightUnlock();
    };
}

// ====== Watch Ad Simulation ======
function simulateAdWatch() {
    alert("Ad playing... please wait 10 seconds.");

    setTimeout(() => {
        unlockNextLesson();
        alert("Lesson Unlocked!");
    }, 10000);
}

// ====== Wait Until Midnight Unlock ======
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

// ====== Unlock Next Lesson ======
function unlockNextLesson() {
    if (userData.currentLesson < userData.totalLessons) {
        userData.currentLesson++;
        saveUserData(); // Persist progress
        renderLessonList('lesson-list'); // Refresh sidebar
    }
}
