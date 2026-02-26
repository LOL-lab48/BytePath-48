import { lessons } from '../config/lessons.config.js';
import { renderLessonList } from '../components/lessonView.js';

// Placeholder: current unlocked lesson (for now, first 3 unlocked)
let currentLesson = 3;

window.addEventListener('DOMContentLoaded', () => {
    renderLessonList('lesson-list', lessons, currentLesson);
});
