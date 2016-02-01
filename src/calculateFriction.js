const _ = require('lodash');

let frictionConstant;
module.exports = function calculateFrictionOnCicrcles(circles, _frictionConstant_) {
  frictionConstant = _frictionConstant_;
  _.forEach(circles, calculateFrictionOnCicrcle);
};

function calculateFrictionOnCicrcle(circle) {
  var accX, accY;

  var lengthOfSpeedVektor = Math.sqrt(circle.speedX * circle.speedX + circle.speedY * circle.speedY);

  var direction = {
    x: circle.speedX / lengthOfSpeedVektor,
    y: circle.speedY / lengthOfSpeedVektor
  };

  accX = frictionConstant * direction.x / circle.mass;
  accY = frictionConstant * direction.y / circle.mass;

  let newXSpeed = circle.speedX - accX;
  circle.speedX = newXSpeed;

  let newYSpeed = circle.speedY - accY;
  circle.speedY = newYSpeed;

}
