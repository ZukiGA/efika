import React from 'react'
import {StyleSheet, Dimensions} from 'react-native'

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  header: {
    width: "85%",
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  months: {
    flexDirection: 'row',
  },
  calenderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width:"85%",
    height: heightScreen * .1
  },
  textMonth: {
    fontSize: 35,
    fontWeight: "700"
  },
  calendarElemSection: {
    width: "85%",
    height: heightScreen * .4,
  },
  calendarWeek: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerBox: {
    height: 20,
    width: 35,
    marginBottom: 10,
    alignItems: "center",
  },
  box: {
    height: 45,
    width: 35,
    alignItems: "center",
  },
  boxCompleted: {
    borderWidth: 2,
    backgroundColor: "green",
    borderColor: "green",
  },
  boxHalf: {
    borderWidth: 2,
    borderColor: "yellow",
  },
  boxOmitted: {
    borderWidth: 2,
    borderColor: "red",
  },
  boxToday: {
    borderWidth: 2,
    borderColor: "#1389CE",
  },
  boxNext: {
    borderBottomWidth: 2,
    borderBottomColor: "grey",
  },
  changeMonth: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default styles
