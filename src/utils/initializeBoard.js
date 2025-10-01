export function initializeBoard(row, colum) {
  const board = {};
  for (let x = 0; x < row; x++) {
    for (let y = 0; y < colum; y++) {
      board[`${x},${y}`] = "empty";
    }
  }

  return board;
}
