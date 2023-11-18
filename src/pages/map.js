import axios from 'axios'
import DefaultLayout from '../layouts/default'

import { getCurrentPositionAsync } from 'expo-location'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import citys from '../assets/data/citys.json'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal'

export default function Map () {
  const [location, setLocation] = useState(null)
  const [city, setCity] = useState(null)
  const [churchs, setChurchs] = useState([])
  const [modalVisibility, setModalVisibility] = useState(false)
  const [selectedChurchId, setSelectedChurchId] = useState(null)

  function toogleModalVisibility () {
    setModalVisibility(state => !state)
  }

  async function getLocation () {
    const currentLocation = await getCurrentPositionAsync()
    setLocation(currentLocation)

    return location
  }

  async function getCurrentCity () {
    const { latitude, longitude } = location.coords

    const response = await fetch(
      `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
    )
    const data = await response.json()
    setCity(data.address.town || null)
  }

  async function getNerbyChurchs (city) {
    const { latitude, longitude } = location.coords

    const response = await axios.post('https://www.diocesedesantos.com.br/horarios-das-missas', {
      latitude,
      longitude,
      format: 'json',
      task: 'search',
      filter_catid: city,
      searchzip: 'Sua Localização (Você)',
      limitstart: '10'
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    const { features } = response.data
    setChurchs(features)
  }

  function selectChunch (id) {
    if (id) {
      const church = churchs.find(church => church.id === id)
      console.log(church)
    }

    setSelectedChurchId(id)
    toogleModalVisibility()
  }

  useEffect(() => {
    getLocation()
  }, [])

  useEffect(() => {
    if (location) {
      getCurrentCity()
    }
  }, [location])

  useEffect(() => {
    if (location && city) {
      getNerbyChurchs(citys[city])
    }
  }, [location, city])

  console.log('location', location)
  console.log('city', city)

  if (!location || !city || churchs.length <= 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    )
  }

  return (
    <DefaultLayout>
      <View style={styles.container}>
        {location && (
          <MapView
            style={styles.maps}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }}
          >
            <Marker
              title='Você está aqui'
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              }}
            />
            {churchs.map((church) => {
              // /*, properties: { distance, icon, name, url } */
              const { id, geometry } = church

              return (
                <Marker
                  key={id}
                  onPress={() => selectChunch(id)}
                  onDeselect={() => selectChunch(null)}
                  coordinate={{
                    latitude: geometry.coordinates[1],
                    longitude: geometry.coordinates[0]
                  }}
                >
                  <MaterialIcon name='map-marker' size={45} color={selectedChurchId === id ? '#FFDC29' : '#3EC3FF'} />
                </Marker>
              )
            })}
          </MapView>
        )}

        <Modal
          onBackdropPress={() => selectChunch(null)}
          onSwipeComplete={this.close}
          swipeDirection={['up', 'left', 'right', 'down']}
          style={styles.view}
          isVisible={modalVisibility}
          backdropColor='transparent'
        >
          <View style={{ backgroundColor: '#000', height: 100 }}>
            <View style={styles.content}>
              <Text style={styles.contentTitle}>Hi 👋!</Text>
              <Button testID={'close-button'} onPress={() => selectChunch(null)} title="Close" />
            </View>
          </View>
        </Modal>
      </View>
    </DefaultLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%'
  },
  maps: {
    backgroundColor: '#FFF',
    flex: 1,
    width: '100%'
  },
  view: {
    justifyContent: 'flex-end',
    margin: 0
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12
  }
})
