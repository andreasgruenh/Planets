(function() {
  'use strict';
  var body = document.body;
  var animate = document.getElementById('animate');
  var repel = document.getElementById('repel');
  var planetCount = document.getElementById('planet-count');
  var canvas = document.createElement('canvas');
  var context;
  var isAnimating = animate.checked;
  var planets = [];

  animate.addEventListener('change', function(e) {
    isAnimating = e.target.checked;
    if(e.target.checked) {
      window.requestAnimationFrame(update);
    }
  });

  planetCount.addEventListener('keyup', function() {
    init();
  });

  function init() {
    isAnimating = false;
    try {
      body.removeChild(canvas);
    } catch (a) {}
    canvas = document.createElement('canvas');
    body.appendChild(canvas);
    context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    planets = [];
    repeat(planetCount.value, function() {
      var planet = new Planet(canvas, context);
      planet.draw();
      planets.push(planet);
    });
    setTimeout(function(){
      window.requestAnimationFrame(update);
      isAnimating = true;
    }, 500);
  }

  function update(timestamp) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    planets.forEach(function(planet) {
      planet.calculateGravity(planets, repel.checked);
      planet.move();
    });
    if(isAnimating) {
      window.requestAnimationFrame(update);
    }
  }

  function repeat(n, fn) {
    for(var i = 0; i < n; i++) {
      fn();
    }
  }

  init();

})();
