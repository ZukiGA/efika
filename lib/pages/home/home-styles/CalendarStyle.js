import { StyleSheet, Dimensions } from 'react-native';
import {
  green, yellow, red, softBlue, gray, white
} from '../../../styles/color-literals';

const heightScreen = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  header: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  months: {
    flexDirection: 'row',
  },
  calenderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
    height: heightScreen * 0.1
  },
  textMonth: {
    fontSize: 35,
    fontWeight: '700'
  },
  calendarElemSection: {
    width: '85%',
    height: heightScreen * 0.4,
  },
  calendarWeek: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerBox: {
    height: 20,
    width: 35,
    marginBottom: 10,
    alignItems: 'center',
  },
  box: {
    height: 45,
    width: 35,
    alignItems: 'center',
  },
  boxCompleted: {
    borderWidth: 2,
    backgroundColor: green,
    borderColor: green,
  },
  boxHalf: {
    borderWidth: 2,
    borderColor: yellow,
  },
  boxOmitted: {
    borderWidth: 2,
    borderColor: red,
  },
  boxToday: {
    borderWidth: 2,
    borderColor: softBlue,
  },
  boxNext: {
    borderBottomWidth: 2,
    borderBottomColor: gray,
  },
  boxNone: {
    borderBottomWidth: 2,
    borderBottomColor: white,
  },
  changeMonth: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;
