// components/lessonView.js
// Handles the sidebar lesson list and click events

export function renderLessonList(containerId, lessons, currentLesson) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous items

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
                alert('Lesson locked! Unlock at midnight or complete a bonus challenge.');
            }
        });

        container.appendChild(li);
    });
}

function showLessonContent(lesson) {
    const lessonText = document.getElementById('lesson-text');
    lessonText.innerHTML = `<h2>${lesson.title}</h2><p>${lesson.content}</p>`;
}
