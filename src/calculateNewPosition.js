const _ = require('lodash'),
      windowDimension = require('./windowDimensionObservable');

module.exports = function calculateNewPositionForCircles(circles, frameDelta) {
  _.forEach(circles, c => calculateNewPositionForCircle(c, frameDelta));
};

function calculateNewPositionForCircle(circle, frameDelta) {
  let deltaX = (circle.speedX + circle.prevSpeedX) / 2;
  let deltaY = (circle.speedY + circle.prevSpeedY) / 2;
  circle.prevSpeedX = circle.speedX;
  circle.prevSpeedY = circle.speedY;
  circle.x = circle.x + deltaX * frameDelta;
  circle.y = circle.y + deltaY * frameDelta;

  repositionIfOutsideOfCanvas(circle);
}

function repositionIfOutsideOfCanvas(circle) {
  if(circle.x > windowDimension.width + circle.size + 1) circle.x = -circle.size;
  if(circle.x < -circle.size - 1) circle.x = windowDimension.width + circle.size;

  if(circle.y > windowDimension.height + circle.size + 1) circle.y = -circle.size;
  if(circle.y < -circle.size -1) circle.y = windowDimension.height + circle.size;
}
