const _ = require('lodash');

module.exports = function calculateSpeedForGravityOnCircles(circles) {
  _.forEach(circles, c => calculateSpeedForGravityOnCircle(c, circles));
};

function calculateSpeedForGravityOnCircle(circle, circles) {
  let circleA = circle;
  _.forEach(circles, circleB => calcGravityBetweenAAndB(circleA, circleB));
}

function calcGravityBetweenAAndB(circleA, circleB) {
  if(circleA === circleB) return;

  let xDistance = circleA.x - circleB.x;
  let yDistance = circleA.y - circleB.y;
  let distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

  if(distance < circleA.size + circleB.size) {
    return;
  }

  let direction = {
    x: xDistance / distance,
    y: yDistance / distance
  };
  let gravityForce  = 0.5 * (circleA.mass * circleB.mass) / Math.pow(distance, 2);
  let xAccA = gravityForce * direction.x / circleA.mass;
  let yAccA = gravityForce * direction.y / circleB.mass;
  circleA.speedX -= xAccA;
  circleA.speedY -= yAccA;
}
