// DOM Elements
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const periodElement = document.getElementById('period');

// Analog clock elements
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

// Theme elements
const themeDropdownBtn = document.querySelector('.theme-dropdown-btn');
const themeDropdownContent = document.querySelector('.theme-dropdown-content');
const themeButtons = document.querySelectorAll('.theme-btn');

// Stopwatch elements
const stopwatchMinutes = document.getElementById('stopwatch-minutes');
const stopwatchSeconds = document.getElementById('stopwatch-seconds');
const stopwatchCentiseconds = document.getElementById('stopwatch-centiseconds');
const startStopwatchBtn = document.getElementById('start-stopwatch');
const pauseStopwatchBtn = document.getElementById('pause-stopwatch');

// Countdown elements
const countdownDisplay = document.getElementById('countdown-time');
const countdownHoursInput = document.getElementById('countdown-hours');
const countdownMinutesInput = document.getElementById('countdown-minutes');
const countdownSecondsInput = document.getElementById('countdown-seconds');
const startCountdownBtn = document.getElementById('start-countdown');

// Alarm elements
const alarmDateInput = document.getElementById('alarm-date');
const alarmTimeInput = document.getElementById('alarm-time');
const toggleAlarmBtn = document.getElementById('toggle-alarm');
const snoozeAlarmBtn = document.getElementById('snooze-alarm');
const alarmDisplay = document.getElementById('alarm-display');
const timeUntilDisplay = document.getElementById('time-until');

// Initialize states
let alarmTime = null;
let alarmInterval = null;
let stopwatchInterval = null;
let stopwatchTime = 0;
let isStopwatchRunning = false;
let countdownInterval = null;
let countdownTime = 0;
let isCountdownRunning = false;

// Function to update both digital and analog clock displays
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // Update digital clock
    hoursElement.textContent = (hours % 12 || 12).toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
    periodElement.textContent = hours >= 12 ? 'PM' : 'AM';

    // Update analog clock
    const hourDegrees = ((hours % 12) * 30) + (minutes * 0.5);
    const minuteDegrees = minutes * 6;
    const secondDegrees = seconds * 6;

    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
}

// Function to format time until alarm
function formatTimeUntil(targetDate) {
    const now = new Date();
    const diff = targetDate - now;
    
    if (diff <= 0) return 'Alarm time!';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Function to play alarm sound
function playAlarmSound() {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play();
    startShaking();
    
    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
        stopShaking();
    }, 3000); // Reduced to 3 seconds
}

// Alarm functions
function setAlarm() {
    if (alarmTime) {
        clearAlarm();
        return;
    }

    const date = alarmDateInput.value;
    const time = alarmTimeInput.value;
    
    if (!date || !time) {
        alert('Please select both date and time for the alarm');
        return;
    }
    
    alarmTime = new Date(`${date}T${time}`);
    
    if (alarmTime <= new Date()) {
        alert('Please select a future time for the alarm');
        return;
    }
    
    alarmDisplay.textContent = `Alarm set for: ${alarmTime.toLocaleString()}`;
    toggleAlarmBtn.textContent = 'Clear Alarm';
    
    // Update time until display
    updateTimeUntil();
    if (alarmInterval) clearInterval(alarmInterval);
    alarmInterval = setInterval(updateTimeUntil, 1000);
}

function clearAlarm() {
    alarmTime = null;
    if (alarmInterval) {
        clearInterval(alarmInterval);
        alarmInterval = null;
    }
    alarmDisplay.textContent = 'No alarm set';
    timeUntilDisplay.textContent = 'Time until alarm: --:--:--';
    toggleAlarmBtn.textContent = 'Set Alarm';
}

function updateTimeUntil() {
    if (alarmTime) {
        const now = new Date();
        if (now >= alarmTime) {
            playAlarmSound();
            clearAlarm();
        } else {
            timeUntilDisplay.textContent = `Time until alarm: ${formatTimeUntil(alarmTime)}`;
        }
    }
}

// Stopwatch functions
function updateStopwatch() {
    const minutes = Math.floor(stopwatchTime / 6000);
    const seconds = Math.floor((stopwatchTime % 6000) / 100);
    const centiseconds = stopwatchTime % 100;

    stopwatchMinutes.textContent = minutes.toString().padStart(2, '0');
    stopwatchSeconds.textContent = seconds.toString().padStart(2, '0');
    stopwatchCentiseconds.textContent = centiseconds.toString().padStart(2, '0');
}

