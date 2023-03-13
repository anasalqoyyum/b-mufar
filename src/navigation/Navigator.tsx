import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainScreen } from '../screens/MainScreen'
import { HelpScreen } from '../screens/HelpScreen'
import { StatusBar } from 'react-native'

export type RootStackParamList = {
  Main: undefined
  Help: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const Navigator = () => {
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
