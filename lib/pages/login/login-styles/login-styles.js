import { StyleSheet } from 'react-native';
import {
  black,
  darkBlue,
  lightGray,
  lightPurple,
  mediumBlue,
  white,
} from '../../../styles/color-literals';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightPurple,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    alignSelf: 'center',
    fontSize: 25,
    marginBottom: 40,
    marginTop: 20,
    color: black,
    fontWeight: 'bold',
  },

  iconField: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },

  textInput: {
    flex: 1,
    borderBottomColor: black,
    borderBottomWidth: 1,
    textAlign: 'center',
    borderRadius: 20,
  },

  buttonText: {
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 50,
    elevation: 8,
    shadowColor: darkBlue,
    shadowRadius: 8,
    backgroundColor: mediumBlue,
  },

  buttonText2: {
    elevation: 20,
  },

  forgotPassword: {
    color: black,
    fontSize: 12,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },

  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    opacity: 0.8,
    backgroundColor: white,
  },
  signUpFree: {
    fontStyle: 'italic',
    fontSize: 20,
    fontWeight: 'bold',
    color: white,
    marginTop: 3,
  },
  alignItemsCenter: { alignItems: 'center' },
  marginTopLittle: { marginTop: 15 },
  italicFont: { fontStyle: 'italic' },
  bigMarginLeft: { marginLeft: 100 },
  mediumPadding: { padding: 30 },
  loginWith: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50,
  },
  textLogInWith: {
    textAlign: 'center',
    color: black,
    fontWeight: 'bold',
  },
  containerLogInWith: { alignSelf: 'center', padding: 5 },
  horizontalLine: {
    marginTop: 20,
    height: 2,
    width: '100%',
    backgroundColor: lightGray,
  },
  logInText: {
    color: white,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  marginLogIn: { marginTop: 25, marginHorizontal: 55 },
  welcome: { backgroundColor: white, borderRadius: 30 },
});

export default styles;
