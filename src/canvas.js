const windowDimension = require('./windowDimensionObservable');

module.exports = {
  get context() { return context; },
  clear,
  init,
  renderCircles
};

const canvas = document.createElement('canvas'),
      context = canvas.getContext("2d");

windowDimension.addObserver(updateCanvasDimensions);

function clear() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function init(parentNode) {
  updateCanvasDimensions();
  parentNode.appendChild(canvas);
}

function renderCircles(circles) {
  _.forEach(circles, renderCircle);
}

function renderCircle(circle) {
  context.beginPath();
  context.arc(circle.x, circle.y, circle.size, 0, 2*Math.PI);
  context.fillStyle = circle.color;
  context.fill();
}

function updateCanvasDimensions() {
  canvas.width = windowDimension.width;
  canvas.height = windowDimension.height;
}
