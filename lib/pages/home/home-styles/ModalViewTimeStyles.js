import { StyleSheet, Dimensions } from 'react-native';
import {
  hardGray, softBlue, specialBlack, white
} from '../../../styles/color-literals';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: specialBlack,
    position: 'absolute',
    height: heightScreen,
    width: widthScreen
  },
  pickerContainer: {
    height: heightScreen * 0.30,
    width: '89%',
    backgroundColor: white,
    alignItems: 'center',
  },
  header: {
    height: '25%',
    width: '100%',
    backgroundColor: softBlue,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  textHeader: {
    color: white,
    fontSize: 22,
  },
  inputs: {
    marginTop: '7%',
    flexDirection: 'row',
  },
  textInput: {
    fontSize: 58,
    alignSelf: 'flex-end',
  },
  subindex: {
    alignSelf: 'flex-end',
    color: hardGray,
    fontSize: 18,
  },
  okButton: {
    marginTop: '4%'
  },
  okText: {
    fontSize: 22,
    color: softBlue
  }
});

// #C8272F
export default styles;
