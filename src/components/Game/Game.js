import React from 'react';
import Board from '../Board/Board';
import { calculateWinner } from '../../utils/utils';
import './Game.css';

// рендер всей игры с полем и комментариями
class Game extends React.Component {
  constructor(props) {
    super(props);
    // состояние всего поля, хранимое в истории игры
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      // номер хода
      stepNumber: 0,
      // первым ходит игрок Х
      xIsNext: true,
    };
  }

  // обработчик клика по клетке
  handleClick(i) {
    // получаем историю игры, при этом удаляя всю историю после этого хода
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // получаем текущий ход
    const current = history[history.length - 1];
    // копируем старое поле в текущую переменную
    const squares = current.squares.slice();

    // если победитель есть, выходим из обработчика
    if (calculateWinner(squares) || squares[i]) return;
    // заполняем выбранную клекту
    squares[i] = this.state.xIsNext ? 'X' : 'O';;
    // устанавливаем новое поле и меняем очередность игроков
    this.setState({
      // записываем текущий ход в историю
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  // переход к ходу из истории
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      // четный ход 0, нечетный Х
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    // получаем историю игры
    const history = this.state.history;
    // получаем текущий ход
    const current = history[this.state.stepNumber];
    // определение победителя
    const winner = calculateWinner(current.squares);
    // ходы, step - текущее состояние истории, move - текущий ход
    const moves = history.map((step, move) => {
      const desc = move ?
        'Перейти к ходу #' + move :
        'К началу игры';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    // определение состояния игры
    let status;
    if (winner) {
      status = 'Выиграл ' + winner;
    } else {
      status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
