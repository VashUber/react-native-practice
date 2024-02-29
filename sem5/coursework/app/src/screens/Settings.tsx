import { useMemo, useState } from 'react'
import { Button, StyleSheet, View, Text } from 'react-native'
import Picker from 'react-native-picker-select'
import { useDispatch, useSelector } from 'react-redux'

import { TextInputWithLabel } from '~/components/common/TextInputWithLabel'
import { songsMap } from '~/constants'
import { DefaultLayout } from '~/layout'
import { RootState } from '~/redux'
import { setSettings } from '~/redux/stores/settings'
import { setUser } from '~/redux/stores/user'
import { updateSettings } from '~/repo/query/settings'
import { updateUser } from '~/repo/query/users'
import { globalStyles } from '~/styles/global'

export const SettingsScreen = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.userReducer.user)
  const settings = useSelector((state: RootState) => state.settingsReducer.settings)
  const [name, setName] = useState(user!.name)
  const [rounds, setRounds] = useState(settings.rounds)
  const [breathsCount, setBreathsCount] = useState(settings.breathsCount)
  const [breathHolding, setBreathHolding] = useState(settings.breathHolding / 1000)
  const [airHolding, setAirHolding] = useState(settings.airHolding / 1000)
  const [music, setMusic] = useState(settings.music)

  const musicOptions = useMemo(() => {
    return Object.entries(songsMap).map(([key, value]) => {
      return {
        label: value.title,
        value: key
      }
    })
  }, [])

  const runUserUpdate = () => {
    const newUser = {
      ...user!,
      name
    }
    updateUser(newUser)
    dispatch(setUser(newUser))

    const newSettings = {
      ...settings,
      music,
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
        <View style={globalStyles['input-wrapper']}>
          <Text style={globalStyles['input-label']}>Музыка</Text>
          <Picker
            onValueChange={v => {
              if (!v || v === 'null') return
              setMusic(v)
            }}
            value={music}
            items={musicOptions}
            style={{
              inputAndroid: globalStyles.input,
              inputIOS: globalStyles.input
            }}
          />
        </View>

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
