import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async(anecdote) => {
    const object = {
        content: anecdote,
        //id: () => (100000 * Math.random()).toFixed(0),
        votes: 0
    }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const voteAnec = async(id, content) => {
    const currentAnec = await axios.get(`${baseUrl}/${id}`)
    currentAnec.data.votes = currentAnec.data.votes + 1
    const response = await axios.put(`${baseUrl}/${id}`, currentAnec.data)
    return response.data
}

export default { getAll, createNew, voteAnec }