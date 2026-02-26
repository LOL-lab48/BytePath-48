// components/adManager.js
import { ads } from '../config/ads.config.js';

let adIndex = 0;

export function startAdPopups() {
    showAd(); // Show first ad immediately
    setInterval(showAd, 5 * 60 * 1000); // Every 5 minutes
}

function showAd() {
    const ad = ads[adIndex % ads.length];
    adIndex++;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'ad-overlay';
    overlay.innerHTML = `
        <div id="ad-popup">
            <p>${ad.text}</p>
            <button id="ad-close" disabled>Close in 10</button>
        </div>
    `;
    document.body.appendChild(overlay);

    // Countdown
    let countdown = 10;
    const closeBtn = document.getElementById('ad-close');
    const timer = setInterval(() => {
        countdown--;
        closeBtn.textContent = `Close in ${countdown}`;
        if (countdown <= 0) {
            clearInterval(timer);
            closeBtn.textContent = 'X';
            closeBtn.disabled = false;
        }
    }, 1000);

    // Click close
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });

    // Click anywhere on ad text → go to link
    const popup = document.getElementById('ad-popup');
    popup.addEventListener('click', (e) => {
        if (e.target.id !== 'ad-close') {
            window.open(ad.link, '_blank');
        }
    });
}
