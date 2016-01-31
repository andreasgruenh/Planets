const _ = require('lodash'),
      animation = require('./animationObservable'),
      calculateFriction = require('./calculateFriction'),
      calculateGravity = require('./calculateGravity'),
      calculateNewPosition = require('./calculateNewPosition'),
      canvas = require('./canvas'),
      buildPlanet = require('./buildPlanet'),
      windowDimension = require('./windowDimensionObservable');

const animateCheckbox = document.getElementById('animate-checkbox'),
      frictionConstInput = document.getElementById('friction-constant'),
      gravityConstInput = document.getElementById('gravity-constant'),
      planetCountInput = document.getElementById('planet-count-input'),
      resetButton = document.getElementById('reset-button');

let planets = [];
let planetCount, isAnimating, frictionConst, gravityConst;

animateCheckbox.addEventListener('change', updateSettings);
frictionConstInput.addEventListener('keydown', e => {
  if(frictionConstInput.value === '') return;
  if(e.keyCode === 38) frictionConst += 0.5;
  if(e.keyCode === 40) frictionConst -= 0.5;
  if(e.keyCode === 38 || e.keyCode === 40) {
    frictionConstInput.value = parseFloat(frictionConst);
    e.preventDefault();
  }
  updateSettings();
});
gravityConstInput.addEventListener('keydown', e => {
  if(gravityConstInput.value === '') return;
  if(e.keyCode === 38) gravityConst += 0.5;
  if(e.keyCode === 40) gravityConst -= 0.5;
  if(e.keyCode === 38 || e.keyCode === 40) {
    gravityConstInput.value = parseFloat(gravityConst);
    e.preventDefault();
  }
  updateSettings();
});
planetCountInput.addEventListener('keydown', e => {
  if(planetCountInput.value === '') return;
  if(e.keyCode === 38) planetCount += 1;
  if(e.keyCode === 40) planetCount -= 1;
  if(e.keyCode === 38 || e.keyCode === 40) {
    planetCountInput.value = parseFloat(planetCount);
    e.preventDefault();
  }
  resetSettings();
});
resetButton.addEventListener('click', resetSettings);

canvas.init(document.body);
animation.addObserver(onTick);
resetSettings();

function onTick(frameDelta) {
  calculateGravity(planets, gravityConst);
  calculateFriction(planets, frictionConst);
  calculateNewPosition(planets, frameDelta);
  canvas.clear();
  canvas.renderCircles(planets);
}

function updateSettings() {
  updateAnimation();
  updateFriction();
  updateGravity();
}

function resetSettings() {
  updateCount();
  updateSettings();
}

function updateCount() {
  planetCount = parseFloat(planetCountInput.value);
  planets = [];
  for(var i = 0; i < planetCount; i++) {
    planets.push(buildPlanet(windowDimension.width, windowDimension.height));
  }
}

function updateAnimation() {
  let isChecked = animateCheckbox.checked;
  if(isChecked) animation.start();
  else animation.stop();
}

function updateFriction() {
  frictionConst = parseFloat(frictionConstInput.value);
}

function updateGravity() {
  gravityConst = parseFloat(gravityConstInput.value);
}
