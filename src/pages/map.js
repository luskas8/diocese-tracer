import DefaultLayout from '../layouts/default'

import { getCurrentPositionAsync } from 'expo-location'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

export default function Map () {
  const [location, setLocation] = useState(null)

  async function getLocation () {
    const currentLocation = await getCurrentPositionAsync()
    setLocation(currentLocation)

    return location
  }

  useEffect(() => {
    getLocation()
  }, [])

  if (!location) {
    return (
      <View style={styles.maps}>
        <Text>Carregando...</Text>
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
          </MapView>
        )}
      </View>
    </DefaultLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  maps: {
    backgroundColor: '#FFF',
    flex: 1,
    width: '100%'
  }
})
