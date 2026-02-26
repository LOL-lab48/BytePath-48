// core/unlockSystem.js
// Handles daily lesson unlocks

export function getCurrentLesson(userData) {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // If user hasn't unlocked today, increment currentLesson
    if (userData.lastUnlockDate !== today) {
        userData.currentLesson = Math.min(userData.currentLesson + 1, userData.totalLessons);
        userData.lastUnlockDate = today;
    }

    return userData.currentLesson;
}
