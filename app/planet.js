window.Planet = Planet;

function Planet(canvas, context) {
  this.size = randBetween(10, 20);
  this.x = randBetween(0, canvas.width);
  this.y = randBetween(0, canvas.height);
  this.color = randomColor();
  this.xSpeed = randBetween(-2, 2);
  this.ySpeed = randBetween(-2, 2);
  this.canvas = canvas;
  this.context = context;
  this.calculateGravity = function(planets, repel) {
    var planetA = this;
    planets.forEach(function(planetB) {
      if(planetA === planetB) {
        return;
      }
      var xDistance = planetA.x - planetB.x;
      var yDistance = planetA.y - planetB.y;

      var distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
      if(distance < planetA.size + planetB.size) {
        planets.splice(planets.indexOf(planetB), 1);
        var newPlanet = new Planet(canvas, context);
        newPlanet.x = -newPlanet.size;
        planets.push(newPlanet);
      }
      var direction = {
        x: xDistance / distance,
        y: yDistance / distance
      };
      var gravityForce  = 10 * (planetA.size * planetB.size) / Math.pow(distance, 2);

      var xAccA = gravityForce * direction.x / planetA.size;
      var xAccB = gravityForce * direction.x / planetA.size;
      var yAccA = gravityForce * direction.y / planetB.size;
      var yAccB = gravityForce * direction.y / planetB.size;
      if(repel) {
        planetA.xSpeed += xAccA;
        planetA.ySpeed += yAccA;
        planetB.xSpeed -= xAccB;
        planetB.ySpeed -= yAccB;
      } else {
        planetA.xSpeed -= xAccA;
        planetA.ySpeed -= yAccA;
        planetB.xSpeed += xAccB;
        planetB.ySpeed += yAccB;
      }
    });
  };
  this.move = function() {
    this.x = this.x + this.xSpeed;
    if(this.x > this.canvas.width + this.size) {
      this.x = 0 - this.size;
    } else if (this.x < 0 - this.size) {
      this.x = this.canvas.width + this.size;
    }
    this.y = this.y + this.ySpeed;
    if(this.y > this.canvas.height + this.size) {
      this.y = 0 - this.size;
    } else if(this.y < 0 - this.size) {
      this.y = this.canvas.height + this.size;
    }
    this.draw();
  };
  this.draw = function() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    this.context.fillStyle = this.color;
    this.context.fill();
    return this;
  };
}

function randBetween(a,b) {
  var difference = b - a;
  var result = ((Math.random() * difference) + 0);
  return result + a;
}
