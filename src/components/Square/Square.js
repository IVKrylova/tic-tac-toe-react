import './Square.css';

// клетка
function Square(props) {
  // определение класса для выигрышной клетки
  const winnerRow = props.winnerRow.reduce((className, i) => {
    const newClass = i === props.cellNumber ? 'square_winning' : '';

    return className + newClass;
  }, '');

  return (
    <button className={`square ${winnerRow}`} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
