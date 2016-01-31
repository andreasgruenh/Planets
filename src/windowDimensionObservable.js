const _ = require('lodash');

module.exports = {
  get height() { return height; },
  get width() { return width; },
  addObserver,
  removeObserver
};

const observers = [];

let height, width;
updateDimensions();
attachHandler();

function attachHandler() {
  window.addEventListener('resize', _.debounce(handleResize, 200));
}

function addObserver(fn) {
  observers.push(fn);
  return fn;
}

function removeObserver(fn) {
  _.without(observers, fn);
}

function notifyObservers() {
  _.forEach(observers, o => o());
}

function handleResize(e) {
  updateDimensions();
  notifyObservers();
}

function updateDimensions() {
  height = window.innerHeight;
  width = window.innerWidth;
}
