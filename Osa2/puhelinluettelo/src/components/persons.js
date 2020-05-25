import React from 'react'
import personService from '../services/personService.js'

const Persons = (props) => {
    if(props.persons == '') {
        return(<></>)
    }

    let filteredPersons = props.persons.filter(person => person.name.includes(props.newFilter))
    const deletePerson = (person) => {
        personService
            .removePerson(person)
            .then(props.setPersons(
                props.persons.filter(personit => 
                    personit.id !== person.id
                )
                 
            ))
        //props.setErrorText('dawdaw')
        props.setErrorText(`Deleted ${person.name} from database`)
        setTimeout(() => {
            props.setErrorText(null)
        }, 5000)      
    }
    return(
        <>
        {filteredPersons.map((person) =>
            <p key={person.name}>{person.name} {person.number} <Button handleClick={() => deletePerson(person)}/></p> 
        )}
        </>
    )
}

const Button = props => {
    return (
        <button onClick={props.handleClick}>Delete</button>
    )
}

export default Persons