import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const styles = StyleSheet.create({
  screenStyle: {
    backgroundColor: 'white',
    flex: 1,
  },
  scrollViewStyle: {
    height: heightScreen * 0.7,
  },
  textTitle: {
    fontSize: 28,
    letterSpacing: 0.05,
    fontWeight: '600',
  },
  topElements: {
    backgroundColor: '#8ad4ff',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    alignItems: 'center',
  },
  bottomElements: {
    marginTop: heightScreen * 0.03,
    marginLeft: '5%',
  },
  input: {
    width: widthScreen * 0.8,
    justifyContent: 'center',
    marginTop: heightScreen * 0.03,
    marginBottom: '2%',
  },
  textInput: {
    fontSize: 33,
    borderBottomWidth: 2,
    borderColor: 'black',
  },
  rowChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: '1%',
    width: widthScreen * 0.8,
    marginTop: '1.8%',
    marginBottom: '1.8%',
  },
  chipStyle: {
    backgroundColor: '#DADADA',
    margin: 6,
  },
  activeChipStyle: {
    backgroundColor: '#1389CE',
    color: 'white',
  },
  inactiveChipStyle: {
    backgroundColor: 'white',
    color: 'black',
  },
  textChipStyle: {
    fontSize: 17,
  },
  timesStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: widthScreen,
    marginBottom: heightScreen * 0.03,
    marginTop: heightScreen * 0.01,
  },
  roundedTimes: {
    borderWidth: 1,
    borderRadius: 50,
    width: '30%',
    alignItems: 'center',
    borderColor: 'white',
    backgroundColor: '#8ad4ff',
    elevation: 5,
  },
  cuantificacionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: '8%',
    marginTop: '1.8%',
    marginBottom: '1.%',
  },
  cuantificacionViewStyle: {
    marginRight: '8%',
  },
  habitsIconsView: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: '8%',
    marginTop: '1.8%',
    marginBottom: '1.8%',
    width: widthScreen * 0.87,
  },
  iconStyle: {
    alignItems: 'center',
    marginRight: '4%',
    marginLeft: '4%',
    width: '25%',
    backgroundColor: 'white',
  },
  textIconStyle: {
    fontSize: widthScreen * 0.05,
    fontWeight: '600',
    backgroundColor: 'transparent',
  },
  daysSectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: '5%',
    marginRight: '8%',
    marginTop: '1.8%',
    marginBottom: '4%',
  },
  dayStyle: {
    width: widthScreen * 0.1,
    height: widthScreen * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  activeDay: {
    backgroundColor: '#1389CE',
  },
  inactiveDay: {
    backgroundColor: '#DADADA',
  },
  activeDayText: {
    color: 'white',
  },
  inactiveDayText: {
    color: 'black',
  },
  roundedButton: {
    backgroundColor: '#1389CE',
    marginBottom: '10%',
    marginTop: '10%',
    // marginLeft: "5%",
    borderRadius: 50,
    width: '50%',
    height: heightScreen * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 7,
  },
  textRoundedButton: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default styles;
