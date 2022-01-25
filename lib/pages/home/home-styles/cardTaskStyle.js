import { StyleSheet, Dimensions } from 'react-native';

const heightScreen = Dimensions.get('window').height;
const heightCard = heightScreen * 0.36;

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    height: heightCard,
    marginLeft: 5,
    marginRight: 5,
  },
  text: {
    fontSize: 30,
  },
  textCompleted: {
    fontSize: 20,
  },
  titleCardTask: {
    height: '40%',
  },
  graphCardTask: {
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleAddCardView: {
    marginBottom: '5%'
  }
});

export { styles, heightCard };
