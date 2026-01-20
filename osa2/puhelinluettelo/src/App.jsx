import React, { useState, useEffect } from 'react'
import axios from 'axios'

import personsService from './services/persons'


const Person = ({ name, number, id, onDelete }) => {
  return (
    <p style={{ margin: 0 }}>
      {name} {number} <button onClick={() => onDelete(id)}>delete</button>
    </p>
  )
}

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map(person => (
        console.log('Rendering person:', person.name, person.id),
        <Person key={person.id} name={person.name} number={person.number} id={person.id} onDelete={onDelete} />
      ))}
    </div>
  )
}

const PersonForm = ({ onSubmit, newName, onNameChange, newNumber, onNumberChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName} onChange={onNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Filter = ({ filter, onChange }) => (
  <div>
    filter shown with <input value={filter} onChange={onChange} />
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const hook = () => {
    console.log('effect')
    personsService.getAllPersons().then(initialPersons => {
      console.log('promise fulfilled')
      setPersons(initialPersons)
    })
  }

  useEffect(hook, [])



  const addUserInput = async (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (!personObject.name || !personObject.number) return
    const lowerNames = persons.map(p => p.name.toLowerCase())
    if (lowerNames.includes(personObject.name.toLowerCase())) {
      alert(`${personObject.name} is already added to phonebook`)
      return
    }
      const created = await personsService.addPerson(personObject)
      console.log('Created person:', created)
      setPersons(persons.concat(created))
      setNewName('')
      setNewNumber('')

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (id) => {
    console.log('deleting', id)
    const person = persons.find(p => p.id === id)
    if (!window.confirm(`Delete ${person.name}?`)) return
    personsService.removePerson(id)
    setPersons(persons.filter(p => p.id !== id))
  }

  const filteredPersons = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} onChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        onSubmit={addUserInput}
        newName={newName}
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  )
}

export default App