// core/app.js
import { lessons } from '../config/lessons.config.js';
import { renderLessonList } from '../components/lessonView.js';
import { getCurrentLesson } from './unlockSystem.js';

// Placeholder user data
let userData = {
    currentLesson: 1,        // starts at lesson 1
    lastUnlockDate: null,
    totalLessons: lessons.length
};

// Run when page loads
window.addEventListener('DOMContentLoaded', () => {
    const currentLesson = getCurrentLesson(userData);
    renderLessonList('lesson-list', lessons, currentLesson);
});
