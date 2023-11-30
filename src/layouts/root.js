import { StyleSheet, View } from 'react-native'

import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react'
import { StatusBarProvider } from '../contexts/StatusBar'

SplashScreen.preventAutoHideAsync()

// eslint-disable-next-line react/prop-types
export default function RootLayout ({ children }) {
  const [fontsLoaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat-Regular.otf')
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
    <StatusBarProvider>
      <View style={styles.children} onLayout={onLayoutRootView}>
        {children}
      </View>
    </StatusBarProvider>
  )
}

const styles = StyleSheet.create({
  children: {
    width: '100%',
    height: '100%'
  }
})
