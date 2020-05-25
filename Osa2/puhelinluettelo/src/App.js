import React, { useState, useEffect } from 'react'
import Persons from './components/persons.js'
import Filter from './components/Filter.js'
import Personform from './components/Personform.js'
import personService from './services/personService.js'

const App = () => {
  const [ persons, setPersons ] = useState([''])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ errorText, setErrorText ] = useState(null)
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
   
    if(persons.filter(person => person.name === personObject.name).length > 0) { 
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) { 
        personService
          .updatePerson(personObject, persons)
          setPersons(persons.map(person => person.name === newName ? personObject : person))
          setNewName('')
          setNewNumber('')
          setErrorText(`Updated ${personObject.name} phonenumber`)
          setTimeout(() => {
            setErrorText(null)
          }, 5000)
      }
      
      return 
    }

    personService
      .addPerson(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setErrorText(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setErrorText(null)
        }, 5000)
      })
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
    })
  }, [])
  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorMessage errorText={errorText} />
      <Filter value={newFilter} handleOnChange={handleFilterChange} />
      <Personform newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson}/>

      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} setPersons={setPersons} setErrorText={setErrorText} />
    </div>
  )
}

const ErrorMessage = ({errorText}) => {
    const errorStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

    if(errorText === null ) {
      return null
    }  

    return (
      <div style={errorStyle}>
        {errorText}
      </div>
    )
}


export default App