function startStopwatch() {
    if (!isStopwatchRunning) {
        isStopwatchRunning = true;
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            updateStopwatch();
        }, 10);
        
        startStopwatchBtn.innerHTML = '<i class="fas fa-redo"></i>';
        startStopwatchBtn.classList.add('reset');
        pauseStopwatchBtn.classList.add('visible');
    } else {
        resetStopwatch();
    }
}

function pauseStopwatch() {
    if (isStopwatchRunning) {
        isStopwatchRunning = false;
        clearInterval(stopwatchInterval);
        
        startStopwatchBtn.innerHTML = '<i class="fas fa-play"></i>';
        startStopwatchBtn.classList.remove('reset');
    }
}

function resetStopwatch() {
    pauseStopwatch();
    stopwatchTime = 0;
    updateStopwatch();
}

// Countdown functions
function updateCountdown() {
    if (countdownTime <= 0) {
        clearCountdown();
        playAlarmSound();
        return;
    }

    countdownTime--;
    const hours = Math.floor(countdownTime / 3600);
    const minutes = Math.floor((countdownTime % 3600) / 60);
    const seconds = countdownTime % 60;

    countdownDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startCountdown() {
    if (isCountdownRunning) {
        clearCountdown();
        return;
    }

    const hours = parseInt(countdownHoursInput.value) || 0;
    const minutes = parseInt(countdownMinutesInput.value) || 0;
    const seconds = parseInt(countdownSecondsInput.value) || 0;

    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert('Please enter a valid time for the countdown');
        return;
    }

    countdownTime = hours * 3600 + minutes * 60 + seconds;
    isCountdownRunning = true;
    startCountdownBtn.textContent = 'Clear Countdown';
    
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

function clearCountdown() {
    isCountdownRunning = false;
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
    countdownDisplay.textContent = '00:00:00';
    startCountdownBtn.textContent = 'Start Countdown';
    countdownHoursInput.value = '';
    countdownMinutesInput.value = '';
    countdownSecondsInput.value = '';
}

// Theme functions
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('preferred-theme', theme);
}

// Animation functions
function startShaking() {
    document.body.classList.add('shake');
    document.querySelectorAll('.clock-container, .countdown-section, .stopwatch-section, .alarm-section')
        .forEach(section => section.classList.add('section-glow'));
}

function stopShaking() {
    document.body.classList.remove('shake');
    document.querySelectorAll('.clock-container, .countdown-section, .stopwatch-section, .alarm-section')
        .forEach(section => section.classList.remove('section-glow'));
}

// Event listeners
toggleAlarmBtn.addEventListener('click', setAlarm);
snoozeAlarmBtn.addEventListener('click', () => {
    if (alarmTime) {
        const newAlarmTime = new Date(Date.now() + 5 * 60 * 1000);
        alarmTime = newAlarmTime;
        alarmDisplay.textContent = `Alarm snoozed until: ${newAlarmTime.toLocaleString()}`;
        updateTimeUntil();
    }
});

startStopwatchBtn.addEventListener('click', startStopwatch);
pauseStopwatchBtn.addEventListener('click', pauseStopwatch);
startCountdownBtn.addEventListener('click', startCountdown);

themeDropdownBtn.addEventListener('click', () => {
    themeDropdownContent.classList.toggle('show');
});

document.addEventListener('click', (event) => {
    if (!event.target.closest('.theme-dropdown')) {
        themeDropdownContent.classList.remove('show');
    }
});

themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.getAttribute('data-theme');
        setTheme(theme);
        themeDropdownContent.classList.remove('show');
        
        const icon = button.querySelector('i').className;
        const text = button.textContent.trim();
        themeDropdownBtn.innerHTML = `
            <i class="${icon}"></i>
            <span>${text}</span>
            <i class="fas fa-chevron-down"></i>
        `;
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set theme from localStorage or default to light
    const savedTheme = localStorage.getItem('preferred-theme') || 'light';
    setTheme(savedTheme);
    
    // Start clock updates
    updateClock();
    setInterval(updateClock, 1000);
});