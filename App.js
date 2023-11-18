import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'

import { MainStack } from './src/pages'
import RootLayout from './src/layouts/root'

export default function App () {
  return (
    <RootLayout>
      <NavigationContainer>
        <MainStack/>
      </NavigationContainer>
    </RootLayout>
  )
}
