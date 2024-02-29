import { useState } from 'react'
import { TextInput, Text, Button, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'

import { DefaultLayout } from '~/layout'
import { setUser } from '~/redux/stores/user'
import { createSettings } from '~/repo/query/settings'
import { createUser, getUser } from '~/repo/query/users'
import { globalStyles } from '~/styles/global'

export const RegistrationScreen = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')

  const runRegistration = async () => {
    await createUser({
      name
    })
    await createSettings()
    const user = await getUser()
    if (user) {
      dispatch(setUser(user))
    }
  }

  return (
    <DefaultLayout>
      <View style={styles['registration-screen']}>
        <Text style={styles['registration-screen__title']}>Регистрация</Text>
        <TextInput style={globalStyles.input} placeholder="Имя" value={name} onChangeText={setName} />

        <Button title="Войти" onPress={runRegistration} />
      </View>
    </DefaultLayout>
  )
}

const styles = StyleSheet.create({
  'registration-screen': {
    flex: 1,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  'registration-screen__title': {}
})
