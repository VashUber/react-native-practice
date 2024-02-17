import { StatusBar } from 'expo-status-bar'
import React from 'react'

import { RootProvider } from '~/components/misc/RootProvider'
import { Main } from '~/main'

export default function App() {
  return (
    <RootProvider>
      <Main />

      <StatusBar style="auto" />
    </RootProvider>
  )
}
