import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import { gql, useQuery } from '@apollo/client'

export const BOOK_LIST_ITEM_DATA = gql`
  fragment BookListItem on Book {
    id
    title
    author {
      name
    }
  }
`

export const GET_BOOKS = gql`
  query GetBookList($query: String!) {
    books(query: $query) {
      ...BookListItem
    }
  }
  ${BOOK_LIST_ITEM_DATA}
`

const Home = () => {
  const { data, refetch } = useQuery(GET_BOOKS)

  const fetchBooksByQuery = async () => {
    try {
      await refetch({
        query: 'Daisy Jones',
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Discover books</Text>
      <Button title="Search" onPress={fetchBooksByQuery} />
      {data ? (
        <FlatList
          data={data.books}
          renderItem={({ item }) => <BookListItem book={item} />}
          keyExtractor={(item) => item.id}
        />
      ) : null}
    </View>
  )
}

const BookListItem = ({ book }) => {
  return (
    <View>
      <Text>{book.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
})

export default Home
