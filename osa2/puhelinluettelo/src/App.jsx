import React, { useState } from 'react'

const Person = (props) => {
  console.log("PROPS", props)
  return (
      <p style={{ margin: 0 }}>{props.name}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName
    }
    if (!nameObject) return
    const lowerNames = persons.map(p => p.name.toLowerCase())
    if (lowerNames.includes(nameObject.name.toLowerCase())) {
      alert(`${nameObject.name} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <Person key={person.name} name={person.name} />)}
      </div>
    </div>
  )

}

export default App