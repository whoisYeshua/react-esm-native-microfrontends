import { chakra } from '@chakra-ui/react'

import { DynamicModule } from './DynamicModule'

export const Layout = () => (
  <>
    <chakra.header borderBottom="1px solid" borderColor="gray.500" h="70px" p="8px 16px">
      <DynamicModule path="header" />
    </chakra.header>
    <chakra.main h="100%" p="8px 16px">
      <DynamicModule path="body" />
    </chakra.main>
  </>
)
