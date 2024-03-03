// import { ChakraProvider } from '@chakra-ui/provider'
// import { extendTheme } from '@chakra-ui/theme-utils'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

import { Header } from './components/Header'

const cache = createCache({
  key: 'header',
})

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
})

const App = () => (
  <CacheProvider value={cache}>
    <ChakraProvider theme={theme}>
      <Header />
    </ChakraProvider>
  </CacheProvider>
)

export default App
