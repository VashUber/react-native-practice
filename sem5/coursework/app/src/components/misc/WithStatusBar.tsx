import { StatusBar } from 'expo-status-bar'
import { PropsWithChildren } from 'react'

export const WithStatusBar = ({ children }: PropsWithChildren) => {
  return (
    <>
      <StatusBar style="auto" />

      {children}
    </>
  )
}
