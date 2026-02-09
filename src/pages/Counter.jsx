import { useState } from 'react';

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ onClick, text, ariaLabel }) => (
  <button onClick={onClick} aria-label={ariaLabel}>
    {text}
  </button>
);

const Counter = () => {
  const [counter, setCounter] = useState(0);

  //funciones del contador
  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={decreaseByOne} text={'-'} ariaLabel="Decrease by one" />
      <Button onClick={setToZero} text={'Reset'} ariaLabel="Reset counter" />
      <Button onClick={increaseByOne} text={'+'} ariaLabel="Increase by one" />
    </div>
  );
};

export default Counter;
