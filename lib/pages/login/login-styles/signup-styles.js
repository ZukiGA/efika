import { StyleSheet } from 'react-native';
import {
  black,
  darkBlue,
  mediumBlue,
  red,
  white,
} from '../../../styles/color-literals';

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: mediumBlue,
  },
  buttonStyle: {
    backgroundColor: mediumBlue,
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 50,
    elevation: 8,
    shadowColor: darkBlue,
    shadowRadius: 8,
    marginVertical: 25,
    marginHorizontal: 35,
  },
  buttonTextStyle: {
    color: white,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputStyle: {
    flex: 1,
    color: black,
    paddingHorizontal: 35,
    paddingVertical: 5,
    borderRadius: 30,
  },
  errorTextStyle: {
    color: red,
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: white,
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  signUpContainer: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'space-around',
  },
  signUpTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signUpWith: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  spaceEvenlyRow: { flexDirection: 'row', justifyContent: 'space-evenly' },
});

export default styles;
