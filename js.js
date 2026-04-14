const minutesInput = document.getElementById('minutes-input');
const secondsInput = document.getElementById('seconds-input');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const progressCircle = document.querySelector('.progress-ring__circle');

const radius = 85;
const circumference = 2 * Math.PI * radius;
progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = circumference;

let totalSeconds = 0;
let remaining = 0;
let interval = null;
let running = false;

function updateDisplay() {
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    minutesDisplay.textContent = String(mins).padStart(2, '0');
    secondsDisplay.textContent = String(secs).padStart(2, '0');
}

function updateCircle() {
    if (totalSeconds === 0) return;
    const progress = remaining / totalSeconds;
    progressCircle.style.strokeDashoffset = circumference * (1 - progress);
}

function getSeconds() {
    return (parseInt(minutesInput.value) || 0) * 60 + (parseInt(secondsInput.value) || 0);
}

function tick() {
    if (remaining > 0) {
        remaining--;
        updateDisplay();
        updateCircle();
        
        if (remaining === 0) {
            clearInterval(interval);
            running = false;
            alert('Время вышло!');
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            minutesInput.disabled = false;
            secondsInput.disabled = false;
        }
    }
}


function start() {
    if (running) return;
    
    if (remaining === 0) {
        totalSeconds = getSeconds();
        remaining = totalSeconds;
        updateDisplay();
        updateCircle();
    }
    
    if (remaining <= 0) {
        alert('Введите время');
        return;
    }
    
    running = true;
    interval = setInterval(tick, 1000);
    
    minutesInput.disabled = true;
    secondsInput.disabled = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
}

function pause() {
    if (!running) return;
    
    clearInterval(interval);
    running = false;
    
    minutesInput.disabled = false;
    secondsInput.disabled = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function reset() {
    if (interval) clearInterval(interval);
    running = false;
    
    totalSeconds = getSeconds();
    remaining = totalSeconds;
    
    updateDisplay();
    updateCircle();
    
    minutesInput.disabled = false;
    secondsInput.disabled = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

startBtn.onclick = start;
pauseBtn.onclick = pause;
resetBtn.onclick = reset;
minutesInput.onchange = () => { if (!running) reset(); };
secondsInput.onchange = () => { if (!running) reset(); };

reset();