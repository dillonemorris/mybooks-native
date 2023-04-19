const { gql } = require('apollo-server')

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: Author!
    description: String
    coverImageUrl: String
    createdAt: String
    isFinished: Boolean
    finishedAt: String
    userRating: Int
    publicRating: Int
    publicRatingsCount: Int
    publishedYear: String
    pageCount: Int
  }

  type Author {
    name: String
    photo: String
  }

  type User {
    id: ID!
    email: String!
    books: [Book]!
    token: String
  }

  type Query {
    books(query: String!): [Book]!
    book(id: ID!): Book
    me: User
  }

  type Mutation {
    createBook(bookId: [ID]!): BookUpdateResponse!
    deleteBook(bookId: ID!): BookUpdateResponse!
    login(email: String): User
  }

  type BookUpdateResponse {
    success: Boolean!
    message: String
    book: Book
  }
`

module.exports = typeDefs
