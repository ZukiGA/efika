import { StyleSheet, Dimensions } from 'react-native';
import { specialBlack, white } from '../../../styles/color-literals';

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
    height: heightScreen * 0.4,
    width: '89%',
    backgroundColor: white,
    alignItems: 'center',
  },
  header: {
    height: '20%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  textInput: {
    fontSize: 58,
    alignSelf: 'center',
    marginTop: '5%'
  },
  textHeader: {
    color: white,
    fontSize: 20,
  },
  body: {
    alignItems: 'center',
  },
  roundedButton: {
    marginBottom: '3%',
    marginTop: '3%',
    // marginLeft: "5%",
    borderRadius: 50,
    // width: 200,
    height: heightScreen * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textRoundedButton: {
    color: white,
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: '5%',
  },
});

export default styles;
