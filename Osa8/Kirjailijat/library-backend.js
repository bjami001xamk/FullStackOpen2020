const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid');
const mongoose = require('mongoose')
const books = require('./models/Book')
const authors = require('./models/Author')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://KayttajaOsa4:salasanaosa4@testia-zhaxe.mongodb.net/test?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB', error.message)
  })


const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String,genre: String): [Book]
    allAuthors: [Author!]!
  }
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }
  type Author{
    name: String!
    born: Int
    bookCount: Int!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.collection.countDocuments(),
    authorCount: () => authors.collection.countDocuments(),
    allBooks: async (root, args) => {
      if(!args.author && !args.genre){
          const allBooks = await books.find({}).populate('author')

        return allBooks
      } else if (!args.author) {
        const genreFilteredBooks = await books.find({ genres: { $in: [args.genre]}}).populate('author')
        return genreFilteredBooks
      } 
      
      /*else if (!args.genre) {
        return await books.filter(book => book.author === args.author)
      }else if(!args.author) {
        return await books.filter(book => book.genres.find(genre => genre === args.genre))
      } else {
        return await books.filter(book => book.author === args.author).filter(book => book.genres.find(genre => genre === args.genre))
      }*/
    },
    allAuthors: () => authors.find({})
    
  },
  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    bookCount: (root) =>  
      books.countDocuments({author : root.id})
  },
 
  
  Mutation: {
    addBook: async (root, args) => {
      const authorInDb = await authors.find({ name: args.author })
      const newBook = new books({ ...args })
      if(!authorInDb[0]) { 
        const newAuthor = new authors({
          name: args.author
        })
        try{
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      } 
      newBook.author = await authors.findOne({ name: args.author })
      try {
        newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return newBook
    },
    editAuthor: async (root, args) => {
      const authorInDb = await authors.findOne({ name: args.name })
      if(!authorInDb){
        return null
      }
      authorInDb.born = args.setBornTo
      authorInDb.save()
      return authorInDb
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})