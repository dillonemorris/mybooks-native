require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const typeDefinitions = require('./schema')
const BookAPI = require('./datasources/book')
const resolvers = require('./resolvers')

const server = new ApolloServer({
  typeDefs: typeDefinitions,
  resolvers,
  dataSources: () => ({
    bookAPI: new BookAPI(),
  }),
})

server.listen().then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
    Explore at https://studio.apollographql.com/sandbox
  `)
})
