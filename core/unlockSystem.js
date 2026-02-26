// core/unlockSystem.js
// Handles daily lesson unlocks and early unlocks via bonus

export function getCurrentLesson(userData) {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // Unlock 1 new lesson per day
    if (userData.lastUnlockDate !== today) {
        userData.currentLesson = Math.min(userData.currentLesson + 1, userData.totalLessons);
        userData.lastUnlockDate = today;
    }

    return userData.currentLesson;
}

// Bonus early unlock (to integrate with ads later)
export function earlyUnlock(userData) {
    userData.currentLesson = Math.min(userData.currentLesson + 1, userData.totalLessons);
}
