import { Audio, Video, ResizeMode } from 'expo-av'
import { useEffect, useMemo, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Button } from '~/components/main/training/Button'
import { exhalationTime, inhaleTime } from '~/constants'
import { StageI } from '~/models/training'

const stages: StageI[] = [
  {
    title: '30 вдохов',
    type: 'breathing',
    time: (inhaleTime + exhalationTime) * 10
  },
  {
    title: 'задержка дыхания',
    type: 'breath-holding',
    time: 60 * 1000
  },
  {
    title: 'задержка воздуха',
    type: 'air-holding',
    time: 15 * 1000 + inhaleTime + exhalationTime
  }
]

export const MainScreen = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null)
  const [type, setType] = useState<'inprogress' | 'chill'>('chill')
  const [currentStagePointer, setCurrentStagePointer] = useState(-1)
  const currentStage = useMemo(() => stages[currentStagePointer], [currentStagePointer])

  const insets = useSafeAreaInsets()

  const toggleTraining = async () => {
    if (!sound) return

    const status = await sound.getStatusAsync()
    if (!status.isLoaded) {
      return
    }

    if (type === 'inprogress') {
      await sound.stopAsync()
      setCurrentStagePointer(-1)
      setType('chill')
    } else {
      sound.playAsync()
      setType('inprogress')
      setCurrentStagePointer(0)
    }
  }

  const onStageDone = () => {
    if (currentStagePointer === stages.length - 1) {
      //проверка сколько раундов
      setCurrentStagePointer(0)
      return
    }

    setCurrentStagePointer(prev => prev + 1)
  }

  useEffect(() => {
    const setupSound = async () => {
      const { default: audio } = await import('~/assets/songs/calming.mp3')
      const { sound: s } = await Audio.Sound.createAsync(audio)
      setSound(s)
    }

    setupSound()
  }, [])

  useEffect(() => {
    if (sound) {
      return () => {
        sound.unloadAsync()
      }
    }
  }, [sound])

  return (
    <>
      <Video
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
        }}
        resizeMode={ResizeMode.COVER}
        isLooping
        isMuted
        shouldPlay
      />

      <View style={{ ...styles['main-screen'], paddingTop: insets.top }}>
        <Text style={styles['main-screen__title']}>{currentStage?.title}</Text>

        <View style={styles['main-screen__button-wrapper']}>
          <Button onPress={toggleTraining} onStageDone={onStageDone} stage={currentStage} type={type} />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  'main-screen': {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  'main-screen__button-wrapper': {
    marginBottom: 'auto'
  },
  'main-screen__title': {
    color: '#fff',
    fontSize: 25,
    height: 28,
    fontWeight: '700',
    marginBottom: 'auto'
  }
})
