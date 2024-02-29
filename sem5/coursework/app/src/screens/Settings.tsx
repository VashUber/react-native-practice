import { useState } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { TextInputWithLabel } from '~/components/common/TextInputWithLabel'
import { DefaultLayout } from '~/layout'
import { RootState } from '~/redux'
import { setSettings } from '~/redux/stores/settings'
import { setUser } from '~/redux/stores/user'
import { updateSettings } from '~/repo/query/settings'
import { updateUser } from '~/repo/query/users'

export const SettingsScreen = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.userReducer.user)
  const settings = useSelector((state: RootState) => state.settingsReducer.settings)
  const [name, setName] = useState(user!.name)
  const [rounds, setRounds] = useState(settings.rounds)
  const [breathsCount, setBreathsCount] = useState(settings.breathsCount)
  const [breathHolding, setBreathHolding] = useState(settings.breathHolding / 1000)
  const [airHolding, setAirHolding] = useState(settings.airHolding / 1000)

  const runUserUpdate = () => {
    const newUser = {
      ...user!,
      name
    }
    updateUser(newUser)
    dispatch(setUser(newUser))

    const newSettings = {
      ...settings,
      rounds,
      breathsCount,
      breathHolding: breathHolding * 1000,
      airHolding: airHolding * 1000
    }
    updateSettings(newSettings)
    dispatch(setSettings(newSettings))
  }

  return (
    <DefaultLayout>
      <View style={styles['settings-screen']}>
        <TextInputWithLabel label="Имя" value={name} onChangeText={setName} />
        <TextInputWithLabel
          label="Количество раундов"
          keyboardType="numeric"
          value={rounds.toString()}
          onChangeText={e => setRounds(Number(e))}
        />
        <TextInputWithLabel
          label="Количество вдохов"
          keyboardType="numeric"
          value={breathsCount.toString()}
          onChangeText={e => setBreathsCount(Number(e))}
        />
        <TextInputWithLabel
          label="Время задержки дыхания (в секундах)"
          keyboardType="numeric"
          value={breathHolding.toString()}
          onChangeText={e => setBreathHolding(Number(e))}
        />
        <TextInputWithLabel
          label="Время задержки дыхания с воздухом (в секундах)"
          keyboardType="numeric"
          value={airHolding.toString()}
          onChangeText={e => setAirHolding(Number(e))}
        />

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
