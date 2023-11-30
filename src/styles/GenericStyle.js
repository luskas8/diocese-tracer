import { StyleSheet } from 'react-native'

const genericStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#367BC1'
  },
  image: {
    width: 227.85,
    height: 262.64,
    flexShrink: 0,
    marginBottom: 302.36,
    marginTop: 75,
    marginRight: 71,
    marginLeft: 71
  },
  panel: {
    width: window.width,
    height: window.height,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
})

export default genericStyles
