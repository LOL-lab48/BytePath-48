// components/lessonView.js
import { userData } from '../core/app.js';

export function renderLessonList(containerId, lessons, currentLesson) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    lessons.forEach((lesson, index) => {
        const li = document.createElement('li');
        li.textContent = lesson.title;

        if (index + 1 <= currentLesson) {
            li.classList.add('unlocked');
        } else {
            li.classList.add('locked');
            li.textContent += ' 🔒';
        }

        li.addEventListener('click', () => {
            if (index + 1 <= currentLesson) {
                showLessonContent(lesson);
            } else {
                alert('Lesson locked! Unlock at midnight or via bonus challenge.');
            }
        });

        container.appendChild(li);
    });
}

function showLessonContent(lesson) {
    const lessonText = document.getElementById('lesson-text');
    const editor = document.getElementById('editor');

    // Show instructions
    lessonText.innerHTML = `<h2>${lesson.title}</h2>`;
    lesson.instructions.forEach((step, i) => {
        lessonText.innerHTML += `<p><strong>Step ${i + 1}:</strong> ${step}</p>`;
    });

    // Load starter code
    editor.textContent = lesson.starterCode;

    // Add "Check My Code" button
    let existingBtn = document.getElementById('check-btn');
    if (existingBtn) existingBtn.remove();

    const checkBtn = document.createElement('button');
    checkBtn.id = 'check-btn';
    checkBtn.textContent = "Check My Code";
    checkBtn.style.marginTop = "10px";
    lessonText.appendChild(checkBtn);

    checkBtn.addEventListener('click', () => {
        const userCode = editor.textContent;
        const result = lesson.checker(userCode);
        if (result.passed) {
            alert("✅ Well done! " + result.feedback);

            // Optional: unlock next lesson automatically
            if (userData.currentLesson < userData.totalLessons) {
                userData.currentLesson++;
            }
        } else {
            alert("❌ Try again: " + result.feedback);
        }
    });
}
