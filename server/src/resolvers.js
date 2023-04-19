module.exports = {
  Query: {
    books: (_, { query }, { dataSources }) =>
      dataSources.bookAPI.searchBooks(query),
    book: (_, { id }, { dataSources }) => dataSources.bookAPI.getBookById(id),
  },
}
