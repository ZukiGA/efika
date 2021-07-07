import { StyleSheet, Dimensions } from 'react-native';

const heightScreen = Dimensions.get('window').height;
const heightCard = heightScreen * 0.31;

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
  titleCardTask: {
    height: '40%',
  },
  graphCardTask: {
    height: '60%',
    alignItems: 'center',
  },
});

export { styles, heightCard };
