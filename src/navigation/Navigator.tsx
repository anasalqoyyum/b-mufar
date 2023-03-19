import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainScreen } from '../screens/MainScreen'
import { HelpScreen } from '../screens/HelpScreen'
import { StatusBar } from 'react-native'
import { MusicButton } from '../components/MusicButton/MusicButton'
import { StudyMenuScreen } from '../screens/StudyScreens/MenuScreen'
import { MaterialSelectScreen } from '../screens/StudyScreens/MenuScreen/MaterialSelect'
import { MaterialType } from '../screens/StudyScreens/MenuScreen/MaterialConstant'
import { StudyCardScreen } from '../screens/StudyScreens/CardScreen'
import { MemoryGameScreen } from '../screens/MemoryGameScreen'
import { GameSelectScreen } from '../screens/GameSelectScreen'
import { LevelSelectScreen } from '../screens/LevelSelectScreen'
import { MaterialId } from '../constants/Models/Lesson'
import { MatchGameScreen } from '../screens/MatchGameScreen'

export type RootStackParamList = {
  Main: undefined
  Help: undefined
  StudyMenu: undefined
  MaterialSelect: { materialId: MaterialId }
  StudyCardScreen: { materialTheme: MaterialType }
  MemoryGame: { materialId: MaterialId }
  MatchGame: { materialId: MaterialId }
  GameSelect: undefined
  LevelSelect: { gameType: 'memory' | 'match' }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="StudyMenu" component={StudyMenuScreen} />
        <Stack.Screen name="MaterialSelect" component={MaterialSelectScreen} />
        <Stack.Screen name="GameSelect" component={GameSelectScreen} />
        <Stack.Screen name="LevelSelect" component={LevelSelectScreen} />
        <Stack.Screen name="StudyCardScreen" component={StudyCardScreen} />
        <Stack.Screen name="MemoryGame" component={MemoryGameScreen} />
        <Stack.Screen name="MatchGame" component={MatchGameScreen} />
      </Stack.Navigator>
      <MusicButton />
      <StatusBar hidden />
    </NavigationContainer>
  )
}
