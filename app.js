let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let clicks = 0;

let btn = document.getElementById("btn1");
let clickCounter = document.getElementById("click-counter");

btn.addEventListener("click", function(){
    clicks += 1;
    clickCounter.innerText = `Клики: ${clicks}`;
    tg.MainButton.setText(`Клики: ${clicks}`);
    tg.MainButton.show();
});

Telegram.WebApp.onEvent("mainButtonClicked", function(){
    tg.sendData(clicks.toString());
});








