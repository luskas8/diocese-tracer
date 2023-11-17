import { ImageBackground, StyleSheet, View } from 'react-native'

import backgroundImage from '../assets/images/diocese_icon.png'
import { StatusBarProvider } from '../contexts/StatusBar'
import { useCallback } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

// eslint-disable-next-line react/prop-types
export default function DefaultLayout ({ children }) {
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
    <StatusBarProvider style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.image} resizeMode='contain' />
      <View style={styles.children} onLayout={onLayoutRootView}>
        {children}
      </View>
    </StatusBarProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  image: {
    flex: 1,
    opacity: 0.2
  },
  children: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
})
