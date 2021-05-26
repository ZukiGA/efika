// eslint-disable-next-line import/no-extraneous-dependencies
import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from '../home-styles/CalendarStyle';

const DAYSWEEK = 7;
const NUMBEROFWEEKS = 6;

const DAYS = ['D', 'L', 'Ma', 'Mi', 'J', 'V', 'S'];
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const { color, daysToDo } = props;
    this.state = {
      color,
      daysGoal: daysToDo,
      days: DAYS,
      conversions: MONTHS,
      myYear: new Date().getFullYear(),
      myMonth: new Date().getMonth(),
      daysOfTheMonth: this.createWeeks(new Date().getMonth(), new Date().getFullYear())
    };
  }

  createWeeks = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    let day = 1;
    const daysOfTheMonth = [];

    for (let i = 0; i < NUMBEROFWEEKS; i += 1) {
      const tmp = [];
      for (let j = 0; j < DAYSWEEK; j += 1) {
        if ((i === 0 && j < firstDay) || day > lastDay) tmp.push(0);
        else {
          tmp.push(day);
          day += 1;
        }
      }
      daysOfTheMonth.push(tmp);
    }
    return daysOfTheMonth;
  }

  decreaseMonth = () => {
    const { state } = this;
    const { myMonth, myYear } = state;
    let newMonth = myMonth - 1;
    let newYear = myYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    this.setState({
      myMonth: newMonth,
      myYear: newYear,
      daysOfTheMonth: this.createWeeks(newMonth, newYear)
    });
  }

  increaseMonth = () => {
    const { state } = this;
    const { myMonth, myYear } = state;
    let newMonth = myMonth + 1;
    let newYear = myYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    this.setState({
      myMonth: newMonth,
      myYear: newYear,
      daysOfTheMonth: this.createWeeks(newMonth, newYear)
    });
  }

  chooseStyle = (day) => {
    const { state } = this;
    const { myMonth, myYear, daysGoal } = state;
    const month = myMonth;
    const year = myYear;
    if (typeof daysGoal[year] !== 'undefined' && typeof daysGoal[year][month] !== 'undefined' && typeof daysGoal[year][month][day] !== 'undefined') {
      switch (daysGoal[year][month][day]) {
        case 'completed': return styles.boxCompleted;
        case 'half': return styles.boxHalf;
        case 'omitted': return styles.boxOmitted;
        case 'today': return styles.boxToday;
        case 'next': return styles.boxNext;
        default: return styles.boxOmitted;
      }
    }
    return null;
  }

  render() {
    const { state } = this;
    const {
      conversions,
      myMonth,
      color,
      days,
      daysOfTheMonth,
    } = state;
    return (
      <View style={styles.container}>
        <View style={styles.calenderHeader}>
          <View style={styles.months}>
            <Text style={styles.textMonth}>
              {' '}
              {conversions[myMonth]}
              {' '}
            </Text>
          </View>
          <View style={styles.months}>
            <TouchableOpacity style={[styles.changeMonth, { backgroundColor: color }]} onPress={() => this.decreaseMonth()}><AntDesign name="left" size={25} /></TouchableOpacity>
            <Text>     </Text>
            <TouchableOpacity style={[styles.changeMonth, { backgroundColor: color }]} onPress={() => this.increaseMonth()}><AntDesign name="right" size={25} /></TouchableOpacity>
          </View>
        </View>
        <Text />
        <View style={styles.header}>
          {days.map((elem) => (
            <View key={elem.id} style={styles.headerBox}>
              <Text>{elem}</Text>
            </View>
          ))}
        </View>
        <View style={styles.calendarElemSection}>
          {daysOfTheMonth.map((week) => (
            <View key={week.id} style={styles.calendarWeek}>
              {week.map((day) => {
                return (
                  day !== 0
                    ? (
                      <View key={(day.id, week.id)} style={[styles.box, this.chooseStyle(day)]}>
                        <Text>
                          {' '}
                          {day}
                          {' '}
                        </Text>
                      </View>
                    )
                    : <View key={(day.id, week.id)} style={styles.box}><Text>    </Text></View>
                );
              })}
            </View>
          ))}
        </View>
      </View>
    );
  }
}
