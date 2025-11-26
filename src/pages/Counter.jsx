import { useState } from 'react';

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Counter = () => {
  const [counter, setCounter] = useState(0);

  //funciones del contador
  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={decreaseByOne} text={'-'} />
      <Button onClick={setToZero} text={'Reset'} />
      <Button onClick={increaseByOne} text={'+'} />
    </div>
  );
};

export default Counter;
