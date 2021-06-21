import { StyleSheet, Dimensions } from 'react-native';
import { softBlue, specialBlack, white } from '../../../styles/color-literals';

const heightScreen = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: specialBlack
  },
  pickerContainer: {
    height: heightScreen * 0.5,
    width: '100%',
    backgroundColor: white,
  },
  header: {
    height: '15%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: softBlue
  },
  titleStyle: {
    color: white,
    fontSize: 20,
  },
  flatListContainer: {
    flex: 1,
    paddingTop: '5%'
  },
  flatListItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: heightScreen * 0.08,
  },
  flatListTitle: {
    fontSize: 28,
  },
});

export default styles;
