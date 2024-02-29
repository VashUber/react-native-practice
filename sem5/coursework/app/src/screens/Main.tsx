import { Audio, Video, ResizeMode } from 'expo-av'
import { useEffect, useMemo, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

import { Button } from '~/components/main/training/Button'
import { songsMap } from '~/constants'
import { RootState } from '~/redux'

export const MainScreen = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null)
  const [videoSource, setVideoSource] = useState(null!)
  const [type, setType] = useState<'not-stared' | 'inprogress'>('not-stared')
  const [currentStagePointer, setCurrentStagePointer] = useState(-1)
  const [currentRoundsCount, setCurrentRoundsCount] = useState(1)
  const stages = useSelector((state: RootState) => state.settingsReducer.stages)
  const rounds = useSelector((state: RootState) => state.settingsReducer.settings.rounds)
  const music = useSelector((state: RootState) => state.settingsReducer.settings.music)
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
      setType('not-stared')
    } else {
      sound.playAsync()
      setType('inprogress')
      setCurrentStagePointer(0)
    }
  }

  const onStageDone = () => {
    if (currentStagePointer < stages.length - 1) {
      setCurrentStagePointer(prev => prev + 1)

      return
    }

    setCurrentRoundsCount(prev => prev + 1)
    if (currentRoundsCount < rounds) {
      setCurrentStagePointer(0)
    } else {
      setCurrentStagePointer(-1)
      setCurrentRoundsCount(1)
      sound?.stopAsync()
      setType('not-stared')
    }
  }

  useEffect(() => {
    const setupSound = async () => {
      const { default: audio } = await songsMap[music].src
      const { sound: s } = await Audio.Sound.createAsync(audio)
      s.setIsLoopingAsync(true)
      setSound(s)
    }

    const setupVideo = async () => {
      const { default: video } = await import('~/assets/background/gradient.mp4')
      setVideoSource(video)
    }

    setupVideo()
    setupSound()
  }, [])

  useEffect(() => {
    if (!sound) return

    return () => {
      sound.unloadAsync()
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
        source={videoSource}
        resizeMode={ResizeMode.COVER}
        isLooping
        isMuted
        shouldPlay
      />

      <View style={{ ...styles['main-screen'], paddingTop: insets.top }}>
        <Text style={styles['main-screen__title']}>
          {currentStage?.type === 'chill' && currentRoundsCount === rounds
            ? 'Вы успешно справились!'
            : currentStage?.title}
        </Text>

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
    alignItems: 'center'
  },
  'main-screen__button-wrapper': {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%'
  },
  'main-screen__title': {
    color: '#fff',
    paddingHorizontal: 20,
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    width: '100%'
  }
})
