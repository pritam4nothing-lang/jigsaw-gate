let activePiece = null;
let offsetX = 0;
let offsetY = 0;
let isTrayScrolling = false;
let lastX = 0;

canvas.addEventListener('pointerdown', e => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (y > trayY) {
    isTrayScrolling = true;
    lastX = x;
    return;
  }

  for (let i = pieces.length - 1; i >= 0; i--) {
    const p = pieces[i];
    ctx.save();
    ctx.translate(p.x + (p.inTray ? trayOffsetX : 0), p.y);

    if (ctx.isPointInPath(p.path, x - p.x - (p.inTray ? trayOffsetX : 0), y - p.y)) {
      activePiece = p;
      offsetX = x - p.x;
      offsetY = y - p.y;
      pieces.splice(i, 1);
      pieces.push(p);
      ctx.restore();
      break;
    }
    ctx.restore();
  }
});

canvas.addEventListener('pointermove', e => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (isTrayScrolling) {
    trayOffsetX += x - lastX;
    trayOffsetX = Math.max(trayMinX, Math.min(trayOffsetX, trayMaxX));
    lastX = x;
    return;
  }

  if (!activePiece) return;

  activePiece.x = x - offsetX;
  activePiece.y = y - offsetY;
});

window.addEventListener('pointerup', () => {
  if (activePiece) trySnap(activePiece);
  activePiece = null;
  isTrayScrolling = false;
});
