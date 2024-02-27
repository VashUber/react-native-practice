import { NavigationContainer } from '@react-navigation/native'
import { ReactNode } from 'react'
import { Provider as ReduxProvider } from 'react-redux'

import { store } from '~/redux'

export const RootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <NavigationContainer>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </NavigationContainer>
  )
}
