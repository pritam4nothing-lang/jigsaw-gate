const canvas = document.getElementById('testCanvas');
const ctx = canvas.getContext('2d');

window.canvas = canvas;
window.ctx = ctx;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ===== LAYOUT =====
const PADDING = 16;
const TITLE_HEIGHT = 60;
const TRAY_HEIGHT_RATIO = 0.28;

// Board sizing (mobile first)
const boardWidth = Math.min(window.innerWidth * 0.9, 360);
const pieceSize = boardWidth / CONFIG.cols;
const boardHeight = pieceSize * CONFIG.rows;

// Board position
const boardX = (canvas.width - boardWidth) / 2;
const boardY = TITLE_HEIGHT + PADDING;

// Tray position
const trayY = boardY + boardHeight + PADDING;
const trayHeight = canvas.height - trayY - PADDING;

const edgeMatrix = generateEdgeMatrix(CONFIG.rows, CONFIG.cols);
const pieces = [];

window.pieces = pieces; // ✅ AFTER declaration


for (let r = 0; r < CONFIG.rows; r++) {
  for (let c = 0; c < CONFIG.cols; c++) {

    const correctX = margin + c * (pieceSize + 2);
    const correctY = margin + r * (pieceSize + 2);

    const randomX = Math.random() * (canvas.width - pieceSize);
    const randomY = Math.random() * (canvas.height - pieceSize);

    pieces.push({
      row: r,
      col: c,
      edges: edgeMatrix[r][c],
      x: randomX,
      y: randomY,
      correctX,
      correctY,
      path: createPiecePath(0, 0, pieceSize, edgeMatrix[r][c])
    });
  }
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#b3005e'; // deep pink / romantic
  ctx.lineWidth = 2;

  pieces.forEach(p => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.stroke(p.path);
    ctx.restore();
  });

  requestAnimationFrame(draw);
}

draw();
