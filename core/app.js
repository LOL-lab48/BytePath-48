import { lessons } from '../config/lessons.config.js';
import { renderLessonList } from '../components/lessonView.js';
import { getCurrentLesson } from './unlockSystem.js';
import { startAdPopups } from '../components/adManager.js';
import { userData } from './userData.js';

window.addEventListener('DOMContentLoaded', () => {
    const currentLesson = getCurrentLesson(userData);

    renderLessonList('lesson-list', lessons, currentLesson);

    // Auto-load first unlocked lesson
    const firstLesson = lessons[currentLesson - 1];
    if (firstLesson) {
        import('../components/lessonView.js').then(({ showLessonContent }) => {
            showLessonContent(firstLesson);
        });
    }

    // Ads start after 5 minutes
    setTimeout(() => {
        startAdPopups(userData);
    }, 5 * 60 * 1000);
});
