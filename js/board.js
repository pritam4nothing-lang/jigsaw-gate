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
// ===== TRAY SCROLL STATE =====
let trayOffsetX = 0;
let trayMinX = 0;
let trayMaxX = 0;

// ===== IMAGE SCALE & OFFSET (9.4.1-F) =====
const imageScale = Math.max(
  boardWidth / puzzleImage.width,
  boardHeight / puzzleImage.height
);

const imageDrawWidth = puzzleImage.width * imageScale;
const imageDrawHeight = puzzleImage.height * imageScale;

const imageOffsetX = boardX - (imageDrawWidth - boardWidth) / 2;
const imageOffsetY = boardY - (imageDrawHeight - boardHeight) / 2;

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

// ===== TRAY SCROLL LIMITS =====
const trayContentWidth =
  pieces.length * (pieceSize + 12);

const trayVisibleWidth =
  canvas.width - PADDING * 2;

// left limit (negative value)
trayMinX = Math.min(0, trayVisibleWidth - trayContentWidth);

// right limit (always 0)
trayMaxX = 0;

 // ===== PUZZLE IMAGE =====
const puzzleImage = new Image();
puzzleImage.src = 'assets/puzzle.jpg';
let imageLoaded = false;

puzzleImage.onload = () => {
  imageLoaded = true;
};
  
function trySnap(piece) {
  if (piece.locked) return false;

  const dx = piece.x - piece.correctX;
  const dy = piece.y - piece.correctY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // 🔍 DEBUG LOG (TEMPORARY)
  console.log('SNAP CHECK →', {
    pieceRow: piece.row,
    pieceCol: piece.col,
    x: piece.x,
    y: piece.y,
    correctX: piece.correctX,
    correctY: piece.correctY,
    dx,
    dy,
    distance,
    snapRadius: CONFIG.snapRadius
  });

  if (distance < CONFIG.snapRadius) {
    piece.x = piece.correctX;
    piece.y = piece.correctY;
    piece.locked = true;
    piece.inTray = false;

    console.log('✅ SNAPPED');
    return true;
  }

  return false;
}


function draw() {

  // 🖼️ wait until image is loaded
  if (!imageLoaded) {
    requestAnimationFrame(draw);
    return;
  }

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

  const drawX = p.inTray ? p.x + trayOffsetX : p.x;
  const drawY = p.y;

  ctx.translate(drawX, drawY);

  // ---- CLIP TO JIGSAW SHAPE ----
  ctx.save();
  ctx.clip(p.path);

  // image crop source (from full image)
  const sx = p.col * pieceSize;
  const sy = p.row * pieceSize;
  const sSize = pieceSize;

  // draw cropped image into piece
  ctx.drawImage(
    puzzleImage,
    sx,
    sy,
    sSize,
    sSize,
    0,
    0,
    pieceSize,
    pieceSize
  );

  ctx.restore();

  // ---- BORDER ON TOP ----
  ctx.stroke(p.path);

  ctx.restore();
});


  requestAnimationFrame(draw);
}

draw();
