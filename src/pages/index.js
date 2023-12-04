import { createStackNavigator } from '@react-navigation/stack'

import { Image, Pressable, StyleSheet, View } from 'react-native'
import AntIcon from 'react-native-vector-icons/AntDesign'
import InitialPage from './initial'
import HomePage from './home'
import MapPage from './map'
import TutorialPage from './tutorial'

const Stack = createStackNavigator()

export function MainStack () {
  const headerOptions = {
    headerTitleStyle: styles.headertitle,
    headerStyle: styles.header,
    headerTitle: 'Diocese de Santos',
    headerShadowVisible: false
  }

  return (
    <Stack.Navigator initialRouteName='Initial'>
      <Stack.Screen name="Initial" component={InitialPage} options={{ ...headerOptions, headerTitleAlign: 'center' }} />
      <Stack.Screen name="Home" component={HomePage} options={{ ...headerOptions, headerTitleAlign: 'center', headerLeft: HomeButoon }} />
      <Stack.Screen name="Tutorial" component={TutorialPage} options={{ ...headerOptions, headerTitle: 'Como usar o aplicativo', headerLeft: BackButoon }} />
      <Stack.Screen name="Mapa" component={MapPage} options={{ headerBackTitle: 'Voltar' }} />
    </Stack.Navigator>
  )
}

function HomeButoon (props) {
  return <View style={styles.backButtom}>
    <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={props.onPress}>
      <Image source={require('../assets/images/diocese_icon.png')} style={styles.icon} />
    </Pressable>
  </View>
}

function BackButoon (props) {
  return <View style={styles.backButtom}>
    <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={props.onPress}>
      <AntIcon name='arrowleft' size={30} color="#FFF" />
    </Pressable>
  </View>
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#367BC1'
  },
  homeButtom: {
    width: 60,
    height: 60,
    padding: 8,
    flex: 1,
    justifyContent: 'center'
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
  headertitle: {
    color: '#FFF',
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 60
  }
})
