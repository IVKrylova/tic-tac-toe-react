import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
    const status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');

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
