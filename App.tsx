import * as ScreenOrientation from 'expo-screen-orientation'
import * as NavigationBar from 'expo-navigation-bar'
import { NativeBaseProvider } from 'native-base'
import { Navigator } from './src/navigation/Navigator'
import { Provider } from 'react-redux'
import { store } from './src/store/Store'

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
NavigationBar.setVisibilityAsync('hidden')

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Navigator />
      </NativeBaseProvider>
    </Provider>
  )
}
