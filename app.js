let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let clicks = 0;
let clickValue = 1;
let upgradeCost = 10;

let btn = document.getElementById("btn1");
let clickCounter = document.getElementById("click-counter");
let clickValueDisplay = document.getElementById("click-value");
let upgradeBtn = document.getElementById("upgrade-btn");

btn.addEventListener("click", function() {
    clicks += clickValue;
    clickCounter.innerText = `Клики: ${clicks}`;
    sendDataToServer();
});

upgradeBtn.addEventListener("click", function() {
    if (clicks >= upgradeCost) {
        clicks -= upgradeCost;
        clickValue += 1;
        upgradeCost += 10;
        clickCounter.innerText = `Клики: ${clicks}`;
        clickValueDisplay.innerText = clickValue;
        upgradeBtn.innerText = `Upgrade Click Value (Cost: ${upgradeCost} clicks)`;
        sendDataToServer();
    }
});

// Handle tab switching
const tabButtons = document.querySelectorAll('.tab-button');
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

function sendDataToServer() {
    fetch('https://your-server-url/update_progress', {  // Замените 'https://your-server-url' на URL вашего сервера
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: tg.initDataUnsafe.user.id,
            clicks: clicks,
            click_value: clickValue
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
