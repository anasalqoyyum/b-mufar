import * as ScreenOrientation from 'expo-screen-orientation'
import * as NavigationBar from 'expo-navigation-bar'
import { NativeBaseProvider } from 'native-base'
import { Navigator } from './src/navigation/Navigator'

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
NavigationBar.setVisibilityAsync('hidden')

export default function App() {
  return (
    <NativeBaseProvider>
      <Navigator />
    </NativeBaseProvider>
  )
}
