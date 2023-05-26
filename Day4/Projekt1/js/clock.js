//Clock

const pClock = document.getElementById("clock");

function clock() {
    let date = new Date();
    let time = date.toLocaleTimeString();
    pClock.innerText = time;
}

setInterval(clock, 1000);


// Countdown

const pCountdown930 = document.getElementById("pCountdown930");
const pCountdown11 = document.getElementById("pCountdown11");
const pCountdown1315 = document.getElementById("pCountdown1315");
const pCountdown1415 = document.getElementById("pCountdown1415");

function countdown930() {
    let currentDate = new Date();
    let currentTime = currentDate.getTime();

    let targetDate = new Date();
    targetDate.setHours(9);
    targetDate.setMinutes(30);
    targetDate.setSeconds(0);
    let targetTime = targetDate.getTime();

    let timeLeft = targetTime - currentTime;
    let hours = Math.floor(timeLeft / (1000 * 60 * 60));
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    let countdownString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    document.getElementById('pCountdown930').innerText = countdownString;

    if (timeLeft <= 0) {
        clearInterval(countdownInterval930);
        document.getElementById('pCountdown930').innerText = "00:00:00";
    }
}

let countdownInterval930 = setInterval(countdown930, 1000);

function countdown11() {
    let currentDate = new Date();
    let currentTime = currentDate.getTime();

    let targetDate = new Date();
    targetDate.setHours(11);
    targetDate.setMinutes(30);
    targetDate.setSeconds(0);
    let targetTime = targetDate.getTime();

    let timeLeft = targetTime - currentTime;
    let hours = Math.floor(timeLeft / (1000 * 60 * 60));
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    let countdownString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (hours < 0 && minutes < 0 && seconds < 0) {
        countdownString = "00:00:00";
    }

    document.getElementById('pCountdown11').innerText = countdownString;

    if (timeLeft <= 0) {
        clearInterval(countdownInterval11);
        document.getElementById('pCountdown11').innerText = "00:00:00";
    }
}

let countdownInterval11 = setInterval(countdown11, 1000);


function countdown1315() {
    let currentDate = new Date();
    let currentTime = currentDate.getTime();

    let targetDate = new Date();
    targetDate.setHours(13);
    targetDate.setMinutes(15);
    targetDate.setSeconds(0);
    let targetTime = targetDate.getTime();

    let timeLeft = targetTime - currentTime;
    let hours = Math.floor(timeLeft / (1000 * 60 * 60));
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    let countdownString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    if (hours < 0 && minutes < 0 && seconds < 0) {
        countdownString = "00:00:00";
    }
    document.getElementById('pCountdown1315').innerText = countdownString;

    if (timeLeft <= 0) {
        clearInterval(countdownInterval13);
        document.getElementById('pCountdown13').innerText = "00:00:00";
    }
}

let countdownInterval13 = setInterval(countdown1315, 1000);

function countdown1415() {
    let currentDate = new Date();
    let currentTime = currentDate.getTime();

    let targetDate = new Date();
    targetDate.setHours(14);
    targetDate.setMinutes(15);
    targetDate.setSeconds(0);
    let targetTime = targetDate.getTime();

    let timeLeft = targetTime - currentTime;
    let hours = Math.floor(timeLeft / (1000 * 60 * 60));
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    let countdownString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    if (hours < 0 && minutes < 0 && seconds < 0) {
        countdownString = "00:00:00";
    }
    document.getElementById('pCountdown1415').innerText = countdownString;

    if (timeLeft <= 0) {
        clearInterval(countdownInterval1415);
        document.getElementById('pCountdown1415').innerText = "00:00:00";
    }
}

let countdownInterval1415 = setInterval(countdown1415, 1000);