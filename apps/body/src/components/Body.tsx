import { useEffect, useState } from 'react'
import { Flex, Stack, Text, chakra } from '@chakra-ui/react'

import { queryCharactersInfo } from '../api/queryCharactersInfo'

import { Character } from './Character'

import type { CharactersInfoQuery } from '$types/codegen-gql'

export const Body = () => {
  const [charactersData, setCharactersData] = useState<
    CharactersInfoQuery['characters']['results'] | null
  >(null)

  useEffect(() => {
    queryCharactersInfo().then(data => {
      setCharactersData(data)
    })
  }, [])

  return (
    <Flex direction="column" gap="16px">
      <Text as="h2" fontSize="xl">
        Characters <chakra.span color="gray.500">{charactersData?.length}</chakra.span>
      </Text>
      <Stack spacing="4">
        {charactersData && charactersData.map(data => <Character {...data} key={data.name} />)}
      </Stack>
    </Flex>
  )
}
