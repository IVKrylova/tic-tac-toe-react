import React from 'react';
import Board from '../Board/Board';
import Switch from '../Switch/Switch';
import { calculateWinner } from '../../utils/utils';
import './Game.css';

// рендер всей игры с полем и комментариями
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // состояние всего поля, хранимое в истории игры
      history: [{
        squares: Array(9).fill(null),
      }],
      // номер хода
      stepNumber: 0,
      // первым ходит игрок Х
      xIsNext: true,
      // позиция
      position: [0, 0],
      // состояние переключателя
      isIncrease: true,
    };
    this.handleClickSwitch = this.handleClickSwitch.bind(this);
  }

  // обработчик клика по клетке
  handleClick(i) {
    // получаем историю игры, при этом удаляя всю историю после этого хода
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // получаем текущий ход
    const current = history[history.length - 1];
    // копируем старое поле в текущую переменную
    const squares = current.squares.slice();
    // получаем текущую позицию, цифры - номера клеток
    const currentPosition = [
      (i < 3) ? 1 : (i > 5 ? 3 : 2),
      (i === 0 || i === 3 || i === 6) ? 1 : (i === 1 || i === 4 || i === 7 ? 2 : 3)
    ];

    // если победитель есть, выходим из обработчика
    if (calculateWinner(squares) || squares[i]) return;
    // заполняем выбранную клекту
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    // устанавливаем новое поле и меняем очередность игроков
    this.setState({
      // записываем текущий ход в историю
      history: history.concat([{
        squares: squares,
        position: currentPosition,
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

  // обработчик клика по переключателю сортировки фильмов
  handleClickSwitch() {
    this.setState({
      // меняем стейт переключателя
      isIncrease: this.state.isIncrease ? false : true,
    });
  }

  render() {
    // получаем историю игры
    const history = this.state.history;
    // получаем текущий ход
    const current = history[this.state.stepNumber];
    // определение победителя и выигрышного ряда
    const winner = calculateWinner(current.squares);
    // ходы, step - текущее состояние истории, move - текущий ход
    const moves = history.map((step, move) => {
      const desc = move ?
        `Перейти к ходу #${move}` :
        'К началу игры';
      const position = step.position ?
        ` - позиция (${step.position})` :
        '';
      return (
        <li key={move}>
          <button className="button" onClick={_ => this.jumpTo(move)}>{`${desc} ${position}`}</button>
        </li>
      );
    });

    // определение состояния игры
    let status;
    if (current.squares.indexOf(null) === -1 && !winner) {
      status = 'Ничья';
    } else if (winner) {
      status = 'Выиграл ' + winner.winner;
    } else {
      status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            winnerRow={winner ? winner.row : []}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <Switch
            onClick={this.handleClickSwitch}
            isIncrease={this.state.isIncrease}
            moves={moves}
          />
          <ol>{this.state.isIncrease ? moves : moves.reverse()}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
