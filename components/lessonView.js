// components/lessonView.js

import { userData, saveUserData } from '../core/userData.js';
import { lessons } from '../lessons.config.js';

let currentLessonData = null;
let adCooldown = false;

/* ================================
   RENDER LESSON LIST
================================ */

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

/* ================================
   SHOW LESSON
================================ */

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
        <button id="ad-unlock-btn">Watch Ad (10s)</button>
        <button id="midnight-unlock-btn">Wait Until Midnight</button>
    `;

    document.getElementById('ad-unlock-btn').onclick = simulateAdWatch;
    document.getElementById('midnight-unlock-btn').onclick = checkMidnightUnlock;
}

/* ================================
   AD SYSTEM
================================ */

function simulateAdWatch() {

    if (adCooldown) {
        alert("You must wait 3 minutes before watching another ad.");
        return;
    }

    createAdOverlay();

    let seconds = 10;
    const countdown = document.getElementById("ad-countdown");
    const closeBtn = document.getElementById("ad-close-btn");

    // Disable X button initially
    closeBtn.disabled = true;

    const timer = setInterval(() => {
        countdown.textContent = seconds;
        seconds--;

        if (seconds < 0) {
            clearInterval(timer);
            // Enable X button after countdown
            closeBtn.disabled = false;
        }
    }, 1000);

    closeBtn.onclick = () => {
        if (!closeBtn.disabled) {
            closeAdOverlay();
            unlockNextLesson();
            startAdCooldown();
        }
    };
}

function createAdOverlay() {
    const overlay = document.createElement("div");
    overlay.id = "ad-overlay";

    overlay.innerHTML = `
        <div class="ad-box">
            <h2>Sponsored Ad</h2>
            <p>Check out WhatABetterDeal!</p>
            <a href="https://lol-lab48.github.io/WhatABetterDeal/" target="_blank">
                Visit Now
            </a>
            <p>Unlocking in <span id="ad-countdown">10</span> seconds...</p>
            <button id="ad-close-btn">X</button>
        </div>
    `;

    document.body.appendChild(overlay);
}

function closeAdOverlay() {
    const overlay = document.getElementById("ad-overlay");
    if (overlay) overlay.remove();
}

function startAdCooldown() {
    adCooldown = true;
    setTimeout(() => {
        adCooldown = false;
    }, 180000); // 3 minutes
}

/* ================================
   MIDNIGHT UNLOCK
================================ */

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

/* ================================
   UNLOCK FUNCTION
================================ */

function unlockNextLesson() {
    if (userData.currentLesson < userData.totalLessons) {
        userData.currentLesson++;
        saveUserData();
        renderLessonList('lesson-list');
    }
}
