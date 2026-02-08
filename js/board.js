const canvas = document.getElementById('testCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const puzzleImage = new Image();
puzzleImage.src = 'assets/puzzle.jpg';

let imageReady = false;
puzzleImage.onload = () => imageReady = true;

const PADDING = 16;
const TITLE_HEIGHT = 60;

const boardWidth = Math.min(canvas.width * 0.9, 360);
const pieceSize = boardWidth / CONFIG.cols;
const boardHeight = pieceSize * CONFIG.rows;

const boardX = (canvas.width - boardWidth) / 2;
const boardY = TITLE_HEIGHT + PADDING;

const trayY = boardY + boardHeight + PADDING;
const trayHeight = canvas.height - trayY - PADDING;

const imageScale = Math.max(
  boardWidth / puzzleImage.width,
  boardHeight / puzzleImage.height
);

const imageDrawWidth = puzzleImage.width * imageScale;
const imageDrawHeight = puzzleImage.height * imageScale;

const imageOffsetX = boardX - (imageDrawWidth - boardWidth) / 2;
const imageOffsetY = boardY - (imageDrawHeight - boardHeight) / 2;

const edgeMatrix = generateEdgeMatrix(CONFIG.rows, CONFIG.cols);
const pieces = [];
window.pieces = pieces;

let trayOffsetX = 0;
let trayCursorX = PADDING;

for (let r = 0; r < CONFIG.rows; r++) {
  for (let c = 0; c < CONFIG.cols; c++) {
    pieces.push({
      row: r,
      col: c,
      correctX: boardX + c * pieceSize,
      correctY: boardY + r * pieceSize,
      x: trayCursorX,
      y: trayY + (trayHeight - pieceSize) / 2,
      inTray: true,
      locked: false,
      path: createPiecePath(0, 0, pieceSize, edgeMatrix[r][c])
    });

    trayCursorX += pieceSize + 12;
  }
}

const trayContentWidth = trayCursorX;
const trayMinX = Math.min(0, canvas.width - trayContentWidth - PADDING);
const trayMaxX = 0;

function trySnap(p) {
  if (p.locked) return;

  const dx = p.x - p.correctX;
  const dy = p.y - p.correctY;

  if (Math.hypot(dx, dy) < CONFIG.snapRadius) {
    p.x = p.correctX;
    p.y = p.correctY;
    p.locked = true;
    p.inTray = false;
  }
}

function draw() {
  if (!imageReady) {
    requestAnimationFrame(draw);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // board
  ctx.strokeStyle = '#aaa';
  ctx.strokeRect(boardX, boardY, boardWidth, boardHeight);

  // tray
  ctx.strokeRect(PADDING, trayY, canvas.width - PADDING * 2, trayHeight);

  pieces.forEach(p => {
    ctx.save();
    ctx.translate(p.x + (p.inTray ? trayOffsetX : 0), p.y);

    ctx.clip(p.path);

    ctx.drawImage(
      puzzleImage,
      imageOffsetX - p.correctX,
      imageOffsetY - p.correctY,
      imageDrawWidth,
      imageDrawHeight
    );

    ctx.restore();

    ctx.strokeStyle = '#b3005e';
    ctx.lineWidth = 2;
    ctx.stroke(p.path);
  });

  requestAnimationFrame(draw);
}

draw();
