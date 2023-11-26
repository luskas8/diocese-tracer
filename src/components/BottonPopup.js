import React, { useCallback, useMemo, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'

const BottonPopup = ({ children }) => {
  // ref
  const bottomSheetRef = useRef(null)

  // variables
  const snapPoints = useMemo(() => ['20%', '50%'], [])

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index)
  }, [])

  // renders
  return (
    <View style={styles.container}>
      {children}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
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
  }
})

export default BottonPopup
