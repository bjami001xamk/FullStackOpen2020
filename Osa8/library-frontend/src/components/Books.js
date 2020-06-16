import React, {useState, useEffect} from 'react'
import { gql, useQuery, useLazyQuery } from '@apollo/client'

export const ALL_BOOKS = gql`
    query {
      allBooks {
        title,
        published,
        genres,
        author{
          name,
          born
        }
      }
    }
  `
export const FILTERED_BOOKS = gql`
  query books ($genreToFilter: String!) {
    allBooks(genre: $genreToFilter) {
      title,
      published,
      genres,
      author{
        name,
        born
      }
    }
  }
`

const Books = (props) => {
  const [filter, setFilter] = useState('')
  const [ filteredGenres, setFilteredGenres ] = useState([])
  const [ books, setBooks ] = useState([])
  

  

  const [activatequery, {loading, data}] = useLazyQuery(FILTERED_BOOKS, {variables: {genreToFilter: filter}, pollInterval: 2000, fetchPolicy: 'network-only'})
  const queryFiltered = (genreToFilter) => {
    if(genreToFilter === '') {
      setFilter('')
    } else {
      setFilter(genreToFilter.genre)
    }
    activatequery() 
  }

  useEffect(() => {
    if(data) {
      setBooks(data.allBooks)
    }
  }, [data])


  const result = useQuery(ALL_BOOKS, {
    
  })
  
  useEffect(() => {
    if(!result.loading) {
      setBooks(result.data.allBooks)
      result.data.allBooks.forEach(book => {
        book.genres.forEach(genre => {
          filteredGenres.push(genre)
          
        })
      })
      
      setFilteredGenres([...new Set(filteredGenres)])
    }
  },[result])
  
  if (!props.show) {
    return null
  }


  if(!result.data) {
    return <div>Loading...</div>
  }
  
  if(filteredGenres.length === 0 ) {
    return null
  }
  
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
      {filteredGenres.map(genre => 
        <button key={genre} type='button' onClick={() => queryFiltered({genre})}>{genre}</button>
      )}
      <button type='button' onClick={() => queryFiltered('')}>all genres</button>
    </div>
  )
}

export default Books