let timer;
let startTime;
let elapsedTime = 30 * 60 * 1000; // Changed from 30 * 60 * 1000;
let isRunning = false;
let laps = [];

function formatTime(ms) {
    const date = new Date(ms);
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(date.getMilliseconds() / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
    document.getElementById('display').textContent = formatTime(elapsedTime);
}

function startPause() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById('startPauseBtn').textContent = 'Start';
        document.getElementById('startPauseBtn').classList.remove('pause');
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(function () {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        document.getElementById('startPauseBtn').textContent = 'Pause';
        document.getElementById('startPauseBtn').classList.add('pause');
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    laps = [];
    updateDisplay();
    document.getElementById('startPauseBtn').textContent = 'Start';
    document.getElementById('startPauseBtn').classList.remove('pause');
    document.getElementById('laps').innerHTML = '';
}

function lap() {
    laps.push(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${laps.length}: ${formatTime(elapsedTime)}`;
    document.getElementById('laps').appendChild(lapItem);
}

document.getElementById('startPauseBtn').addEventListener('click', startPause);
document.getElementById('resetBtn').addEventListener('click', reset);
document.getElementById('lapBtn').addEventListener('click', lap);
