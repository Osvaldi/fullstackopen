import { useState } from 'react'

const Headline = (props) => (
  <h1>{props.text}</h1>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => (

  props.statistics.map(element =>
    <tr>
      <td> {element.name}</td>
      <td>{element.value}</td>
    </tr>)

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
    },
    {
      name: 'All',
      value: good + neutral + bad
    },
    {
      name: 'average',
      value: (good * 1 + bad * -1) / (good + neutral + bad)
    },
    {
      name: 'positive',
      value: good / (good + neutral + bad)
    }
  ]
  return (

    <div>
      <Headline text='Give feedback' />
      <Button handleClick={() => setGood(good + 1)} text='Good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='Neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='Bad' />
      <Headline text='Statistics' />
      {statistics[3].value === 0 && <p> No feedback given </p>}
      {statistics[3].value !== 0 &&
        <table>
          <tbody>

            <Statistics statistics={statistics} />

          </tbody>
        </table>

      }
    </div>
  )
}

export default App