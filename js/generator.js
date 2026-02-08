function generateEdgeMatrix(rows, cols) {
  const matrix = [];

  for (let r = 0; r < rows; r++) {
    matrix[r] = [];

    for (let c = 0; c < cols; c++) {
      const piece = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };

      // TOP
      if (r === 0) {
        piece.top = 0;
      } else {
        piece.top = -matrix[r - 1][c].bottom;
      }

      // LEFT
      if (c === 0) {
        piece.left = 0;
      } else {
        piece.left = -matrix[r][c - 1].right;
      }

      // RIGHT
      if (c === cols - 1) {
        piece.right = 0;
      } else {
        piece.right = Math.random() > 0.5 ? 1 : -1;
      }

      // BOTTOM
      if (r === rows - 1) {
        piece.bottom = 0;
      } else {
        piece.bottom = Math.random() > 0.5 ? 1 : -1;
      }

      matrix[r][c] = piece;
    }
  }

  return matrix;
}
function createHorizontalEdgePath(path, x, y, size, type) {
  const tabWidth = size * 0.3;
  const tabHeight = size * 0.25 * type; // + for head, - for socket

  const startX = x;
  const endX = x + size;
  const midX = x + size / 2;

  // Straight line to start of tab
  path.lineTo(midX - tabWidth / 2, y);

  if (type !== 0) {
    // Bézier curve for tab
    path.bezierCurveTo(
      midX - tabWidth / 2,
      y - tabHeight,
      midX + tabWidth / 2,
      y - tabHeight,
      midX + tabWidth / 2,
      y
    );
  }

  // Straight line to end
  path.lineTo(endX, y);
}
