import React from 'react';
import Square from '../Square/Square';
import { FIELD } from '../../utils/constants';

// поле
class Board extends React.Component {
  // метод рендера одной клетки
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={_ => this.props.onClick(i)}
        key={i}
        winnerRow={this.props.winnerRow}
        cellNumber={i}
      />
    );
  }

  render() {
    return (
      <div>
        {
          FIELD.map(row => {
            return (
              <div className="board-row" key={FIELD.indexOf(row)}>
                {row.map(i => this.renderSquare(i))}
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default Board;
