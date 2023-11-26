import BottomSheet from '@gorhom/bottom-sheet'
import React, { useMemo, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const BottonPopup = ({ children, chunch }) => {
  // ref
  const bottomSheetRef = useRef(null)

  // variables
  const snapPoints = useMemo(() => ['15%', '30%', '50%'], [])

  // callbacks
  // const handleSheetChanges = useCallback((index) => {
  //   if (!chunch) return
  //   console.log('handleSheetChanges', index)
  // }, [])

  // renders
  return (
    <View style={styles.container}>
      {children}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={!chunch ? ['15%'] : snapPoints}
        // onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          {!chunch && (
            <Text>Selecione uma paróquia</Text>
          )}
          {chunch && (
            <View>
              <Text style={styles.name}>{chunch.name} - {chunch.distance}</Text>
              <Text style={styles.itemTitle}>Horários:</Text>
              {chunch.description.horario.map((horario) => <Text style={styles.item} key={horario}>{horario}</Text>)}
              <Text style={{ ...styles.itemTitle, marginTop: 16 }} >Endereço:</Text>
              <Text style={styles.item}>{chunch.description.endereco}</Text>
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
  }
})

export default BottonPopup
