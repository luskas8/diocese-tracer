import axios from 'axios'
import DefaultLayout from '../layouts/default'

import { getCurrentPositionAsync } from 'expo-location'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import citys from '../assets/data/citys.json'
import chunches from '../assets/data/chunches.json'
import BottonPopup from '../components/BottonPopup'

export default function Map ({ route, navigation }) {
  const { cityParam } = route.params || null
  const [location, setLocation] = useState(null)
  const [city, setCity] = useState(cityParam)
  const [churchs, setChurchs] = useState([])
  const [selectedChurch, setSelectedChurch] = useState(null)
  const mapRef = useRef(null)

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
    setCity(citys[data.address.town] || null)
  }

  async function getNerbyChurchs (city) {
    const { latitude, longitude } = location.coords

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

    const churchs = features.map((church) => {
      const { id, properties: { name, distance } } = church

      return {
        id,
        ...chunches[id],
        distance,
        name
      }
    })

    setChurchs(churchs)
  }

  async function selectChunch (id) {
    if (id) {
      const church = churchs.find(church => church.id === id)
      setSelectedChurch(church)
    } else {
      setSelectedChurch(null)
    }
  }

  useEffect(() => {
    getLocation()
  }, [])

  useEffect(() => {
    if (location && !city) {
      getCurrentCity()
    }
  }, [location])

  useEffect(() => {
    if (location && city) {
      // console.log('buscando igrejas')
      getNerbyChurchs(city)
    }
  }, [location, city])

  const centerMap = useCallback(() => {
    if (churchs) {
      setTimeout(() => {
        mapRef.current?.fitToElements({
          animated: true,
          edgePadding: {
            bottom: 50,
            left: 50,
            right: 50,
            top: 50
          }
        })
      }, 10)
    }
  }, [mapRef, churchs])

  if (!location || !city || churchs.length <= 0) {
    return (
      <View style={{ ...styles.container, alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#0000ff' />
        <Text style={{ ...styles.contentTitle, marginTop: 5 }}>Buscando pelas paróquias...</Text>
      </View>
    )
  }

  // console.log('selectedChurchId', selectedChurch)

  return (
    <DefaultLayout>
      <BottonPopup chunch={selectedChurch}>
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
              ref={mapRef}
              onMapReady={centerMap}
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
                    <MaterialIcon name='map-marker' size={45} color={selectedChurch && selectedChurch.id === id ? '#FFDC29' : '#3EC3FF'} />
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
