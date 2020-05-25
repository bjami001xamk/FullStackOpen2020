import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addPerson = personObject => {
    const request = axios.post(baseUrl, personObject)
    return request.then(response => response.data)
}

const removePerson = person => {
    if (window.confirm("Delete " + person.name + "?")) { 
        const request = axios.delete(baseUrl + '/' + person.id)
        return request.then(response => response)
    }
}
const updatePerson = (person, persons) => {
    const idPosition  = persons.filter(personit => personit.name === person.name)[0].id
    const request = axios.put(baseUrl + '/' + idPosition, person)
    return request.then(response => response)
    
}

export default {
    getAll,
    addPerson,
    removePerson,
    updatePerson
}