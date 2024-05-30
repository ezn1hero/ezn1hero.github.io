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
        clickCounter.innerText = ` ${clicks}`;
        clickValueDisplay.innerText = `Clicks for one tap ${clickValue}`;
        upgradeBtn.innerText = `Pidortube : ${upgradeCost}`;
    }
});

// Новый блок для отображения монет за час
let hourlyCoins = document.createElement('div');
hourlyCoins.className = 'hourly-coins';
document.body.appendChild(hourlyCoins);

// Обновление монет за час каждую секунду
setInterval(() => {
    let coinsPerHour = clickValue * 3600;
    hourlyCoins.innerText = `Монет в час: ${coinsPerHour}`;
}, 1000);

// Сделаем кликер активным при загрузке страницы
document.addEventListener("DOMContentLoaded", function() {
    clickImage.click();
});

Telegram.WebApp.onEvent("mainButtonClicked", function(){
    tg.sendData(JSON.stringify({ clicks: clicks, clickValue: clickValue }));
});
