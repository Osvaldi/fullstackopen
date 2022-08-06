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
        <h2>{props.course}</h2>
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
            <strong>
                Number of {total}  exercises
            </strong>
        </p>
    )
}

export default Course