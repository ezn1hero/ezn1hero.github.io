let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let clicks = 0;
let clickValue = 1;
let upgradeCost = 10;

let clickCounter = document.getElementById("click-counter");
let clickValueDisplay = document.getElementById("click-value-display");
let upgradeBtn = document.getElementById("upgrade-btn");
let clickImage = document.getElementById("click-image");

clickImage.addEventListener("click", function() {
    clicks += clickValue;
    clickCounter.innerText = `Клики: ${clicks}`;
    // Add animation
    let clickEffect = document.createElement('div');
    clickEffect.className = 'click-effect';
    clickEffect.innerText = `+${clickValue}`;
    document.body.appendChild(clickEffect);
    clickEffect.style.left = `${clickImage.getBoundingClientRect().left + clickImage.width / 2}px`;
    clickEffect.style.top = `${clickImage.getBoundingClientRect().top}px`;
    setTimeout(() => {
        clickEffect.remove();
    }, 1000);
});

upgradeBtn.addEventListener("click", function() {
    if (clicks >= upgradeCost) {
        clicks -= upgradeCost;
        clickValue += 1;
        upgradeCost += 10;
        clickCounter.innerText = `Клики: ${clicks}`;
        clickValueDisplay.innerText = `Значение клика: ${clickValue}`;
        upgradeBtn.innerText = `Улучшить значение клика (Стоимость: ${upgradeCost} кликов)`;
    }
});

// Handle tab switching
const tabButtons = document.querySelectorAll('.tab-button, .footer-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = button.getAttribute('data-tab');

        tabContents.forEach(content => {
            if (content.id === target) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });

        tabButtons.forEach(btn => {
            if (btn === button) {
                btn.style.background = '#1e8e2b';
            } else {
                btn.style.background = '#2cab37';
            }
        });
    });
});

Telegram.WebApp.onEvent("mainButtonClicked", function(){
    tg.sendData(JSON.stringify({ clicks: clicks, clickValue: clickValue }));
});
