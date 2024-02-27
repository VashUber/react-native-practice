import Icon from '@expo/vector-icons/Ionicons'
import { useLayoutEffect, useRef } from 'react'
import { TouchableOpacity, StyleSheet, Animated, View } from 'react-native'
import Svg, { Circle } from 'react-native-svg'

import { exhalationTime, inhaleTime } from '~/constants'
import { StageI } from '~/models/training'

type ButtonPropsT = {
  onPress: () => void
  onStageDone: () => void
  stage?: StageI
  type: 'inprogress' | 'chill'
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)
const circumference = Math.PI * 2 * 100

export const Button = ({ onPress, onStageDone, stage, type }: ButtonPropsT) => {
  const strokeDashoffsetAnimate = useRef(new Animated.Value(0)).current
  const scaleAnimate = useRef(new Animated.Value(1)).current

  useLayoutEffect(() => {
    const clear = () => {
      strokeDashoffsetAnimate.resetAnimation()
      scaleAnimate.resetAnimation()
    }

    if (!stage) return clear

    const dashoffsetAnimation = Animated.timing(strokeDashoffsetAnimate, {
      toValue: -circumference,
      duration: stage.time,
      useNativeDriver: true
    })
    dashoffsetAnimation.start(a => {
      if (!a.finished) return

      onStageDone()
    })

    let scaleAnimation: Animated.CompositeAnimation

    switch (stage.type) {
      case 'breathing':
        scaleAnimation = Animated.loop(
          Animated.sequence([
            Animated.timing(scaleAnimate, {
              toValue: 1.25,
              duration: inhaleTime,
              useNativeDriver: false
            }),
            Animated.timing(scaleAnimate, {
              toValue: 1,
              duration: exhalationTime,
              useNativeDriver: false
            })
          ])
        )
        break
      case 'breath-holding':
        scaleAnimation = Animated.timing(scaleAnimate, {
          toValue: 1,
          useNativeDriver: false
        })
        break
      case 'air-holding':
        scaleAnimation = Animated.loop(
          Animated.sequence([
            Animated.timing(scaleAnimate, {
              toValue: 1.35,
              duration: exhalationTime,
              useNativeDriver: false
            }),
            Animated.timing(scaleAnimate, {
              toValue: 1,
              duration: exhalationTime,
              useNativeDriver: false,
              delay: stage.time - inhaleTime - exhalationTime
            })
          ]),
          {
            iterations: 1
          }
        )
        break
    }

    scaleAnimation.start()

    return clear
  }, [stage])

  return (
    <AnimatedTouchable
      style={{
        ...styles.button,
        transform: [
          {
            scale: scaleAnimate
          }
        ]
      }}
      activeOpacity={0.25}
      onPress={onPress}>
      <View
        style={{
          transform: [{ rotate: '-90deg' }]
        }}>
        <Svg height={210} width={210} viewBox="0 0 210 210">
          <AnimatedCircle
            cx={105}
            cy={105}
            r={100}
            stroke="#3494ed"
            strokeWidth={10}
            fill="none"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffsetAnimate}
          />
        </Svg>
      </View>
      <Icon name={type === 'chill' ? 'caret-forward' : 'refresh-outline'} size={50} color="#fff" style={styles.icon} />
    </AnimatedTouchable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 210,
    height: 210,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: '#0c8bcf',
    borderRadius: 999,
    backgroundColor: '#0077B6'
  },
  icon: {
    position: 'absolute',
    alignSelf: 'center'
  }
})
