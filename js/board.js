const canvas = document.getElementById('testCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pieceSize = 100;
const margin = 40;

const edgeMatrix = generateEdgeMatrix(CONFIG.rows, CONFIG.cols);

const pieces = [];

for (let r = 0; r < CONFIG.rows; r++) {
  for (let c = 0; c < CONFIG.cols; c++) {
    const x = margin + c * (pieceSize + 10);
    const y = margin + r * (pieceSize + 10);

    const path = createPiecePath(
      x,
      y,
      pieceSize,
      edgeMatrix[r][c]
    );

    pieces.push(path);
  }
}

// DRAW
ctx.strokeStyle = 'white';
ctx.lineWidth = 2;

pieces.forEach(path => {
  ctx.stroke(path);
});
