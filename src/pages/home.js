import { Picker } from '@react-native-picker/picker'
import { requestForegroundPermissionsAsync } from 'expo-location'
import { useEffect } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import DefaultLayout from '../layouts/default'
import citys from '../assets/data/citys.json'

export default function MainPanel ({ navigation: { navigate } }) {
  async function requestLocationPermission () {
    const { granted } = await requestForegroundPermissionsAsync()

    if (!granted) {
      alert('Permissão de localização necessário para o funcionamento do aplicativo')
    }
  }

  useEffect(() => {
    requestLocationPermission()
  }, [])

  return (
    <DefaultLayout>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Encontre a paróquia mais próxima!</Text>
          <Text style={styles.subtitle}>Você pode achar todas as paróquias da Baixada Santista</Text>
        </View>
        <View style={styles.localizationView}>
          <Pressable style={styles.button} onPress={() => navigate('Mapa')}>
            <Text style={{ ...styles.text, textTransform: 'uppercase' }}>localizar-me</Text>
          </Pressable>
          <View>
            <Text style={styles.middleView}>ou</Text>
          </View>
          <TextInput
            style={styles.inputText}
            placeholder='Digite um local'
          />
          <Picker>
            <Picker.Item label='Selecione uma cidade' value='' />
            {Object.keys(citys).map((city) => {
              return <Picker.Item key={city} label={city} value={citys[city]} />
            })}
          </Picker>
        </View>
        <Pressable style={styles.hint} onPress={() => navigate('Tutorial')}>
          <Text style={styles.text}>Dúvidas</Text>
        </Pressable>
      </View>
    </DefaultLayout>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white'
  },
  container: {
    paddingVertical: 22,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#3F88EF'
  },
  title: {
    paddingHorizontal: 16,
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Montserrat',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 30,
    letterSpacing: 0.84
  },
  subtitle: {
    paddingHorizontal: 8,
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Montserrat',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 25//,
    // letterSpacing: -0.24
  },
  localizationView: {
    paddingVertical: 32,
    paddingHorizontal: 40,
    backgroundColor: 'rgba(101, 158, 237, 0.60)',
    borderRadius: 2
  },
  middleView: {
    borderRadius: 100,
    backgroundColor: '#616D7C',
    marginVertical: 24,
    width: 25,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
    color: '#FFF'
  },
  inputText: {
    backgroundColor: '#FFF',
    flexShrink: 0,
    color: '#757575',
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24
  },
  hint: {
    marginTop: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#3F88EF'
  }
})
