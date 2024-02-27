import React from 'react'

import { RootProvider } from '~/components/provider/RootProvider'
import { Main } from '~/main'

export default function App() {
  return (
    <RootProvider>
      <Main />
    </RootProvider>
  )
}
