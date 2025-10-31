import { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
]

const Anecdote = (props) => {
  return (
    anecdotes[props.index]
  )
}

const App = () => {

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVotesPrev, setMostVotesPrev] = useState(0)
  const [indexMostVotesPrev, setIndexMostVotesPrev] = useState(undefined)

  const handleClick = () => {
    let newIndex

    do { newIndex = Math.floor(Math.random() * anecdotes.length) }
    while (newIndex == selected)

    console.log("New index: ", newIndex)
    return (setSelected(newIndex))
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    console.log("Voted: ", selected, "Total votes: ", newVotes[selected])
    console.log("New votes array: ", newVotes)
    return (setVotes(newVotes))
  }

  const mostVotedAnecdote = () => {

    const mostVotesActual = Math.max(...votes)
    console.log("mostVotesPrev: ", mostVotesPrev)
    console.log("mostVotesActual: ", mostVotesActual)


    if (mostVotesActual == mostVotesPrev) {
      return (indexMostVotesPrev)
    }

    else {
      setMostVotesPrev(mostVotesActual)
      console.log(votes)
      setIndexMostVotesPrev(votes.indexOf(mostVotesActual))
      return (votes.indexOf(mostVotesActual))
    }
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote index={selected} />
      <p>This anecdote has {votes[selected]} votes</p>
      <button
        onClick={handleVote}
      >Vote</button>
      <button
        onClick={handleClick}
      >Next anecdote</button>
      <h2>Anecdote with more votes</h2>
      <Anecdote index={mostVotedAnecdote()} />
    </div>
  )
}

export default App