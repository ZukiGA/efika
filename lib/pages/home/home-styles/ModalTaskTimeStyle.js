import { StyleSheet, Dimensions } from 'react-native';
import { specialBlack, white, softBlue } from '../../../styles/color-literals';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: heightScreen,
    width: widthScreen,
    backgroundColor: specialBlack,
  },
  pickerContainer: {
    height: heightScreen * 0.7,
    width: '89%',
    backgroundColor: white,
    alignItems: 'center',
  },
  header: {
    height: '10%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  timerText: {
    fontSize: widthScreen * 0.1,
  }
});

export default styles;
