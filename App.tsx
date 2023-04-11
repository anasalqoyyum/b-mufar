import * as ScreenOrientation from 'expo-screen-orientation'
import * as NavigationBar from 'expo-navigation-bar'
import { NativeBaseProvider } from 'native-base'
import { Navigator } from './src/navigation/Navigator'
import { Provider } from 'react-redux'
import { store } from './src/store/Store'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { useCallback } from 'react'

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
NavigationBar.setVisibilityAsync('hidden')
SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    'Traditional Arabic': require('./assets/fonts/trado.ttf'),
    'Traditional Arabic Bold': require('./assets/fonts/tradbdo.ttf'),
    'traditional-arabic': require('./assets/fonts/traditional-arabic.ttf')
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Navigator onReady={onLayoutRootView} />
      </NativeBaseProvider>
    </Provider>
  )
}
