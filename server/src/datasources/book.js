const { RESTDataSource } = require('apollo-datasource-rest')

class BookAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://openlibrary.org/'
  }

  async searchBooks(searchQuery) {
    const response = await this.get('search.json', {
      title: searchQuery,
    })

    return Array.isArray(response.docs)
      ? response.docs.map(this.bookSearchReducer)
      : []
  }

  bookSearchReducer(book) {
    const imageBaseUrl = 'https://covers.openlibrary.org/b/id'
    const coverImageUrl = book.cover_i
      ? `${imageBaseUrl}/${book.cover_i}-M.jpg`
      : null

    // book.key is in format /works/${key}
    // We want to grab just the key part and store it
    // We'll then use this as the id when we fetch an individual work
    const id = book.key.split('/works/')[1]

    const author = book.author_name ? { name: book.author_name[0] } : {}

    return {
      id,
      coverImageUrl,
      title: book.title,
      author,
    }
  }

  async getBookById(id) {
    const book = await this.get(`works/${id}.json`)
    const { covers } = book

    const authorKey = book.authors[0].author.key
    const author = await this.get(`${authorKey}.json`)

    const authorId = authorKey.split('/authors/')[1]
    const authorPhoto = `https://covers.openlibrary.org/a/olid/${authorId}-M.jpg`

    const imageBaseUrl = 'https://covers.openlibrary.org/b/id'
    const coverImageUrl = covers.length
      ? `${imageBaseUrl}/${covers[0]}-M.jpg`
      : null

    return {
      id,
      title: book.title,
      coverImageUrl,
      author: {
        name: author.name,
        photo: authorPhoto,
      },
    }
  }
}

module.exports = BookAPI
