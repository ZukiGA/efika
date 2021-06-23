// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import {
  View, ScrollView, Text, TouchableOpacity
} from 'react-native';

import FocusAwareStatusBar from '../../components/focus-status-bar';
import Calendar from './home-components/Calendar';

import styles from './home-styles/taskScreenStyles';

export default class TaskPage extends React.Component {

  constructor(props) {
    const { route } = props;
    const { params } = route;
    const { item } = params;
    const {
      daysToDo,
      cuantification,
      repetition,
      mainColor,
      darkerColor,
      brighterColor
    } = item;
    super(props);
    this.state = {
      tabWeek: true,
      tabCalendar: false,
      daysToDo,
      cuantification,
      repetition,
      mainColor,
      darkerColor,
      brighterColor,
    };
  }

  enableContinue() {
    let today = new Date();
    if(this.state.repetition !== 'days') return true;   //changed
    if(!this.state.daysToDo[today.getFullYear()]
      || !this.state.daysToDo[today.getFullYear()][today.getMonth()]
      || !this.state.daysToDo[today.getFullYear()][today.getMonth()][today.getDate()]
      || this.state.daysToDo[today.getFullYear()][today.getMonth()][today.getDate()] !== 'today')
      return false;
    return true;
  }

  continue() {
    let today = new Date();
    this.setState({
      ...this.state.daysToDo,
      [today.getFullYear]: {
        [today.getMonth]: {
          [today.getDate]: 'completed'
        }
      }
    });
    this.props.route.params.continueTask(this.props.route.params.id);
  }

  changeDate = (day) => {
    this.setState({ dateChoosen: day.day + day.date });
    this.state.goal.days.map((dia)=>{
      dia.day + dia.date === day.day + day.date
        ? this.setState({ day:dia })
        : null;
    });
  };

  render() {
    const { state } = this;
    const {
      darkerColor,
      brighterColor,
      cuantification,
      repetition,
      mainColor,
      tabWeek,
      tabCalendar,
      daysToDo,
    } = state;
    return (
      <ScrollView style={styles.taskScreenStyles}>
        <FocusAwareStatusBar barStyle="dark-content" backgroundColor={darkerColor} />
        <View style={[styles.topSquare, { backgroundColor: brighterColor }]} />
        <View style={styles.circle}>
          <FontAwesome5 name="running" size={90} />
        </View>
        <View style={styles.continue}>
          {cuantification === 'time' ? (
            <TouchableOpacity>
              <MaterialCommunityIcons name="timer-outline" size={75} />
            </TouchableOpacity>
          ) : null }
          <View>
            { this.enableContinue() ? (
              <TouchableOpacity onPress={() => this.continue()}>
                <Text style={styles.textContinue}> Continue </Text>
              </TouchableOpacity>
            )
              : <Text> Completado por hoy </Text>}
          </View>
        </View>

        {repetition === 'day' ? (
          <View style={styles.tabsGrouping}>
            <TouchableOpacity
              style={[styles.leftTab,
                { borderColor: mainColor },
                tabWeek
                  ? { backgroundColor: mainColor }
                  : styles.tabInactive]}
              onPress={() => this.setState({ tabWeek: true, tabCalendar: false })}
            >
              <Text style={tabWeek
                ? styles.textTabActive
                : styles.textTabInactive}
              >
                Semana
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.rightTab, { borderColor: mainColor }, tabCalendar
                ? { backgroundColor: mainColor }
                : styles.tabInactive]}
              onPress={() => this.setState({ tabWeek: false, tabCalendar: true })}
            >
              <Text style={tabCalendar
                ? styles.textTabActive
                : styles.textTabInactive}
              >
                Calendario
              </Text>
            </TouchableOpacity>
          </View>
        )
          : (
            <View style={[styles.oneTab,
              { borderColor: mainColor, backgroundColor: mainColor }]}
            >
              <Text style={styles.textTabActive}>{repetition === 'week' ? 'Semana' : 'Mes'}</Text>
            </View>
          )}

        {tabCalendar
          ? <Calendar daysToDo={daysToDo} color={mainColor} />
          : null}

      </ScrollView>
    );
  }
}
