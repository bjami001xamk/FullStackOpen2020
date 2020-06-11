  
import React, {useState} from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

const UPDATE_AUTHOR = gql`
    mutation updateAuthor($name: String!, $year: Int! ) {
      editAuthor(
        name: $name,
        setBornTo: $year
      ) {
        name,
        born
      }
    }
  `

const Authors = (props) => {
  const [ name, setName ] = useState('')
  const [ year, setYear ] = useState('')
  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR)

  const ALL_AUTHORS = gql`
    query{
        allAuthors{
          name,
          born,
          bookCount
        }
    }
  `
  


  const result = useQuery(ALL_AUTHORS, {
    pollInterval:2000
  })
  if (!props.show) {
    return null
  }
  if (!result.data) {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors
  const setBirthyear = async() => {
    updateAuthor({ variables : { name, year }})
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        <h2>Set birthyear</h2>
        name:<select value={name} onChange={({target}) => setName(target.value)}>
          {authors.map(author =>
            <option key={author.name} value={author.name}>{author.name}</option>
          )}

        </select>
        <br/>
        born: <input value = {year} onChange={({target}) => setYear(Number(target.value))}/><br/>
        <button type="button" onClick={() => setBirthyear()}>Update Author</button>
      </div>
    </div>
  )
}

export default Authors
