import { createStackNavigator } from '@react-navigation/stack'

import { Image, Pressable, StyleSheet } from 'react-native'
import HomePage from './home'
import MapPage from './map'
import TutorialPage from './tutorial'

const Stack = createStackNavigator()

export function MainStack () {
  const headerOptions = {
    headerTitleStyle: styles.title,
    headerStyle: styles.header,
    headerTitle: 'Diocese de Santos',
    headerShadowVisible: false
  }

  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home" component={HomePage} options={{ ...headerOptions, headerLeft: HomeButoon }} />
      <Stack.Screen name="Tutorial" component={TutorialPage} options={{ ...headerOptions, headerLeft: HomeButoon }} />
      <Stack.Screen name="Mapa" component={MapPage} />
    </Stack.Navigator>
  )
}

function HomeButoon (props) {
  return <Pressable style={styles.backButtom} onPress={props.onPress}>
    <Image source={require('../assets/images/diocese_icon.png')} style={styles.icon} />
  </Pressable>
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#367BC1'
  },
  backButtom: {
    width: 60,
    height: 60,
    padding: 8,
    flex: 1,
    justifyContent: 'center'
  },
  icon: {
    width: '100%',
    height: '100%',
    alignSelf: 'center'
  },
  title: {
    color: '#FFF',
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 60
  }
})
