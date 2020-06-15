import React, {useState, useEffect} from 'react'
import { gql, useLazyQuery } from '@apollo/client'

const MEQUERY = gql`
    query{
        me{
        username,
        favoriteGenre
        }
    }
`
    
const BOOKQUERY = gql`
    query findBooksWithGenre($genreToSearch: String!) {
        allBooks(genre: $genreToSearch ) {
            title,
            author{
            name
            },
            published
        }
    }
`

const Recommend = (props) => {
    const [ user, setUser ] = useState(null)
    //const [ books, setBooks ] = useState('')
    const [ favoriteGenre , setFavoriteGenre ] = useState('')
    const [ filteredBooks, setFilteredBooks] = useState(null)
    //const [ currentPage, setCurrentPage ] = useState('')

    const [genreFilteredBooks, result] = useLazyQuery(BOOKQUERY, {variables: { genreToSearch: favoriteGenre}})
    const [meQuery, { loading, data }] = useLazyQuery(MEQUERY, {fetchPolicy: 'network-only'})
    
    useEffect(() => {
        meQuery()
    }, [props.show])

    useEffect(() => {
        if(data) {
            if(data.me) {
                setUser(data.me)
                genreFilteredBooks({variables: { genreToSearch: data.me.favoriteGenre}})
            }
        }
    },[data])

    useEffect(() => {
        if(result.data) {
            setFilteredBooks(result.data.allBooks)
        }
    },[result.data])


    if(!props.show){
        return null
    }
    if(!props.token) {
        return null
    }
    
    if(loading) {
        return null
    }
    if(!filteredBooks) {
        return null
    }
    
    return (
        <div>
            <h2>recommendations</h2>
            books in your favorite genre {user.favoriteGenre}
            <table>
                <thead>
                    <tr>
                        <td></td><td>author</td><td>published</td>
                    </tr>
                </thead>
                <tbody>
            {filteredBooks.map(book => <tr key={book.title}><td>{book.title}</td><td>{book.author.name}</td><td>{book.published}</td></tr>)}
                </tbody>
            </table>
        </div>
    )
}


export default Recommend