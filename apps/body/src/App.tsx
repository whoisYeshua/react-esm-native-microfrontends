// import { ChakraProvider } from '@chakra-ui/provider'
// import { extendTheme } from '@chakra-ui/theme-utils'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

import { Body } from './components/Body'

const cache = createCache({
  key: 'body',
})

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
})

const App = () => (
  <div style={{ height: '100%' }} id="body">
    <CacheProvider value={cache}>
      <ChakraProvider theme={theme} cssVarsRoot="#body">
        <Body />
      </ChakraProvider>
    </CacheProvider>
  </div>
)

export default App
