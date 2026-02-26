import { lessons } from '../config/lessons.config.js';
import { renderLessonList } from '../components/lessonView.js';
import { getCurrentLesson } from './unlockSystem.js';

// Placeholder user data
let userData = {
    currentLesson: 0,
    lastUnlockDate: null,
    totalLessons: lessons.length
};

window.addEventListener('DOMContentLoaded', () => {
    const currentLesson = getCurrentLesson(userData);
    renderLessonList('lesson-list', lessons, currentLesson);
});
