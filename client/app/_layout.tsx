import { Tabs } from 'expo-router'
import Svg, { Path } from 'react-native-svg'
import { ThemeProvider, DefaultTheme } from '@react-navigation/native'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const cache = new InMemoryCache()

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://192.168.0.152:4000/graphql',
  cache,
})

const AppLayout = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider value={DefaultTheme}>
        <Tabs>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: IconHome,
            }}
          />
          <Tabs.Screen
            name="mybooks"
            options={{
              title: 'My Books',
              tabBarIcon: IconBook,
            }}
          />
        </Tabs>
      </ThemeProvider>
    </ApolloProvider>
  )
}

const IconHome = ({ focused }) => {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill={focused ? '#2563eb' : '#1f2937'}
      width={24}
      height={24}
    >
      <Path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
      <Path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
    </Svg>
  )
}

const IconBook = ({ focused }) => {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill={focused ? '#2563eb' : '#1f2937'}
      width={24}
      height={24}
    >
      <Path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533zm1.5 16.103A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103z" />
    </Svg>
  )
}

export default AppLayout
