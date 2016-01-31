const _ = require('lodash');

module.exports = {
  addObserver,
  removeObserver,
  start,
  stop,
  toggle
};

const observers = [];
const animate = window.requestAnimationFrame;

let isRunning = false;
let previous;

function addObserver(fn) {
  observers.push(fn);
  return fn;
}

function notifyObservers(duration) {
  _.forEach(observers, o => o(duration));
}

function removeObserver(fn) {
  _.without(observers, fn);
}

function start() {
  if(isRunning) return;
  isRunning = true;
  previous = null;
  animate(tick);
}

function stop() {
  isRunning = false;
  previous = null;
}

function tick(end) {
  if(previous === null) {
    previous = end;
  }
  let duration = (end - previous) / (1000 / 60);
  previous = end;
  notifyObservers(duration);
  if(isRunning) animate(tick);
}

function toggle() {
  if(isRunning) stop();
  else start();
}
