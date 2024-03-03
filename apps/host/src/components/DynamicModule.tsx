import { lazy, memo, Suspense, useMemo } from 'react'
import { Skeleton } from '@chakra-ui/react'

import { ErrorBoundary, useErrorBoundaryContext } from './ErrorBoundry'

import type { ErrorBoundaryPropsWithFallback } from './ErrorBoundry'
import type { ReactNode } from 'react'

interface DynamicModuleProps extends DynamicModuleImporterProps {
  errorFallback?: ErrorBoundaryPropsWithFallback['fallback']
}

export const DynamicModule = memo(
  ({ errorFallback = <ErrorInfo />, ...importerProps }: DynamicModuleProps) => (
    <ErrorBoundary fallback={errorFallback}>
      <DynamicModuleImporter {...importerProps} />
    </ErrorBoundary>
  ),
)

DynamicModule.displayName = 'DynamicModule'

interface DynamicModuleImporterProps {
  loadingFallback?: ReactNode
  path: string
  props?: Record<PropertyKey, unknown>
}

export const DynamicModuleImporter = ({
  loadingFallback = <Skeleton h="100%" />,
  path,
  props,
}: DynamicModuleImporterProps) => {
  const jsPath = `/${path}.js`
  const ModuleComponent = useMemo(() => lazy(() => import(/* @vite-ignore */ jsPath)), [jsPath])

  return (
    <Suspense fallback={loadingFallback}>
      <ModuleComponent {...props} />
    </Suspense>
  )
}

const ErrorInfo = () => {
  const { error } = useErrorBoundaryContext()
  return (
    <details>
      <summary>Error</summary>
      {error?.message}
    </details>
  )
}
