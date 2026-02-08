function createPiecePath(x, y, size, edges) {
  const tab = size * 0.25;
  const path = new Path2D();

  path.moveTo(x, y);

  // TOP
  if (edges.top === 0) {
    path.lineTo(x + size, y);
  } else {
    path.lineTo(x + size / 2 - tab, y);
    path.bezierCurveTo(
      x + size / 2 - tab,
      y - tab * edges.top,
      x + size / 2 + tab,
      y - tab * edges.top,
      x + size / 2 + tab,
      y
    );
    path.lineTo(x + size, y);
  }

  // RIGHT
  if (edges.right === 0) {
    path.lineTo(x + size, y + size);
  } else {
    path.lineTo(x + size, y + size / 2 - tab);
    path.bezierCurveTo(
      x + size + tab * edges.right,
      y + size / 2 - tab,
      x + size + tab * edges.right,
      y + size / 2 + tab,
      x + size,
      y + size / 2 + tab
    );
    path.lineTo(x + size, y + size);
  }

  // BOTTOM
  if (edges.bottom === 0) {
    path.lineTo(x, y + size);
  } else {
    path.lineTo(x + size / 2 + tab, y + size);
    path.bezierCurveTo(
      x + size / 2 + tab,
      y + size + tab * edges.bottom,
      x + size / 2 - tab,
      y + size + tab * edges.bottom,
      x + size / 2 - tab,
      y + size
    );
    path.lineTo(x, y + size);
  }

  // LEFT
  if (edges.left === 0) {
    path.closePath();
  } else {
    path.lineTo(x, y + size / 2 + tab);
    path.bezierCurveTo(
      x - tab * edges.left,
      y + size / 2 + tab,
      x - tab * edges.left,
      y + size / 2 - tab,
      x,
      y + size / 2 - tab
    );
    path.closePath();
  }

  return path;
}
