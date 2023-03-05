import * as ScreenOrientation from 'expo-screen-orientation'
import { Navigator } from './src/navigation/Navigator'

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)

export default function App() {
  return <Navigator />
}
