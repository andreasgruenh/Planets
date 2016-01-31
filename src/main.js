const _ = require('lodash'),
      animation = require('./animationObservable'),
      calculateGravity = require('./calculateGravity'),
      calculateNewPosition = require('./calculateNewPosition'),
      canvas = require('./canvas'),
      buildPlanet = require('./buildPlanet'),
      windowDimension = require('./windowDimensionObservable');

const animateCheckbox = document.getElementById('animate-checkbox'),
      planetCountInput = document.getElementById('planet-count-input'),
      resetButton = document.getElementById('reset-button');

let planets = [];
let planetCount, isAnimating, isAttracting, usingFriction;

animateCheckbox.addEventListener('change', updateSettings);
planetCountInput.addEventListener('keyup', resetSettings);
resetButton.addEventListener('click', resetSettings);

canvas.init(document.body);
animation.addObserver(onTick);
resetSettings();

function onTick(frameDelta) {
  calculateGravity(planets);
  calculateNewPosition(planets, frameDelta);
  canvas.clear();
  canvas.renderCircles(planets);
}

function updateSettings() {
  updateAnimation();
}

function resetSettings() {
  updateCount();
  updateSettings();
}

function updateCount() {
  planetCount = planetCountInput.value;
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
