import { Picker } from '@react-native-picker/picker'
import { requestForegroundPermissionsAsync } from 'expo-location'
import { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View, Platform } from 'react-native'
import citys from '../assets/data/citys.json'
import DefaultLayout from '../layouts/default'
import Icon from 'react-native-vector-icons/Entypo'

export default function MainPanel ({ navigation: { navigate } }) {
  const [selectedCity, setSelectedCity] = useState()

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
          <Pressable style={{ ...styles.button, backgroundColor: '#00b06a' }} onPress={() => navigate('Mapa', { cityParam: null })}>
            <Icon name='location-pin' size={24} color='#FFF' />
            <Text style={{ ...styles.text, textTransform: 'uppercase' }}>usar minha localização</Text>
          </Pressable>
          <View>
            <Image source={require('../assets/images/splitter.png')} />
          </View>
          <Text style={styles.paragraph}>Selecione uma cidade</Text>
          <Picker
            style={Platform.OS === 'ios' ? styles.selectIOS : styles.select}
            selectedValue={selectedCity}
            onValueChange={(itemValue) =>
              setSelectedCity(itemValue)
            }
          >
            <Picker.Item label='Selecione uma cidade' value='' />
            {Object.keys(citys).map((city) => {
              return <Picker.Item key={city} label={city} value={citys[city]} />
            })}
          </Picker>
          <Pressable style={{ ...styles.button, alignSelf: 'center' }} onPress={() => navigate('Mapa', { cityParam: selectedCity === '' ? null : selectedCity })}>
            <Icon name='magnifying-glass' size={20} color='#FFF' />
            <Text style={styles.text}>Buscar paróquias</Text>
          </Pressable>
        </View>
        <Pressable style={styles.hint} onPress={() => navigate('Tutorial')}>
          <Icon name='help-with-circle' size={20} color='rgba(255, 255, 255, 0.5)' />
          <Text style={{ ...styles.text, color: 'rgba(255, 255, 255, 0.5)' }}>Como utilizar o aplicativo?</Text>
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
    backgroundColor: '#3F88EF',
    flexDirection: 'row',
    gap: 8
  },
  paragraph: {
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 30,
    letterSpacing: 0.84,
    paddingBottom: 8
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
    lineHeight: 25
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
    backgroundColor: 'rgba(200, 200, 200, 0.15)',
    flexDirection: 'row',
    gap: 8
  },
  select: {
    color: '#000',
    backgroundColor: '#FFF',
    borderRadius: 2,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 16
  },
  selectIOS: {
    color: '#000',
    backgroundColor: '#FFF',
    borderRadius: 2,
    paddingHorizontal: 6,
    marginBottom: 16
  }
})
