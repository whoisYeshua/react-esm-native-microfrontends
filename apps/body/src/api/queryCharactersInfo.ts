import { request, gql } from 'graphql-request'

import type { CharactersInfoQuery } from '$types/codegen-gql'

const query = gql`
  query CharactersInfo {
    characters {
      results {
        name
        status
      }
    }
  }
`

export const queryCharactersInfo = async () => {
  const { characters } = await request<CharactersInfoQuery>(
    'https://rickandmortyapi.com/graphql',
    query,
  )

  return characters.results
}
