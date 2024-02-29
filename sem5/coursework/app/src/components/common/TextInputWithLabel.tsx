import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native'

import { globalStyles } from '~/styles/global'

type TextInputPropsT = {
  label: string
  value: string
  keyboardType?: KeyboardTypeOptions
  onChangeText: (v: string) => void
}

export const TextInputWithLabel = ({ label, ...rest }: TextInputPropsT) => {
  return (
    <View style={globalStyles['input-wrapper']}>
      <Text style={globalStyles['input-label']}>{label}</Text>
      <TextInput style={globalStyles.input} placeholder={label} {...rest} />
    </View>
  )
}
