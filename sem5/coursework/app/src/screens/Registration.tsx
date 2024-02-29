import { useState } from 'react'
import { Text, Button, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'

import { TextInputWithLabel } from '~/components/common/TextInputWithLabel'
import { DefaultLayout } from '~/layout'
import { setSettings } from '~/redux/stores/settings'
import { setUser } from '~/redux/stores/user'
import { createSettings, getSettings } from '~/repo/query/settings'
import { createUser, getUser } from '~/repo/query/users'

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
    dispatch(setSettings(await getSettings()))
  }

  return (
    <DefaultLayout>
      <View style={styles['registration-screen']}>
        <Text style={styles['registration-screen__title']}>Регистрация</Text>
        <TextInputWithLabel value={name} label="Имя" onChangeText={setName} />

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
