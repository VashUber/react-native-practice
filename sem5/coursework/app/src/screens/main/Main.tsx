import { Audio } from 'expo-av'
import { useEffect, useState } from 'react'
import { Button } from 'react-native'

import { DefaultLayout } from '~/layout'

export const MainScreen = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null)

  const playAudio = async () => {
    const { default: audio } = await import('~/assets/songs/calming.mp3')
    const { sound: s } = await Audio.Sound.createAsync(audio)
    setSound(s)
    s.playAsync()
  }

  const stopAudio = () => {
    sound?.stopAsync()
  }

  useEffect(() => {
    if (sound) {
      return () => {
        sound.unloadAsync()
      }
    }
  }, [sound])

  return (
    <DefaultLayout>
      <Button onPress={playAudio} title="Play audio" />
      <Button onPress={stopAudio} title="Stop audio" />
    </DefaultLayout>
  )
}
