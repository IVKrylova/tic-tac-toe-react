import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// определение победителя, squares - массив из 9 клеток
function calculateWinner(squares) {
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
      return squares[a];
    }
  }
  return null;
}

// клетка
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// поле
class Board extends React.Component {
  constructor(props) {
    super(props);
    // состояние всего поля
    this.state = {
      squares: Array(9).fill(null),
      // первым ходит игрок Х
      xIsNext: true,
    };
  }

  // обработчик клика по клетке
  handleClick(i) {
    // копируем старое поле в новую переменную
    const squares = this.state.squares.slice();

    // если победитель есть, выходим из обработчика
    if (calculateWinner(squares) || squares[i]) return;
    // заполняем выбранную клекту
    squares[i] = this.state.xIsNext ? 'X' : 'O';;
    // устанавливаем новое поле и меняем очередность игроков
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  // метод рендера одной клетки
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    // определение состояния игры
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Выиграл ' + winner;
    } else {
      status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// рендер всей игры с полем и комментариями
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
