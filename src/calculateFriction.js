const _ = require('lodash');

let frictionConstant;
module.exports = function calculateFrictionOnCicrcles(circles, _frictionConstant_) {
  frictionConstant = _frictionConstant_;
  _.forEach(circles, calculateFrictionOnCicrcle);
};

function calculateFrictionOnCicrcle(circle) {
  let frictionX = frictionConstant * circle.speedX;
  let frictionY = frictionConstant * circle.speedY;
  let accX = frictionX / circle.mass;
  let accY = frictionY / circle.mass;

  let newXSpeed = circle.speedX - accX;
  circle.speedX = newXSpeed;

  let newYSpeed = circle.speedY - accY;
  circle.speedY = newYSpeed;

}
