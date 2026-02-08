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

  // 1️⃣ FIRST: try picking a piece (even inside tray)
  for (let i = pieces.length - 1; i >= 0; i--) {
    const p = pieces[i];
    if (p.locked) continue;

    const hitPath = new Path2D();
    hitPath.addPath(
      p.path,
      new DOMMatrix().translate(
        p.inTray ? p.x + trayOffsetX : p.x,
        p.y
      )
    );

    if (ctx.isPointInPath(hitPath, x, y)) {
      activePiece = p;
      offsetX = x - (p.inTray ? p.x + trayOffsetX : p.x);
      offsetY = y - p.y;

      p.inTray = false;

      pieces.splice(i, 1);
      pieces.push(p);

      canvas.setPointerCapture(e.pointerId);
      return;
    }
  }

  // 2️⃣ IF no piece touched AND inside tray → scroll tray
  if (y >= trayY && y <= trayY + trayHeight) {
    isTrayScrolling = true;
    lastPointerX = x;
    canvas.setPointerCapture(e.pointerId);
  }
});


window.addEventListener('pointermove', e => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;

  if (isTrayScrolling) {
    const dx = x - lastPointerX;
    trayOffsetX += dx;

    trayOffsetX = Math.max(trayMinX, Math.min(trayOffsetX, trayMaxX));
    lastPointerX = x;
    return;
  }

  if (!activePiece) return;

  activePiece.x = x - offsetX;
  activePiece.y = e.clientY - rect.top - offsetY;
});


// POINTER UP (GLOBAL)
window.addEventListener('pointerup', e => {
  isTrayScrolling = false;

  if (activePiece) {
    canvas.releasePointerCapture(e.pointerId);
  }

  activePiece = null;
});
