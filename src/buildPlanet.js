const _ = require('lodash'),
      randomcolor = require('randomcolor');

module.exports = function buildPlanet(width, height, _size_) {

  let color = randomcolor();
  let size = _size_ || _.random(5, 20, true);
  let speedX = _.random(-5, 5);
  let speedY = _.random(-5, 5);
  let prevSpeedX = speedX;
  let prevSpeedY = speedY;

  let newPlanet = {
    get color() { return color; },
    get mass() { return size * size * size; },
    get size() { return size; },
    prevSpeedX,
    prevSpeedY,
    speedX,
    speedY,

    x: _.random(width),
    y: _.random(height)
  };

  return newPlanet;
};
