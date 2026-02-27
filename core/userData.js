// core/userData.js

const savedData = JSON.parse(localStorage.getItem("bytepath48_user"));

export const userData = savedData || {
    currentLesson: 1,
    totalLessons: 180,
    lastUnlockDate: null
};

export function saveUserData() {
    localStorage.setItem("bytepath48_user", JSON.stringify(userData));
}
