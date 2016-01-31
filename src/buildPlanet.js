const _ = require('lodash'),
      randomcolor = require('randomcolor');

module.exports = function buildPlanet(width, height) {

  let color = randomcolor();
  let size = _.random(5, 20, true);
  let speedX = _.random(-5, 5);
  let speedY = _.random(-5, 5);
  let prevSpeedX = speedX;
  let prevSpeedY = speedY;

  let newPlanet = {
    get color() { return color; },
    get mass() { return size * size * size; },
    get prevSpeedX() { return prevSpeedX; },
    get prevSpeedY() { return prevSpeedY; },
    get size() { return size; },
    get speedX() { return speedX; },
    set speedX(newSpeed) {
      prevSpeedX = speedX;
      speedX = newSpeed;
    },
    get speedY() { return speedY; },
    set speedY(newSpeed) {
      prevSpeedY = speedY;
      speedY = newSpeed;
    },

    x: _.random(width),
    y: _.random(height)
  };

  return newPlanet;
};
