const _ = require('lodash'),
      windowDimension = require('./windowDimensionObservable');

module.exports = function calculateNewPositionForCircles(circles, frameDelta) {
  _.forEach(circles, c => calculateNewPositionForCircle(c, frameDelta));
};

function calculateNewPositionForCircle(circle, frameDelta) {
  let deltaX = (circle.speedX + circle.prevSpeedX) / 2;
  let deltaY = (circle.speedY + circle.prevSpeedY) / 2;
  circle.x = circle.x + deltaX * frameDelta;
  circle.y = circle.y + deltaY * frameDelta;

  repositionIfOutsideOfCanvas(circle);
}

function repositionIfOutsideOfCanvas(circle) {
  if(circle.x > windowDimension.width + 45) circle.x = -40;
  if(circle.x < -45) circle.x = windowDimension.width + 40;

  if(circle.y > windowDimension.height + 45) circle.y = -40;
  if(circle.y < -45) circle.y = windowDimension.height + 40;
}
