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


let trayCursorX = PADDING;

for (let r = 0; r < CONFIG.rows; r++) {
  for (let c = 0; c < CONFIG.cols; c++) {

    const correctX = boardX + c * pieceSize;
    const correctY = boardY + r * pieceSize;

    pieces.push({
      row: r,
      col: c,
      edges: edgeMatrix[r][c],

      // START IN TRAY
      x: trayCursorX,
      y: trayY + (trayHeight - pieceSize) / 2,

      correctX,
      correctY,

      inTray: true,
      locked: false,

      path: createPiecePath(0, 0, pieceSize, edgeMatrix[r][c])
    });

    trayCursorX += pieceSize + 12; // horizontal spacing
  }
}

   
function draw() {
  // optional: clear (background later theme দিয়ে আসবে)
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ---- BOARD OUTLINE ----
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  ctx.strokeRect(boardX, boardY, boardWidth, boardHeight);

  // ---- TRAY OUTLINE ----
  ctx.strokeStyle = '#bbb';
  ctx.strokeRect(
    PADDING,
    trayY,
    canvas.width - PADDING * 2,
    trayHeight
  );

  // ---- DRAW PIECES ----
  ctx.strokeStyle = '#b3005e'; // deep pink
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
