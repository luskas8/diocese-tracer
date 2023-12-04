import { Pressable, StyleSheet, Text, View } from 'react-native'
import DefaultLayout from '../layouts/default'

export default function MainPanel ({ navigation: { navigate } }) {
  return (
    <DefaultLayout>
      <View style={styles.container}>
        <Text style={styles.title}>DioceseMap</Text>
        <Text style={styles.subtitle}>Encontre paróquias próximas de você!</Text>
        <Pressable style={styles.button} onPress={() => navigate('Home')}>
          <Text style={{ color: '#ffffff' }}>Começar</Text>
        </Pressable>
      </View>
    </DefaultLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1.74
  },
  subtitle: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: '400',
    color: '#FDFEEE',
    letterSpacing: 0.88,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#3F88EF',
    width: 200,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  }
})
