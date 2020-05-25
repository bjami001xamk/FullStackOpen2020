import React from 'react'

const Personform = ({newName, handleNameChange, newNumber, handleNumberChange, addPerson}) => {
    return(
        <form onSubmit={addPerson}>
            <h2>add a new</h2>
            <div>
                name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>

        </form>
    )

}

export default Personform