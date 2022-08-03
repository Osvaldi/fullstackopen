import { useState } from 'react'

const Headline = (props) => (
  <h1>{props.text}</h1>
)

const Button = (props) => (
  <button onClick = {props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => (

     props.statistics.map(element => <p> {element.name} {element.value} </p>)

)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const statistics = [
    {
      name: 'Good',
      value: good
    },
    {
      name: 'Neutral',
      value: neutral
    },
    {
      name: 'Bad',
      value: bad
    }
  ]
  return (
    
    <div>
      <Headline text = 'Give feedback' />
      <Button handleClick = {() => setGood(good + 1)} text ='Good' />
      <Button handleClick = {() => setNeutral(neutral + 1)} text ='Neutral' />
      <Button handleClick = {() => setBad(bad + 1)} text ='Bad' />
      <Headline text = 'Statistics' />
      <Statistics statistics = {statistics} />
    </div>
  )
}

export default App