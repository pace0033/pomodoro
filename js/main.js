'use strict'

let secondsOnes;
let secondsTens;
let minutes;

const counter = document.querySelector('.timer-text');
const start = document.querySelector('.start');
const stop = document.querySelector('.stop');
const gear = document.querySelector('.gear');
const check = document.querySelector('.check');

function startTimer() {
  // console.log(start);
  start.classList.add('hidden');
  stop.classList.remove('hidden');
}

function stopTimer() {
  stop.classList.add('hidden');
  start.classList.remove('hidden');
}

function editTimer() {
  gear.classList.add('hidden');
  check.classList.remove('hidden');
}

function saveEdit() {
  check.classList.add('hidden');
  gear.classList.remove('hidden');
}

start.addEventListener('click', startTimer);
stop.addEventListener('click', stopTimer);
gear.addEventListener('click', editTimer);
check.addEventListener('click', saveEdit);