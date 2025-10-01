export function getRandomCoordinate(boardSize = 10) {
  const x = Math.floor(Math.random() * boardSize);
  const y = Math.floor(Math.random() * boardSize);
  return [x, y];
}
