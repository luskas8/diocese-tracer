import axios from 'axios'
import DefaultLayout from '../layouts/default'

import { getCurrentPositionAsync } from 'expo-location'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import citys from '../assets/data/citys.json'
import churchesJson from '../assets/data/churches.json'
import BottonPopup from '../components/BottonPopup'

export default function Map ({ route, navigation }) {
  const { cityParam } = route.params || null
  const [location, setLocation] = useState(null)
  const [city, setCity] = useState(cityParam)
  const [churches, setChurches] = useState([])
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

  async function getNearbyChurches (cidade) {
    const { latitude, longitude } = location.coords

    if (!cidade) {
      return
    }

    await axios.post('https://www.diocesedesantos.com.br/horarios-das-missas', {
      latitude,
      longitude,
      task: 'search',
      filter_catid: cidade,
      searchzip: 'Sua Localização (Você)',
      limitstart: '10'
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    const response = await axios.post('https://www.diocesedesantos.com.br/horarios-das-missas', {
      latitude,
      longitude,
      format: 'json',
      task: 'search',
      filter_catid: cidade,
      searchzip: 'Sua Localização (Você)',
      limitstart: '10'
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    const { features } = response.data
    let churches = []
    const deParaCitys = {
      60: 'Bertioga',
      57: 'Cubatão',
      58: 'Guarujá',
      61: 'Itanhaém',
      63: 'Mongaguá',
      62: 'Peruíbe',
      64: 'Praia Grande',
      59: 'Santos',
      56: 'São Vicente'
    }
    const cityInfo = churchesJson[deParaCitys[cidade]]

    if (!features || cidade === 59) {
      churches = Object.keys(cityInfo).map((id) => {
        const distance = Math.sqrt(Math.pow(((cityInfo[id].geometry.coordinates[0] - longitude)), 2) + Math.pow((cityInfo[id].geometry.coordinates[1] - latitude), 2))
        return {
          id,
          distance,
          ...cityInfo[id]
        }
      })
    } else {
      churches = features.map((church) => {
        const { id, properties: { name, distance } } = church

        return {
          id,
          ...cityInfo[id],
          distance,
          name
        }
      })
    }

    setChurches(churches)
  }

  function selectChurch (id) {
    if (id) {
      const church = churches.find(church => church.id === id)
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
      getNearbyChurches(city)
    }
  }, [location, city])

  const centerMap = useCallback(() => {
    if (churches) {
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
  }, [mapRef, churches])

  if (!location || !city || churches.length <= 0) {
    return (
      <View style={{ ...styles.container, alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#0000ff' />
        <Text style={{ ...styles.contentTitle, marginTop: 5 }}>Buscando pelas paróquias...</Text>
      </View>
    )
  }

  return (
    <DefaultLayout>
      <BottonPopup church={selectedChurch}>
        <View style={styles.container}>
          {location && (
            <MapView
              onMarkerDeselect={() => selectChurch(null)}
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
              {churches.map((church) => {
                const { id, geometry } = church

                if (id === 59 || id === 85) {
                  return null
                }

                return (
                  <Marker
                    key={id}
                    onPress={() => selectChurch(id)}
                    onDeselect={() => selectChurch(null)}
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
