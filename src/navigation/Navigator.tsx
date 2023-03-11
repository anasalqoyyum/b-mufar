import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainScreen } from '../screens/MainScreen'
import { HelpScreen } from '../screens/HelpScreen'
import { StatusBar } from 'react-native'
import { Audio } from 'expo-av'

export type RootStackParamList = {
  Main: undefined
  Help: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const Navigator = () => {
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require('../../assets/audio/mainBG.mp3'))
    await sound.playAsync()
  }

  useEffect(() => {
    playSound()
  })

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
      </Stack.Navigator>
      <StatusBar hidden />
    </NavigationContainer>
  )
}
