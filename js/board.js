const canvas = document.getElementById('testCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 300;

const edges = {
  top: 1,
  right: -1,
  bottom: 1,
  left: 0
};

const path = createPiecePath(50, 50, 150, edges);

ctx.strokeStyle = 'white';
ctx.lineWidth = 2;
ctx.stroke(path);
