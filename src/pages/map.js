import axios from 'axios'
import DefaultLayout from '../layouts/default'

import { getCurrentPositionAsync } from 'expo-location'
import { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import citys from '../assets/data/citys.json'
import BottonPopup from '../components/BottonPopup'

export default function Map () {
  const [location, setLocation] = useState(null)
  const [city, setCity] = useState(null)
  const [churchs, setChurchs] = useState([])
  const [selectedChurchId, setSelectedChurchId] = useState(null)

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
    console.log('>>>>>>>>>>>>>>', city)
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

    if (!response.data.features) {
      await axios.post('https://www.diocesedesantos.com.br/horarios-das-missas', {
        latitude,
        longitude,
        // format: 'json',
        task: 'search',
        filter_catid: city,
        searchzip: 'Sua Localização (Você)',
        limitstart: '10'
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })

      const response3 = await axios.post('https://www.diocesedesantos.com.br/horarios-das-missas', {
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

      const { features } = response3.data
      setChurchs(features)
      return
    }

    const { features } = response.data
    setChurchs(features)
  }

  function selectChunch (id) {
    if (id) {
      const church = churchs.find(church => church.id === id)
      console.log(church)
    }

    setSelectedChurchId(id)
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
      console.log('buscando igrejas')
      getNerbyChurchs(citys[city])
    }
  }, [location, city])

  if (!location || !city || churchs.length <= 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    )
  }

  console.log('selectedChurchId', selectedChurchId)

  return (
    <DefaultLayout>
      <BottonPopup>
        <View style={styles.container}>
          {location && (
            <MapView
              onMarkerDeselect={() => selectChunch(null)}
              style={styles.maps}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.305,
                longitudeDelta: 0.305
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
                    onMarkerDeselect={() => console.log('AAAAAAA')}
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
        </View>
      </BottonPopup>
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
