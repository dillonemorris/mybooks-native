const { gql } = require('apollo-server')

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    authors: [String]!
    imageUrl: String
    createdAt: String
    isFinished: Boolean
    finishedAt: String
    userRating: Int
    publicRating: Int
    publicRatingsCount: Int
    publishedYear: String
    pageCount: Int
  }

  type User {
    id: ID!
    email: String!
    books: [Book]!
    token: String
  }

  type Query {
    books: [Book]!
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
