import { useState } from 'react'
import { Button, StyleSheet, TextInput, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { DefaultLayout } from '~/layout'
import { RootState } from '~/redux'
import { setUser } from '~/redux/stores/user'
import { updateUser } from '~/repo/query/users'
import { globalStyles } from '~/styles/global'

export const SettingsScreen = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.userReducer.user)
  const [name, setName] = useState(user!.name)

  const runUserUpdate = async () => {
    await updateUser({
      ...user!,
      name
    })

    dispatch(
      setUser({
        ...user!,
        name
      })
    )
  }

  return (
    <DefaultLayout>
      <View style={styles['settings-screen']}>
        <TextInput style={globalStyles.input} placeholder="Имя" value={name} onChangeText={setName} />

        <Button title="Сохранить" onPress={runUserUpdate} />
      </View>
    </DefaultLayout>
  )
}

const styles = StyleSheet.create({
  'settings-screen': {
    flex: 1,
    gap: 10,
    paddingHorizontal: 20
  }
})
