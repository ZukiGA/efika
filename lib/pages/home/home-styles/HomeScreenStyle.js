// eslint-disable-next-line import/no-extraneous-dependencies
import Constants from 'expo-constants';
import { StyleSheet, Dimensions } from 'react-native';
import { orange, softBlue, white } from '../../../styles/color-literals';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const heightAppScreen = heightScreen * 1.20;
const heightTop = heightScreen * 0.32;
const widthCards = Math.round(widthScreen * 0.5);

const styles = StyleSheet.create({
  screenStyle: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: softBlue,
    height: heightAppScreen,
    flexDirection: 'column',
  },
  topScreenStyle: {
    height: heightTop,
  },
  bottomScreenStyle: {
    backgroundColor: white,
    flex: 1,
    width: widthScreen,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  title: {
    fontSize: 35,
    fontWeight: '600',
  },
  name: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  iconStyle: {
    alignItems: 'flex-end',
    marginRight: '5%',
    marginTop: '7%'
  },
  textTitleSection: {
    marginTop: '4%',
    marginLeft: '6%'
  },
  textGoalsSection: {
    flexDirection: 'row',
    marginTop: '6%',
    justifyContent: 'space-around'
  },
  textYourGoals: {
    fontSize: 29,
    fontWeight: 'bold',
  },
  frameYourGoals: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  circle: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: widthScreen * 0.13,
    height: widthScreen * 0.13,
    backgroundColor: orange,
  },
  cards: {
    flexDirection: 'row',
    width: widthScreen * 0.93,
    alignItems: 'center',
  },
  sectionCards: {
    flex: 1,
    marginTop: '8%',
    alignItems: 'center',
  },
});

export {
  styles, widthCards, heightScreen, widthScreen
};
