let activePiece = null;
let offsetX = 0;
let offsetY = 0;

canvas.addEventListener('pointerdown', e => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  for (let i = pieces.length - 1; i >= 0; i--) {
    const p = pieces[i];

    // ❌ NO ctx.translate here

    // ✅ create transformed path for hit-test
    const hitPath = new Path2D();
    hitPath.addPath(p.path, new DOMMatrix().translate(p.x, p.y));

    if (ctx.isPointInPath(hitPath, x, y)) {
      activePiece = p;
      offsetX = x - p.x;
      offsetY = y - p.y;

      pieces.splice(i, 1);
      pieces.push(p); // bring to top
      break;
    }
  }
});
