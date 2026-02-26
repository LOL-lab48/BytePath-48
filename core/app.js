// core/app.js
import { lessons } from '../config/lessons.config.js';
import { renderLessonList } from '../components/lessonView.js';
import { getCurrentLesson } from './unlockSystem.js';
import { startAdPopups } from '../components/adManager.js';

// Placeholder user data
let userData = {
    currentLesson: 1,
    lastUnlockDate: null,
    totalLessons: lessons.length
};

// Run when page loads
window.addEventListener('DOMContentLoaded', () => {
    const currentLesson = getCurrentLesson(userData);

    // Render sidebar
    renderLessonList('lesson-list', lessons, currentLesson);

    // Start ad popups
    startAdPopups();
});
