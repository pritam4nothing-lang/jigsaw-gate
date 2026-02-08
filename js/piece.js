function createPiecePath(x, y, size, edges) {
  const path = new Path2D();

  // Start point
  path.moveTo(x, y);

  // TOP
  createHorizontalEdgePath(path, x, y, size, edges.top);

  // RIGHT
  path.lineTo(x + size, y);
  createVerticalEdgePath(path, x + size, y, size, edges.right);

  // BOTTOM
  path.lineTo(x + size, y + size);
  createHorizontalEdgePath(path, x, y + size, size, -edges.bottom);

  // LEFT
  path.lineTo(x, y + size);
  createVerticalEdgePath(path, x, y, size, -edges.left);

  path.closePath();
  return path;
}
