import { PropsWithChildren } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  const insets = useSafeAreaInsets()

  return <View style={{ paddingTop: insets.top, flex: 1 }}>{children}</View>
}
