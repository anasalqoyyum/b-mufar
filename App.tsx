import * as ScreenOrientation from 'expo-screen-orientation'
import { NativeBaseProvider } from 'native-base'
import { Navigator } from './src/navigation/Navigator'

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)

export default function App() {
  return (
    <NativeBaseProvider>
      <Navigator />
    </NativeBaseProvider>
  )
}
