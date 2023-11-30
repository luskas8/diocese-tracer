import BottomSheet from '@gorhom/bottom-sheet'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { getApps } from 'react-native-map-link'

const BottonPopup = ({ children, church }) => {
  const [availableApps, updateAvailableApps] = useState([])
  // ref
  const bottomSheetRef = useRef(null)

  // variables
  const snapPoints = useMemo(() => ['15%', '30%', '50%'], [])

  // callbacks
  // const handleSheetChanges = useCallback((index) => {
  //   if (!church) return
  //   console.log('handleSheetChanges', index)
  // }, [])

  useEffect(() => {
    if (!church) {
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
    })()
  }, [church])

  // renders
  return (
    <View style={styles.container}>
      {children}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={!church ? ['15%'] : snapPoints}
        // onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          {!church && (
            <Text style={styles.name}>Selecione uma paróquia</Text>
          )}
          {church && (
            <View>
              <Text style={styles.name}>{church.name} - {church.distance}</Text>
              <Text style={styles.itemTitle}>Como chegar:</Text>
              <View style={styles.directionContainer}>
                {availableApps.map(({ icon, name, id, open }) => (
                  <Pressable style={styles.direction} key={id} onPress={open}>
                    <Image style={styles.icon} source={icon} />
                    <Text style={{ ...styles.item, marginTop: 5 }}>{name}</Text>
                  </Pressable>
                ))}
              </View>
              <Text style={styles.itemTitle}>Horários:</Text>
              {church.description.horario.map((horario) => <Text style={styles.item} key={horario}>{horario}</Text>)}
              <Text style={{ ...styles.itemTitle, marginTop: 16 }} >Endereço:</Text>
              <Text style={styles.item}>{church.description.endereco}</Text>
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
    lineHeight: 60

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
