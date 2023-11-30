import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import DefaultLayout from '../layouts/default'

export default function Tutorial () {
  return (
    <DefaultLayout>
      <ScrollView style={{ backgroundColor: 'rgba(101, 158, 237, 0.60)' }}>
        <View style={styles.tutorialView}>
          <View style={styles.tutorials}>
            <Text style={styles.subtitle}>1. Me localizando</Text>
            <Text style={styles.text}>Primeiro clique em LOCALIZAR-ME para buscar as paróquias que estejam perto de você.</Text>
            <Image style={styles.tutorialImage} source={require('../assets/images/tutorials/part1/one.png')} />
          </View>

          <View style={styles.tutorials}>
            <Text style={styles.text}>Ou se desejar também pode buscar as paróquias que estejam localizadas em algum outro lugar da Baixada Santista.</Text>
            <Text style={styles.text}>Digite o endereço do local de sua escolha</Text>
            <Image style={styles.tutorialImage} source={require('../assets/images/tutorials/part2/one.png')} />

            <Text style={styles.text}>Em seguida escolha a cidade que pertence a esse endereço</Text>
            <Image style={styles.tutorialImage} source={require('../assets/images/tutorials/part2/two.png')} />

            <Text style={styles.text}>E por fim aperte em Enviar para começar a busca pelas paróquias.</Text>
            <Image style={styles.tutorialImage} source={require('../assets/images/tutorials/part2/three.png')} />
          </View>

          <View style={styles.tutorials}>
            <Text style={styles.subtitle}>2. Buscando paróquias</Text>
            <Text style={styles.text}>Para que possa visualizar mais informações sobre uma paróquia, selecione o marcador que deseja.</Text>
            <Image style={styles.tutorialImage} source={require('../assets/images/tutorials/part3/one.png')} />

            <Text style={styles.text}>Irá se abrir uma pequena janela contendo as informações da paróquia selecionada.</Text>
            <Image style={styles.tutorialImage} source={require('../assets/images/tutorials/part3/two.png')} />

            <Text style={styles.text}>Arrastando para cima a janela, irá ser mostrado uma lista de todas as paróquias mostradas no mapa.</Text>
            <Image style={styles.tutorialImage} source={require('../assets/images/tutorials/part3/three.png')} />

            <Text style={styles.text}>Também pode-se selecionar qualquer outra outra paróquia pela a lista.</Text>
            <Image style={styles.tutorialImage} source={require('../assets/images/tutorials/part3/four.png')} />
          </View>
        </View>
      </ScrollView>
    </DefaultLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 22,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(101, 158, 237, 0.60)'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#3F88EF'
  },
  title: {
    paddingHorizontal: 16,
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Montserrat',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 30,
    letterSpacing: 0.9
  },
  subtitle: {
    color: '#FFF',
    fontFamily: 'Montserrat',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 30,
    letterSpacing: 1
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
    paddingVertical: 12,
    gap: 22
  },
  tutorials: {
    paddingHorizontal: 16,
    gap: 16
  },
  tutorialImage: {
    alignSelf: 'center'
  }
})
