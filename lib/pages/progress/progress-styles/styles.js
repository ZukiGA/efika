import { Dimensions, StatusBar, StyleSheet } from 'react-native';
import {
  white,
  black,
  lightGray,
  grayBrown,
  gray,
  mediumGray,
  lighterGray,
} from '../../../styles/color-literals';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  bottomModal: {
    height: screenHeight * 0.06,
    backgroundColor: white,
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
    paddingHorizontal: screenWidth * 0.05
  },
  bottomModalText: {
    fontSize: screenWidth * 0.04,
    letterSpacing: 1,
    paddingHorizontal: screenWidth * 0.02
  },
  bottomModalTitle: {
    fontSize: screenWidth * 0.04,
    letterSpacing: 2,
    paddingHorizontal: screenWidth * 0.06,
    backgroundColor: white,
    height: screenWidth * 0.12,
    textAlignVertical: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: lighterGray,
    marginTop: StatusBar.currentHeight || 0,
  },
  titleContainer: {
    marginVertical: screenWidth * 0.015,
    marginHorizontal: screenWidth * 0.05,
  },
  title: {
    fontSize: screenWidth * 0.09,
    color: grayBrown,
    fontWeight: 'bold',
  },
  carrouselOptions: {
    flexDirection: 'row',
    marginVertical: screenWidth * 0.025,
  },
  carrouselText: {
    fontWeight: 'bold',
    fontSize: screenWidth * 0.05,
  },
  carrouselDays2: {
    borderRadius: 20,
    borderWidth: 0.8,
    borderColor: gray,
    height: screenWidth * 0.11,
    width: screenWidth * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carrouselDays: {
    borderRadius: 18,
    borderWidth: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carrouselDayText: {
    color: black,
    fontSize: screenWidth * 0.035,
    textAlign: 'center',
  },
  carrouselDayText2: {
    color: black,
    fontSize: screenWidth * 0.05,
    textAlign: 'center',
  },
  graph: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: screenWidth * 0.05,
  },
  sectionText: {
    fontWeight: 'bold',
    color: mediumGray,
    fontSize: screenWidth * 0.06,
  },
  graph2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: screenWidth * 0.11,
    marginBottom: screenWidth * 0.05,
    alignItems: 'center'
  },
  strike: {
    textAlign: 'center',
    alignItems: 'center',
    marginRight: screenWidth * 0.15
  },
  strikeText: {
    fontSize: screenWidth * 0.05,
    letterSpacing: 4
  },
  strikeDays: {
    fontSize: screenWidth * 0.09
  },
  separator: {
    height: screenWidth * 0.015,
    width: screenWidth * 0.015,
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 10,
  },
  graphContainer: {
    backgroundColor: white,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  detailsContainer: {
    backgroundColor: white,
    marginTop: screenWidth * 0.025,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  headerContainer: {
    backgroundColor: white,
  },
  headerContainerCarrousel: {
    backgroundColor: white,
    marginBottom: screenWidth * 0.01,
    borderRadius: 30,
  },
  headerLine: { height: 1, backgroundColor: lightGray },
  tabStyle: {
    marginTop: screenWidth * 0.05,
    height: screenWidth * 0.1,
    width: screenWidth * 0.003,
    backgroundColor: lightGray,
    position: 'absolute',
  },
  spaceAroundCenter: { justifyContent: 'space-around', alignItems: 'center' },
  backgroundGray: { backgroundColor: gray },
  borderRightGray: { borderRightColor: gray, borderRightWidth: 1 },
  goalSelector: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: screenWidth * 0.012,
    marginVertical: 2.5,
    paddingHorizontal: screenWidth * 0.05,
    backgroundColor: white,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: lightGray
  },
  goalSelectorGrid: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: screenWidth * 0.01,
    marginVertical: 3,
    width: screenWidth * 0.5,
    backgroundColor: white,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: lightGray
  },
  goalContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  goalSelectorText: {
    fontSize: screenWidth * 0.05,
    letterSpacing: 0.5
  },
  alignCenter: {
    alignItems: 'center'
  },
  goalText: {
    paddingHorizontal: screenWidth * 0.05,
  },
  goalTextGrid: {
    textAlign: 'center'
  },
  goalRepetitionText: {
    fontSize: screenWidth * 0.03,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginLeft: 2
  },
  goalRepetitionTextGrid: {
    fontSize: screenWidth * 0.03,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center'
  },
  goalSelectorHeader: {
    backgroundColor: white,
    paddingVertical: 10
  },
  goalSelectorHeaderText: {
    textAlign: 'center',
    fontSize: screenWidth * 0.04,
    letterSpacing: 1
  },
  goalSelectorHeaderFilters: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: screenWidth * 0.04,
    alignItems: 'center',
    marginBottom: 10
  },
  goalSelectorHeaderFilterIcon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});

export default styles;
