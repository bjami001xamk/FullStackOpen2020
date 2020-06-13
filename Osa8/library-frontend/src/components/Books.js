import React from 'react'
import { gql, useQuery } from '@apollo/client'



const Books = (props) => {
  const ALL_BOOKS = gql`
    query{
      allBooks{
        title,
        published,
        author{
          name,
          born
        }
      }
    }
  `
  const result = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })
  if (!props.show) {
    return null
  }


  if(!result.data) {
    return <div>Loading...</div>
  }
  
  const books = result.data.allBooks
  console.log(books)
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books