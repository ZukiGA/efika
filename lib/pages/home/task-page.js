// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  View, ScrollView, Text, TouchableOpacity
} from 'react-native';

import FocusAwareStatusBar from '../../components/focus-status-bar';
import Calendar from './home-components/Calendar';
import ModalTaskRepeat from './home-components/ModalTaskRepeat';
import ModalTaskTime from './home-components/ModalTaskTime';

import styles from './home-styles/taskScreenStyles';
import AddIconTask from './home-utils/AddIconTask';

export default class TaskPage extends React.Component {

  constructor(props) {
    const { item } = props.route.params;
    const {
      daysToDo,
      cuantification,
      repetition,
      mainColor,
      darkerColor,
      brighterColor,
      quantityCuantification,
      category
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
      category,
      quantityCuantification,
      modalActiveTime: false,
      modalActiveRepeat: false,
    };
  }

  enableContinue() {
    const { state } = this;
    const { repetition, daysToDo } = state;
    const today = new Date();
    if (repetition !== 'day') return true; // changed
    if (!daysToDo[today.getFullYear()]
      || !daysToDo[today.getFullYear()][today.getMonth()]
      || !daysToDo[today.getFullYear()][today.getMonth()][today.getDate()]
      || daysToDo[today.getFullYear()][today.getMonth()][today.getDate()].status !== 'today') return false;
    return true;
  }

  continue() {
    const today = new Date();
    const { state, props } = this;
    const { daysToDo } = state;
    this.setState({
      ...daysToDo,
      [today.getFullYear]: {
        [today.getMonth]: {
          [today.getDate]: 'completed'
        }
      }
    });
    props.route.params.continueTask(props.route.params.id);
  }

  changeModalTimeActive() {
    this.setState({ modalActiveTime: false });
  }

  changeModalRepeatActive() {
    this.setState({ modalActiveRepeat: false });
  }

  retrieveCuantification() {
    const { state } = this;
    const { daysToDo, cuantification } = state;
    const today = new Date();
    if (cuantification && (daysToDo[today.getFullYear()]
      && daysToDo[today.getFullYear()][today.getMonth()]
      && daysToDo[today.getFullYear()][today.getMonth()][today.getDate()])) {
      return daysToDo[today.getFullYear()][today.getMonth()][today.getDate()].amount;
    }
    return 0;
  }

  render() {
    const { state, props } = this;
    const {
      darkerColor,
      brighterColor,
      cuantification,
      repetition,
      mainColor,
      tabWeek,
      tabCalendar,
      daysToDo,
      modalActiveRepeat,
      modalActiveTime,
      category,
      quantityCuantification,
    } = state;
    const { changeCuantification, id } = props.route.params;
    const completedCuantification = this.retrieveCuantification();

    return (
      <ScrollView style={styles.taskScreenStyles}>
        { modalActiveRepeat
          ? (
            <ModalTaskRepeat
              mainColor={mainColor}
              idTask={id}
              changeModalRepeatActive={() => this.changeModalRepeatActive()}
              changeCuantification={(idTask, newRepetitions) => {
                return changeCuantification(idTask, newRepetitions);
              }}
              completedCuantification={completedCuantification}
              quantity={quantityCuantification}
            />
          )
          : null}
        { modalActiveTime
          ? (
            <ModalTaskTime
              mainColor={mainColor}
              idTask={id}
              changeModalTimeActive={() => {
                return this.changeModalTimeActive();
              }}
              changeCuantification={(idTask, newTime) => {
                return changeCuantification(idTask, newTime);
              }}
              quantity={quantityCuantification}
              completedCuantification={completedCuantification}
            />
          )
          : null}
        <FocusAwareStatusBar barStyle="dark-content" backgroundColor={darkerColor} />
        <View style={[styles.topSquare, { backgroundColor: brighterColor }]} />
        <View style={styles.circle}>
          <AddIconTask task={category} />
        </View>
        <View style={styles.continue}>
          {this.enableContinue() && cuantification === 'time' ? (
            <TouchableOpacity onPress={() => this.setState({ modalActiveTime: true })}>
              <MaterialCommunityIcons name="timer-outline" size={55} />
            </TouchableOpacity>
          ) : null }
          {this.enableContinue() && cuantification === 'repeat' ? (
            <TouchableOpacity onPress={() => this.setState({ modalActiveRepeat: true })}>
              <MaterialCommunityIcons name="repeat" size={55} />
            </TouchableOpacity>
          ) : null}
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

// changeDate = (day) => {
//   const { state } = this;
//   this.setState({ dateChoosen: day.day + day.date });
//   state.goal.days.map((elem) => {
//     if (elem.day + elem.date === day.day + day.date) {
//       this.setState({ day: elem });
//     }
//   });
// };
