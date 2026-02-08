let activePiece = null;
let offsetX = 0;
let offsetY = 0;

canvas.addEventListener('pointerdown', e => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  for (let i = pieces.length - 1; i >= 0; i--) {
    const p = pieces[i];
    ctx.save();
    ctx.translate(p.x, p.y);
    if (ctx.isPointInPath(p.path, x - p.x, y - p.y)) {
      activePiece = p;
      offsetX = x - p.x;
      offsetY = y - p.y;
      pieces.splice(i, 1);
      pieces.push(p); // bring to top
      ctx.restore();
      break;
    }
    ctx.restore();
  }
});

canvas.addEventListener('pointerdown', e => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  for (let i = pieces.length - 1; i >= 0; i--) {
    const p = pieces[i];

    ctx.save();
    ctx.translate(p.x, p.y);

    // ✅ CORRECT hit test (local coords)
    if (ctx.isPointInPath(p.path, x - p.x, y - p.y)) {
      activePiece = p;
      offsetX = x - p.x;
      offsetY = y - p.y;

      pieces.splice(i, 1);
      pieces.push(p); // bring to top

      ctx.restore();
      break;
    }

    ctx.restore();
  }
});
