/* --- GLOBAL VARIABLES --- */
// Default starting values
let seconds = 0;
let minutes = 15;
let intervalID;
// DOM Elements
const counterInput = document.querySelector('.timer-input');
const minutesInput = document.getElementById('minutes-input');
const secondsInput = document.getElementById('seconds-input');
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const gear = document.querySelector('.gear');
const check = document.querySelector('.check');
/* --- TIMER FUNCTIONS --- */
function startTimer() {
    startButton.classList.add('hidden');
    stopButton.classList.remove('hidden');
    intervalID = setInterval(countdown, 1000);
}
function stopTimer() {
    stopButton.classList.add('hidden');
    startButton.classList.remove('hidden');
    clearInterval(intervalID);
}
function updateTimer() {
    // add leading 0s to seconds input if necessary
    if (seconds < 10) {
        secondsInput.value = (seconds === 0) ? '00' : '0' + seconds;
    }
    else {
        secondsInput.value = seconds.toString();
    }
    // add leading 0s to minutes input if necessary
    if (minutes < 10) {
        minutesInput.value = (minutes === 0) ? '00' : '0' + minutes;
    }
    else {
        minutesInput.value = minutes.toString();
    }
}
function editTimer() {
    // Hide start button
    startButton.classList.add('hidden-opacity');
    // Update view
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
    minutes = parseInt(minutesInput.value);
    seconds = parseInt(secondsInput.value);
    // Remove dotted border under inputs
    minutesInput.style.borderBottom = '3px dotted rgba(255, 255, 255, 0.0)';
    secondsInput.style.borderBottom = '3px dotted rgba(255, 255, 255, 0.0)';
    // Update the DOM
    updateTimer();
}
function countdown() {
    // If minutes & seconds reach zero, stop timer
    if (seconds === 0 && minutes === 0) {
        stopTimer();
        window.alert('Timer has completed!');
        // exit function block if timer has finished
        return;
    }
    // countdown logic
    if (seconds === 0) {
        minutes--;
        seconds = 59;
    }
    else {
        seconds--;
    }
    // Update the DOM
    updateTimer();
}
// Entry point
function init() {
    // update DOM with default values from script
    updateTimer();
    // set Event Listeners
    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
    gear.addEventListener('click', editTimer);
    check.addEventListener('click', saveEdit);
}
init();
