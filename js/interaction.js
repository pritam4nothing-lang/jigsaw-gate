let activePiece = null;
let offsetX = 0;
let offsetY = 0;
let isTrayScrolling = false;
let lastPointerX = 0;

canvas.addEventListener('pointerdown', e => {
  e.preventDefault();

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // 👉 If touch is inside tray → start scrolling
  if (y >= trayY && y <= trayY + trayHeight) {
    isTrayScrolling = true;
    lastPointerX = x;
    canvas.setPointerCapture(e.pointerId);
    return;
  }

  // 👉 Otherwise try picking a piece
  for (let i = pieces.length - 1; i >= 0; i--) {
    const p = pieces[i];

    const hitPath = new Path2D();
    hitPath.addPath(
      p.path,
      new DOMMatrix().translate(
        p.inTray ? p.x + trayOffsetX : p.x,
        p.y
      )
    );

   if (ctx.isPointInPath(hitPath, x, y) && !p.locked) {
      activePiece = p;
      offsetX = x - (p.inTray ? p.x + trayOffsetX : p.x);
      offsetY = y - p.y;

      // lifted from tray
      p.inTray = false;

      // bring to top
      pieces.splice(i, 1);
      pieces.push(p);

      canvas.setPointerCapture(e.pointerId);
      break;
    }
  }
});


window.addEventListener('pointerup', e => {
  isTrayScrolling = false;

  if (activePiece) {
    // 🧲 TRY SNAP ON RELEASE
    trySnap(activePiece);

    canvas.releasePointerCapture(e.pointerId);
  }

  activePiece = null;
});


// POINTER UP (GLOBAL)
window.addEventListener('pointerup', e => {
  isTrayScrolling = false;

  if (activePiece) {
    canvas.releasePointerCapture(e.pointerId);
  }

  activePiece = null;
});
