import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { MainStack } from './src/pages'
import RootLayout from './src/layouts/root'

export default function App () {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootLayout>
        <NavigationContainer>
          <MainStack/>
        </NavigationContainer>
      </RootLayout>
    </GestureHandlerRootView>
  )
}
