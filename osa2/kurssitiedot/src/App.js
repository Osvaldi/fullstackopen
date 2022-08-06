const Course = (props) => {
  return (
    <>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}


const Part = (props) => {
  return (
    <p> {props.name} {props.ex} </p>
  )
}

const Content = (props) => {
  return (
    <>
      {props.parts.map(element => <Part name={element.name} ex={element.exercises} />)}
    </>
  )
}

const Total = (props) => {
  let total = 0
  props.parts.forEach(element =>
    total += element.exercises)
  total = props.parts.reduce((s, p) => s + p.exercises, 0)
  return (
    <p>
      Number of <strong>{total}</strong>  exercises
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }
  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App