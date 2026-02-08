let activePiece = null;
let offsetX = 0;
let offsetY = 0;

// POINTER DOWN (on canvas)
canvas.addEventListener('pointerdown', e => {
  e.preventDefault(); // 🔥 IMPORTANT FOR MOBILE
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  for (let i = pieces.length - 1; i >= 0; i--) {
    const p = pieces[i];

    const hitPath = new Path2D();
    hitPath.addPath(p.path, new DOMMatrix().translate(p.x, p.y));

    if (ctx.isPointInPath(hitPath, x, y)) {
      activePiece = p;
      offsetX = x - p.x;
      offsetY = y - p.y;

      // bring to top
      pieces.splice(i, 1);
      pieces.push(p);

      // capture pointer (VERY IMPORTANT)
      canvas.setPointerCapture(e.pointerId);
      break;
    }
  }
});

// POINTER MOVE (GLOBAL — not canvas)
window.addEventListener('pointermove', e => {
  if (!activePiece) return;

  const rect = canvas.getBoundingClientRect();
  activePiece.x = e.clientX - rect.left - offsetX;
  activePiece.y = e.clientY - rect.top - offsetY;
});

// POINTER UP (GLOBAL)
window.addEventListener('pointerup', e => {
  if (activePiece) {
    canvas.releasePointerCapture(e.pointerId);
  }
  activePiece = null;
});
