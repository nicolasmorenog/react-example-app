import { useState } from 'react';

const Header = () => {
  return <h1>Give feedback</h1>;
};

const Stats = (props) => {
  const total = props.good + props.neutral + props.bad;
  const average = (props.good - props.bad) / total;
  const positive = (props.good / total) * 100;

  if (total == 0) {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given yet</p>
      </>
    );
  } else {
    return (
      <>
        <h1>Statistics</h1>
        <table>
          <caption>Feedback statistics summary</caption>
          <thead>
            <tr>
              <th scope="col">Metric</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <StatLine text="Good: " stat={props.good} />
            </tr>
            <tr>
              <StatLine text="Neutral: " stat={props.neutral} />
            </tr>
            <tr>
              <StatLine text="Bad: " stat={props.bad} />
            </tr>
            <tr>
              <th scope="row">Total: </th>
              <td>{total}</td>
            </tr>
            <tr>
              <th scope="row">Average: </th>
              <td>{average}</td>
            </tr>
            <tr>
              <th scope="row">Positive: </th>
              <td>{positive}%</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
};

const StatLine = (props) => {
  return (
    <>
      <th scope="row">{props.text}</th>
      <td>{props.stat}</td>
    </>
  );
};

const Button = (props) => {
  return <button onClick={props.setStat}>{props.text}</button>;
};

const Unicafe = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header />
      <Button setStat={() => setGood(good + 1)} text="Good" />
      <Button setStat={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button setStat={() => setBad(bad + 1)} text="Bad" />
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default Unicafe;
