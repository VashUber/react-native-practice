import { ReactNode } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider as ReduxProvider } from 'react-redux'

import { store } from '~/redux'

export const RootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </SafeAreaProvider>
  )
}
