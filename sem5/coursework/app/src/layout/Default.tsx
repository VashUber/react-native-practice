import { ReactNode } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  const insets = useSafeAreaInsets()

  return <View style={{ paddingTop: insets.top }}>{children}</View>
}
