import { ads } from '../config/ads.config.js';
import { userData } from '../core/userData.js';

let adIndex = 0;

export function startAdPopups() {
    showAd();
    setInterval(showAd, 5 * 60 * 1000); // every 5 minutes
}

function showAd() {
    const ad = ads[adIndex % ads.length];
    adIndex++;

    const overlay = document.createElement('div');
    overlay.id = 'ad-overlay';
    overlay.innerHTML = `
        <div id="ad-popup">
            <p>${ad.text}</p>
            <button id="ad-close" disabled>Close in 10</button>
        </div>
    `;
    document.body.appendChild(overlay);

    let countdown = 10;
    const closeBtn = document.getElementById('ad-close');
    const timer = setInterval(() => {
        countdown--;
        closeBtn.textContent = `Close in ${countdown}`;
        if(countdown <= 0) {
            clearInterval(timer);
            closeBtn.textContent = 'X';
            closeBtn.disabled = false;
        }
    }, 1000);

    // Clicking popup opens ad
    const popup = document.getElementById('ad-popup');
    popup.addEventListener('click', (e) => {
        if (e.target.id !== 'ad-close') {
            window.open(ad.link, '_blank');
            // Unlock next lesson bonus
            if (userData.currentLesson < userData.totalLessons) {
                userData.currentLesson++;
                alert(`🎉 Bonus! You unlocked Lesson ${userData.currentLesson} early.`);
            }
        }
    });

    closeBtn.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
}
