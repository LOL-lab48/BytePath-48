// core/app.js

import { lessons } from '../lessons.config.js';
import { renderLessonList, showLessonContent } from '../components/lessonView.js';
import { userData } from './userData.js';

/* ================================
   INITIALIZE SITE
================================ */

document.addEventListener("DOMContentLoaded", () => {

    // Render sidebar
    renderLessonList('lesson-list');

    // Auto load current lesson
    const currentLesson = lessons.find(
        lesson => lesson.id === userData.currentLesson
    );

    if (currentLesson) {
        showLessonContent(currentLesson);
    }

    setupCodeCheck();

});


/* ================================
   CHECK CODE BUTTON
================================ */

function setupCodeCheck() {

    const checkButton = document.getElementById("check-btn");

    if (!checkButton) return;

    checkButton.addEventListener("click", () => {

        const editor = document.getElementById("editor");
        const feedback = document.getElementById("feedback-container");

        if (!editor || !feedback) return;

        const userCode = editor.textContent.trim();

        if (userCode.length === 0) {
            feedback.innerHTML = `<p style="color:red;">You haven't written any code yet.</p>`;
            return;
        }

        feedback.innerHTML = `
            <p style="color:green;">
                Code submitted successfully ✔<br>
                If it runs without errors, you're doing great!
            </p>
        `;

    });

}
