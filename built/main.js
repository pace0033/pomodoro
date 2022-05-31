'use strict';
// Default starting values
let secondsOnes = 0;
let secondsTens = 0;
let minutes = 15;
let intervalID;
const counter = document.querySelector('.timer-text');
const counterInput = document.querySelector('.timer-input');
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const gear = document.querySelector('.gear');
const check = document.querySelector('.check');
const timerMins = document.querySelector('.minutes');
const timerSecsTens = document.querySelector('.seconds-tens');
const timerSecsOnes = document.querySelector('.seconds-ones');
const minutesInput = document.getElementById('minutes-input');
const secondsInput = document.getElementById('seconds-input');
// Combines tens and ones place to return a whole number
function combineSeconds(tens, ones) {
    return parseInt(tens.toString() + ones.toString());
}
function splitSeconds(seconds) {
    let returnArray = [];
    returnArray.push(Math.floor(seconds / 10 % 10)); // Tens place index[0]
    returnArray.push(Math.floor(seconds % 10)); // Ones place //index[1]
    return returnArray;
}
function startTimer() {
    startButton.classList.add('hidden');
    stopButton.classList.remove('hidden');
    countdown();
}
function stopTimer() {
    stopButton.classList.add('hidden');
    startButton.classList.remove('hidden');
    clearInterval(intervalID);
}
function editTimer() {
    //Hide start button
    startButton.classList.add('hidden-opacity');
    //Update input values with current time
    minutesInput.value = minutes.toString();
    //Set rules to add leading 0 if seconds < 10
    if (secondsTens === 0) {
        secondsInput.value = '0' + secondsOnes;
    }
    else {
        secondsInput.value = combineSeconds(secondsTens, secondsOnes).toString();
    }
    //Update view
    gear.classList.add('hidden');
    check.classList.remove('hidden');
    counter.classList.add('hidden');
    counterInput.classList.remove('hidden');
}
function saveEdit() {
    //Update view
    check.classList.add('hidden');
    gear.classList.remove('hidden');
    counterInput.classList.add('hidden');
    counter.classList.remove('hidden');
    startButton.classList.remove('hidden-opacity');
    //Update JS global variables with input
    minutes = parseInt(minutesInput.value);
    //Extract tens and ones place of seconds
    const secondsSplitArr = splitSeconds(parseInt(secondsInput.value));
    secondsTens = secondsSplitArr[0];
    secondsOnes = secondsSplitArr[1];
    // Update the DOM
    timerMins.textContent = minutes.toString();
    timerSecsTens.textContent = secondsTens.toString();
    timerSecsOnes.textContent = secondsOnes.toString();
}
function countdown() {
    intervalID = setInterval(updateTime, 1000);
}
function updateTime() {
    // If minutes & seconds reach zero, stop timer
    if (secondsOnes === 0 && secondsTens === 0 && minutes === 0) {
        stopTimer();
        window.alert('Timer has completed!');
        return;
    }
    // Handle minutes
    if (secondsOnes === 0 && secondsTens === 0) {
        minutes -= 1;
        secondsTens = 5;
        secondsOnes = 9;
        // Handle seconds
    }
    else if (secondsOnes > 0) {
        secondsOnes -= 1;
        // Handle when seconds ones place is zero
    }
    else {
        secondsOnes = 9;
        //Update tens place
        if (secondsTens > 0) {
            secondsTens -= 1;
        }
    }
    // Update the DOM
    timerMins.textContent = minutes.toString();
    timerSecsTens.textContent = secondsTens.toString();
    timerSecsOnes.textContent = secondsOnes.toString();
}
function init() {
    // update DOM with default values from script
    timerMins.textContent = minutes.toString();
    timerSecsTens.textContent = secondsTens.toString();
    timerSecsOnes.textContent = secondsOnes.toString();
}
// Event Listeners
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
gear.addEventListener('click', editTimer);
check.addEventListener('click', saveEdit);
init();
