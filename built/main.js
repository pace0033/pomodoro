/* --- GLOBAL VARIABLES --- */
// Default starting values
let SECONDS = 0;
let MINUTES = 15;
let TOTAL_TIME;
let intervalID;
// DOM Elements
const counterInput = document.querySelector('.timer-input');
const minutesInput = document.getElementById('minutes-input');
const secondsInput = document.getElementById('seconds-input');
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const gear = document.querySelector('.gear');
const check = document.querySelector('.check');
const countdownRing = document.getElementById('countdown-path-remaining');
/* --- TIMER FUNCTIONS --- */
function startTimer() {
    // update view
    startButton.classList.add('hidden');
    stopButton.classList.remove('hidden');
    // set total time
    TOTAL_TIME = (MINUTES * 60) + SECONDS;
    console.log(TOTAL_TIME);
    // start counting down
    intervalID = setInterval(countdown, 1000);
}
function stopTimer() {
    stopButton.classList.add('hidden');
    startButton.classList.remove('hidden');
    clearInterval(intervalID);
}
function updateTimerText() {
    // add leading 0s to seconds input if necessary
    if (SECONDS < 10) {
        secondsInput.value = (SECONDS === 0) ? '00' : '0' + SECONDS;
    }
    else {
        secondsInput.value = SECONDS.toString();
    }
    // add leading 0s to minutes input if necessary
    if (MINUTES < 10) {
        minutesInput.value = (MINUTES === 0) ? '00' : '0' + MINUTES;
    }
    else {
        minutesInput.value = MINUTES.toString();
    }
}
function editTimer() {
    // Stop the timer
    stopTimer();
    // Update view
    startButton.classList.add('hidden-opacity');
    gear.classList.add('hidden');
    check.classList.remove('hidden');
    // Add dotted border under inputs
    minutesInput.style.borderBottom = '3px dotted #fff';
    secondsInput.style.borderBottom = '3px dotted #fff';
    // Enable inputs
    minutesInput.disabled = false;
    secondsInput.disabled = false;
}
function saveEdit() {
    //Update view
    check.classList.add('hidden');
    gear.classList.remove('hidden');
    startButton.classList.remove('hidden-opacity');
    // Disable inputs
    minutesInput.disabled = true;
    secondsInput.disabled = true;
    // Handle empty inputs
    if (minutesInput.value.length === 0)
        minutesInput.value = '0';
    if (secondsInput.value.length === 0)
        secondsInput.value = '0';
    // Handle out-of-range inputs
    if (parseInt(minutesInput.value) > 59)
        minutesInput.value = '59';
    if (parseInt(secondsInput.value) > 59)
        secondsInput.value = '59';
    // Update JS global variables with input
    MINUTES = parseInt(minutesInput.value);
    SECONDS = parseInt(secondsInput.value);
    TOTAL_TIME = (MINUTES * 60) + SECONDS;
    // Remove dotted border under inputs
    minutesInput.style.borderBottom = '3px dotted rgba(255, 255, 255, 0.0)';
    secondsInput.style.borderBottom = '3px dotted rgba(255, 255, 255, 0.0)';
    // Update the DOM
    updateTimerText();
    setCircleDashArray();
}
function calculateTimeFraction() {
    const timeRemaining = (MINUTES * 60) + SECONDS;
    return timeRemaining / TOTAL_TIME;
}
function setCircleDashArray() {
    // console.log((calculateTimeFraction() * 283).toFixed(0));
    const newDashArray = `${(calculateTimeFraction() * 283).toFixed(0)} 283`;
    countdownRing.setAttribute('stroke-dasharray', newDashArray);
}
function countdown() {
    // If minutes & seconds reach zero, stop timer
    if (SECONDS === 0 && MINUTES === 0) {
        stopTimer();
        window.alert('Timer has completed!');
        // exit function block if timer has finished
        return;
    }
    // countdown logic
    if (SECONDS === 0) {
        MINUTES--;
        SECONDS = 59;
    }
    else {
        SECONDS--;
    }
    // Update the DOM
    updateTimerText();
    setCircleDashArray();
}
// Entry point
function init() {
    // update DOM with default values from script
    updateTimerText();
    // set Event Listeners
    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
    gear.addEventListener('click', editTimer);
    check.addEventListener('click', saveEdit);
}
init();
