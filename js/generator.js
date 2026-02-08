function generateEdgeMatrix(rows, cols) {
  const matrix = [];

  for (let r = 0; r < rows; r++) {
    matrix[r] = [];
    for (let c = 0; c < cols; c++) {
      matrix[r][c] = {
        top: r === 0 ? 0 : -matrix[r - 1][c].bottom,
        left: c === 0 ? 0 : -matrix[r][c - 1].right,
        right: c === cols - 1 ? 0 : Math.random() > 0.5 ? 1 : -1,
        bottom: r === rows - 1 ? 0 : Math.random() > 0.5 ? 1 : -1
      };
    }
  }
  return matrix;
}
