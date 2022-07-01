// определение победителя, squares - массив из 9 клеток
 export function calculateWinner(squares) {
  // линии - выйгрыши
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // в цикле ищем каждую выйгрышную линию в массиве клеток
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    // если на линии одинаковые символы, возвращаем символ
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], row: lines[i]};
    }
  }
  return null;
}
