'use strict'

let secondsOnes = 3;
let secondsTens = 1;
let minutes = 1;
let intervalID;

const counter = document.querySelector('.timer-text');
const counterInput = document.querySelector('.timer-input');
const start = document.querySelector('.start');
const stop = document.querySelector('.stop');
const gear = document.querySelector('.gear');
const check = document.querySelector('.check');
const timerMins = document.querySelector('.minutes');
const timerSecsTens = document.querySelector('.seconds-tens');
const timerSecsOnes = document.querySelector('.seconds-ones');

// Combines tens and ones place to return a whole number
function combineSeconds(tens, ones) {
  return parseFloat(tens.toString() + ones.toString());
}

function splitSeconds(seconds) {
  let returnArray = [];
  console.log(`Ones: ${Math.floor(seconds % 10)}`);
  console.log(`Tens: ${Math.floor(seconds / 10 % 10)}`);
}

function startTimer() {
  start.classList.add('hidden');
  stop.classList.remove('hidden');
  countdown();
}

function stopTimer() {
  stop.classList.add('hidden');
  start.classList.remove('hidden');
  clearInterval(intervalID);
}

function editTimer() {
  //Update input values with current time
  const minutesInput = document.getElementById('minutes-input');
  const secondsInput = document.getElementById('seconds-input');
  minutesInput.value = minutes;

  //Set rules to add leading 0 if seconds < 10
  if (secondsTens === 0) {  
    secondsInput.value = '0' + secondsOnes;
  } else {
    secondsInput.value = combineSeconds(secondsTens, secondsOnes);
  }

  //Update view
  gear.classList.add('hidden');
  check.classList.remove('hidden');
  counter.classList.add('hidden');
  counterInput.classList.remove('hidden');

  if (secondsInput.value < 10) {
    secondsInput.value.toString().padStart(2, '0');
  }

  console.log(splitSeconds(secondsInput.value));
}

function saveEdit() {
  //Update view
  check.classList.add('hidden');
  gear.classList.remove('hidden');
  counterInput.classList.add('hidden');
  counter.classList.remove('hidden');
}

function countdown() {
  intervalID = setInterval(updateTime, 1000);
}

function updateTime() {
  // If minutes & seconds reach zero, stop timer
  if (secondsOnes === 0 && secondsTens === 0 && minutes === 0) {
    stopTimer();
    return;
  }

  // Handle minutes
  if (secondsOnes === 0 && secondsTens === 0) {
    minutes -= 1;
    secondsTens = 5;
    secondsOnes = 9;
  // Handle seconds
  } else if (secondsOnes > 0) { 
    secondsOnes -= 1;
  // Handle when seconds ones place is zero
  } else { 
    secondsOnes = 9;
    //Update tens place
    if (secondsTens > 0) {
      secondsTens -= 1;
    }
  }

  // Update the DOM
  timerMins.textContent = minutes;
  timerSecsTens.textContent = secondsTens;
  timerSecsOnes.textContent = secondsOnes;
}

start.addEventListener('click', startTimer);
stop.addEventListener('click', stopTimer);
gear.addEventListener('click', editTimer);
check.addEventListener('click', saveEdit);