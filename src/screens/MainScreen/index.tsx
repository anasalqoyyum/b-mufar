import { NativeStackScreenProps } from '@react-navigation/native-stack'
import * as React from 'react'
import { View, Text, Button } from 'react-native'
import { RootStackParamList } from '../../navigation/Navigator'

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>

export const MainScreen = ({ navigation }: Props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>اَلتَّعَارُفُ</Text>
      <Button title="Go to Help" onPress={() => navigation.navigate('Help')} />
    </View>
  )
}
