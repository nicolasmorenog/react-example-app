import { useState } from 'react'

const Header = () => {
  return (
    <h1>Give feedback</h1>
  )
}

const Stats = (props) => {

const total = props.good + props.neutral + props.bad
const average = (props.good-props.bad)/total
const positive = props.good / total

  return (
    <>
      <h1>Statistics</h1>
      <div>
        <Review text="Good: " review={props.good} />
        <br></br>
        <Review text="Neutral: " review={props.neutral} />
        <br></br>
        <Review text="Bad: " review={props.bad} />
      </div>
      <div>
        Total: {total}
        <br></br>
        Average: {average}
        <br></br>
        Positive: {positive}%
      </div>
    </>
  )
}

const Review = (props) => {
  return (
    <>
      {props.text} {props.review}
    </>
  )
}


const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header />
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App