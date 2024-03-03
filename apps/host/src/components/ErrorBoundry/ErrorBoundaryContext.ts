/* eslint-disable @typescript-eslint/no-explicit-any -- just */
import { createContext } from 'react'
import { useSafeContext } from '@react-esm-native-microfrontends/helpers'

type ErrorBoundaryContextType = {
  didCatch: boolean
  error: any
  resetErrorBoundary: (...args: any[]) => void
}

export const ErrorBoundaryContext = createContext<ErrorBoundaryContextType | null>(null)
export const useErrorBoundaryContext = () =>
  useSafeContext(ErrorBoundaryContext, 'ErrorBoundaryContext')
