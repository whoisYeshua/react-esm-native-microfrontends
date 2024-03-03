import { useContext } from 'react'

import type { Context } from 'react'

export const useSafeContext = <T>(unsafeContext: Context<T>, contextName?: string) => {
  const currentUserContext = useContext<T>(unsafeContext)

  if (!currentUserContext) {
    throw new Error(`hook has to be used within <${contextName}.Provider>`)
  }

  return currentUserContext
}
