import { Dimensions, StyleSheet } from 'react-native';
import {
  gray,
  grayBrown,
  lightBlue,
  lightGray,
  white,
} from '../../../styles/color-literals';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  centerAlignment: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: {
    fontSize: width * 0.09,
    color: grayBrown,
    fontWeight: 'bold',
  },
  optionContainer: {
    flex: 1,
    marginTop: 10,
    width,
    height: height * 0.05,
    backgroundColor: white,
  },
  option: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  textOption: {
    fontSize: width * 0.075,
  },
  textTitle: {
    fontSize: width * 0.13,
    fontWeight: 'bold',
  },
  separator: {
    height: 2,
    width: '95%',
    backgroundColor: lightGray,
    alignSelf: 'center',
  },
  logOut: {
    marginTop: 10,
    backgroundColor: lightBlue,
    borderRadius: 30,
    padding: 12,
    elevation: 4,
  },
  logOutText: {
    fontSize: width * 0.07,
  },
  date: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: width * 0.1,
    color: gray,
  },
  EntypoIcon: { textAlignVertical: 'center' },
  boldFont: {
    fontWeight: 'bold',
  },
  littlePaddingVertical: { paddingVertical: 20 },
  textAlignVerticalCenter: { textAlignVertical: 'center' },
  fontGray: { color: gray },
});

export default styles;
