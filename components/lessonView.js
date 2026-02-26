// Components: lessonView.js
// This handles displaying the lesson sidebar and click events

export function renderLessonList(containerId, lessons, currentLesson) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear old list

    lessons.forEach((lesson, index) => {
        const li = document.createElement('li');
        li.textContent = `${lesson.title}`;

        // Check if lesson is unlocked
        if (index + 1 <= currentLesson) {
            li.classList.add('unlocked');
        } else {
            li.classList.add('locked');
            li.textContent += ' 🔒';
        }

        // Click event
        li.addEventListener('click', () => {
            if (index + 1 <= currentLesson) {
                showLessonContent(lesson);
            } else {
                alert('Lesson locked! Unlock at midnight or complete bonus challenge.');
            }
        });

        container.appendChild(li);
    });
}

// Placeholder: displays lesson content in main area
function showLessonContent(lesson) {
    const lessonText = document.getElementById('lesson-text');
    lessonText.innerHTML = `<h2>${lesson.title}</h2><p>${lesson.content}</p>`;
}
