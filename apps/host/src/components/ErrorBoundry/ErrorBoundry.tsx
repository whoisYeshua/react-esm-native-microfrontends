/* eslint-disable react/destructuring-assignment -- no need here */
/* eslint-disable @typescript-eslint/no-explicit-any -- just */
import { Component, isValidElement } from 'react'

import { ErrorBoundaryContext } from './ErrorBoundaryContext'

import type { ErrorInfo, ReactNode, ComponentType, ReactElement } from 'react'

type FallbackProps = {
  error: any
  resetErrorBoundary: (...args: any[]) => void
}

interface ErrorBoundarySharedProps {
  onError?: (error: Error, info: ErrorInfo) => void
  onReset?: (details: { args: any[] }) => void
  children?: ReactNode
}

export type ErrorBoundaryPropsWithComponent = ErrorBoundarySharedProps & {
  fallback?: never
  FallbackComponent: ComponentType<FallbackProps>
  fallbackRender?: never
}

export type ErrorBoundaryPropsWithRender = ErrorBoundarySharedProps & {
  fallback?: never
  FallbackComponent?: never
  fallbackRender: (props: FallbackProps) => ReactNode
}

export type ErrorBoundaryPropsWithFallback = ErrorBoundarySharedProps & {
  fallback: ReactElement
  FallbackComponent?: never
  fallbackRender?: never
}

export type ErrorBoundaryProps =
  | ErrorBoundaryPropsWithFallback
  | ErrorBoundaryPropsWithComponent
  | ErrorBoundaryPropsWithRender

type ErrorBoundaryState =
  | {
      didCatch: true
      error: any
    }
  | {
      didCatch: false
      error: null
    }

const initialState: ErrorBoundaryState = {
  didCatch: false,
  error: null,
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)

    this.state = initialState
  }

  static getDerivedStateFromError(error: Error) {
    return { didCatch: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info)
  }

  resetErrorBoundary = (...args: any[]) => {
    const { error } = this.state

    if (error !== null) {
      this.props.onReset?.({
        args,
      })

      this.setState(initialState)
    }
  }

  render() {
    const { children, fallbackRender, FallbackComponent, fallback } = this.props
    const { didCatch, error } = this.state

    let childToRender = children

    if (didCatch) {
      const props: FallbackProps = {
        error,
        resetErrorBoundary: this.resetErrorBoundary,
      }

      if (typeof fallbackRender === 'function') {
        childToRender = fallbackRender(props)
      } else if (FallbackComponent) {
        childToRender = <FallbackComponent {...props} />
      } else if (fallback === null || isValidElement(fallback)) {
        childToRender = fallback
      } else {
        throw error
      }
    }

    return (
      <ErrorBoundaryContext.Provider
        value={{ didCatch, error, resetErrorBoundary: this.resetErrorBoundary }}
      >
        {childToRender}
      </ErrorBoundaryContext.Provider>
    )
  }
}
