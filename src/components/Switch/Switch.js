import './Switch.css';

function Switch(props) {
  // устанавливаем текст переключателя
  const text = props.isIncrease ?
    'Сортировать ходы по убыванию' :
    'Сортировать ходы по возрастанию';

  // устанавливаем класс-модификатор для кнопки
  const buttonModifier = props.isIncrease ?
    'switch__button_left' :
    'switch__button_right';

  return (
    <div className="switch">
      <p className="switch__label">{text}</p>
      <button onClick={props.onClick} className={`switch__button ${buttonModifier}`} aria-label="переключатель сортировки ходов"></button>
    </div>
  );
}

export default Switch;
