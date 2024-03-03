import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

import { Layout } from './components/Layout'

const cache = createCache({
  key: 'host',
})

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
})

export const App = () => (
  <CacheProvider value={cache}>
    <ChakraProvider theme={theme}>
      <Layout />
    </ChakraProvider>
  </CacheProvider>
)
