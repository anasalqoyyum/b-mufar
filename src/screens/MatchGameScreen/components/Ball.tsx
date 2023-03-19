import React, { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

export const Ball = () => {
  const start = useSharedValue({ x: 0, y: 0 })
  const isPressed = useSharedValue(false)
  const offset = useSharedValue({ x: 0, y: 0 })

  const gesture = useMemo(
    () =>
      Gesture.Pan()
        .onBegin(() => {
          isPressed.value = true
        })
        .onUpdate(e => {
          offset.value = {
            x: e.translationX + start.value.x,
            y: e.translationY + start.value.y
          }
        })
        .onEnd(() => {
          offset.value = {
            x: start.value.x,
            y: start.value.y
          }
        })
        .onFinalize(() => {
          isPressed.value = false
        }),
    []
  )

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(offset.value.x) },
        { translateY: withSpring(offset.value.y) },
        { scale: withSpring(isPressed.value ? 1.2 : 1) }
      ],
      backgroundColor: isPressed.value ? 'yellow' : 'blue'
    }
  })

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.ball, animatedStyles]} />
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'blue',
    alignSelf: 'center',
    zIndex: 100
  }
})
