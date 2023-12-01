import BottomSheet from '@gorhom/bottom-sheet'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { getApps } from 'react-native-map-link'

const BottonPopup = ({ children, church }) => {
  const [availableApps, updateAvailableApps] = useState([])
  const bottomSheetRef = useRef(null)

  const snapPoints = useMemo(() => !church ? ['20%'] : ['14%', '30%', '50%'], [church])

  useEffect(() => {
    if (!church) {
      bottomSheetRef.current.collapse()
      return
    }

    (async () => {
      const apps = await getApps({
        latitude: church.geometry.coordinates[1],
        longitude: church.geometry.coordinates[0],
        title: church.name,
        googleForceLatLon: true
      })
      updateAvailableApps(apps)
      bottomSheetRef.current.expand()
    })()
  }, [church])

  return (
    <View style={styles.container}>
      {children}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
      >
        <View style={styles.contentContainer}>
          {!church && (
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.name}>Selecione uma paróquia</Text>
              <Text style={{ ...styles.item, color: 'gray', textAlign: 'center' }}>Utilize o gesto de pinça para aproximar os marcadores das paróquias</Text>
            </View>
          )}
          {church && (
            <View style={{ paddingVertical: 12 }}>
              <ScrollView>
                <Text style={styles.name}>{church.name}</Text>
                <Text style={{ ...styles.item, marginBottom: 5 }}>Esta paróquia está a {church.distance} de você!</Text>
                <Text style={styles.itemTitle}>Como chegar:</Text>
                <View style={styles.directionContainer}>
                  {availableApps.map(({ icon, name, id, open }) => (
                    <Pressable style={styles.direction} key={id} onPress={open}>
                      <Image style={styles.icon} source={icon} />
                      <Text style={{ ...styles.item, marginTop: 5 }}>{name}</Text>
                    </Pressable>
                  ))}
                </View>
                <Text style={styles.itemTitle}>Horário(s) da(s) missa(s):</Text>
                {church.description.horario.map((horario) => <Text style={styles.item} key={horario}>{horario}</Text>)}
                <Text style={{ ...styles.itemTitle, marginTop: 16 }} >Endereço:</Text>
                <Text style={styles.item}>{church.description.endereco}</Text>
              </ScrollView>
            </View>
          )}
        </View>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center'
  },
  name: {
    color: '#000',
    fontFamily: 'Montserrat',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 30

  },
  item: {
    color: '#000',
    fontFamily: 'Montserrat',
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 15
  },
  itemTitle: {
    color: '#000',
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 30
  },
  icon: {
    width: 30,
    height: 30
  },
  direction: {
    alignItems: 'center',
    paddingVertical: 6
  },
  directionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 6
  }
})

export default BottonPopup
