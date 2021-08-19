import { StyleSheet, Dimensions } from 'react-native';

import {
  white, black, softBlue, softGray
} from '../../../styles/color-literals';

export const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  taskScreenStyles: {
    backgroundColor: white,
    height: heightScreen,
    flex: 1,
  },
  topSquare: {
    height: heightScreen * 0.20
  },
  circle: {
    borderRadius: 75,
    height: heightScreen * 0.18,
    width: heightScreen * 0.18,
    borderWidth: 2,
    backgroundColor: white,
    position: 'absolute',
    top: heightScreen * 0.05,
    left: (widthScreen / 2) - (150 / 2),
    justifyContent: 'center',
    alignItems: 'center'
  },
  continue: {
    flexDirection: 'row-reverse',
    marginLeft: widthScreen * 0.05,
    marginTop: heightScreen * 0.02,
    alignItems: 'center',
  },
  textContinue: {
    fontSize: 0.061 * widthScreen,
    letterSpacing: 0.01,
  },
  yourDaysGrouping: {
    marginLeft: widthScreen * 0.04
  },
  yourDaysText: {
    fontSize: 0.073 * widthScreen,
    letterSpacing: 0.01,
  },
  tabsGrouping: {
    marginLeft: widthScreen * 0.04,
    flexDirection: 'row',
  },
  leftTab: {
    height: heightScreen * 0.055,
    width: widthScreen * 0.45,
    borderWidth: 2,
    borderRightWidth: 1,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightTab: {
    width: widthScreen * 0.45,
    borderWidth: 2,
    borderLeftWidth: 1,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  oneTab: {
    width: widthScreen * 0.9,
    height: heightScreen * 0.055,
    borderWidth: 2,
    marginLeft: widthScreen * 0.04,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: softBlue
  },
  tabInactive: {
    backgroundColor: softGray
  },
  textTabActive: {
    color: white
  },
  textTabInactive: {
    color: black
  },
  yourdaysSquare: {
    marginLeft: widthScreen * 0.04,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderTopRightRadius: 7,
    borderWidth: 2,
    width: widthScreen * 0.89,
    height: heightScreen * 0.3,
    backgroundColor: softGray
  },
  progressView: {
    marginTop: heightScreen * 0.05,
    alignItems: 'center',
  }
});

export default styles;
