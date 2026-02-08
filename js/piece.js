function createPiecePath(x, y, size, edges) {
  const path = new Path2D();

  path.moveTo(x, y);

  // Top
  createHorizontalEdgePath(path, x, y, size, edges.top);

  // Right
  createVerticalEdgePath(path, x + size, y, size, edges.right);

  // Bottom (reverse direction)
  createHorizontalEdgePath(path, x, y + size, size, -edges.bottom);

  // Left (reverse direction)
  createVerticalEdgePath(path, x, y, size, -edges.left);

  path.closePath();
  return path;
}
