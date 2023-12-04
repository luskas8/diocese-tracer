import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import DefaultLayout from '../layouts/default'

export default function Tutorial () {
  return (
    <DefaultLayout>
      <ScrollView style={{ backgroundColor: 'rgba(101, 158, 237, 0.60)' }}>
        <View style={styles.tutorialView}>
          <View style={styles.tutorials}>
            <Text style={styles.subtitle}>Encontrando as paróquias mais próximas</Text>

            <Text style={styles.text}>Utilize a sua localização para buscar pelas paróquias que estão próximas de você clicando no botão &quot;LOCALIZAR-ME&quot;: </Text>
            <View style={styles.imageWrapper}>
              <Image style={styles.tutorialImage} source={require('../assets/images/tutorials/p1-one.png')} />
            </View>
          </View>

          <View style={styles.tutorials}>
            <Text style={styles.subtitle}>Encontrando paróquias de uma cidade específica</Text>

            <Text style={styles.text}>Você também pode buscar por paróquias que estejam localizadas em algum outro lugar da Baixada Santista selecionando a cidade de sua escolha: </Text>
            <View style={{ ...styles.imageWrapper, height: 300 }}>
              <Image style={styles.tutorialImage} source={require('../assets/images/tutorials/p2-one.png')} />
            </View>

            <Text style={styles.text}>E por fim clique em Enviar para concluir a busca:</Text>
            <View style={{ ...styles.imageWrapper, width: 280, height: 100 }}>
              <Image style={styles.tutorialImage} source={require('../assets/images/tutorials/p2-two.png')} />
            </View>
          </View>

          <View style={styles.tutorials}>
            <Text style={styles.subtitle}>Visualizando detalhes de cada paróquia</Text>
            <Text style={styles.text}>Para visualizar mais informações sobre uma paróquia, selecione o seu marcador:</Text>
            <View style={{ ...styles.imageWrapper, height: 400 }}>
              <Image style={styles.tutorialImage} source={require('../assets/images/tutorials/p3-one.png')} />
            </View>

            <Text style={styles.text}>As informações da paróquia selecionada aparecerão no canto inferior:</Text>
            <View style={{ ...styles.imageWrapper, height: 400 }}>
              <Image style={styles.tutorialImage} source={require('../assets/images/tutorials/p3-two.png')} />
            </View>
          </View>
        </View>
      </ScrollView>
    </DefaultLayout>
  )
}

const styles = StyleSheet.create({
  subtitle: {
    color: '#FFF',
    fontFamily: 'Montserrat',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: 1,
    paddingBottom: 10
  },
  text: {
    paddingHorizontal: 8,
    textAlign: 'justify',
    color: '#FFF',
    fontFamily: 'Montserrat',
    fontSize: 13.5,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 25
  },
  tutorialView: {
    paddingVertical: 12
  },
  tutorials: {
    paddingHorizontal: 16
  },
  tutorialImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  imageWrapper: {
    width: 300,
    height: 130,
    alignSelf: 'center'
  }
})
