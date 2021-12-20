// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  View, ScrollView, Text, TouchableOpacity
} from 'react-native';

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import FocusAwareStatusBar from '../../components/focus-status-bar';
import Calendar from './home-components/Calendar';
import ModalTaskRepeat from './home-components/ModalTaskRepeat';
import ModalTaskTime from './home-components/ModalTaskTime';

import { styles, widthScreen } from './home-styles/taskScreenStyles';
import AddIconTask from './home-utils/AddIconTask';
import getCurrentDate from './home-utils/getCurrentDate';

const choosePeriod = (period) => {
  if (period === 'day') return 'hoy';
  if (period === 'week') return 'esta semana';
  return 'este mes';
};

const formatTimer = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60 === 0 ? '00' : time % 60;

  return `${minutes}:${seconds}`;
};

export default class TaskPage extends React.Component {

  constructor(props) {
    super(props);
    const { item } = props.route.params;
    const {
      daysToDo,
      cuantification,
      repetition,
      mainColor,
      darkerColor,
      brighterColor,
      quantityCuantification,
      category,
      initialDate
    } = item;
    const today = new Date();
    const [year, mth, date] = getCurrentDate(cuantification, today, new Date(initialDate));
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
      year,
      mth,
      date,
      modalActiveTime: false,
      modalActiveRepeat: false,
    };
  }

  enableContinue() {
    const { state } = this;
    const {
      repetition, daysToDo, year, mth, date
    } = state;
    if (repetition !== 'day') return true; // to be changed
    if (!daysToDo[year] || !daysToDo[year][mth] || !daysToDo[year][mth][date] || daysToDo[year][mth][date].status !== 'today') {
      return false;
    }
    return true;
  }

  continue() {
    const { state, props } = this;
    const {
      daysToDo, year, mth, date
    } = state;
    this.setState({
      ...daysToDo,
      [year]: {
        [mth]: {
          [date]: 'completed'
        }
      }
    });
    props.route.params.continueTask(props.route.params.id, year, mth, date);
  }

  changeModalTimeActive() {
    this.setState({ modalActiveTime: false });
  }

  changeModalRepeatActive() {
    this.setState({ modalActiveRepeat: false });
  }

  retrieveCuantification() {
    const { state } = this;
    const {
      daysToDo, cuantification, year, mth, date
    } = state;
    if (cuantification && (daysToDo[year] && daysToDo[year][mth] && daysToDo[year][mth][date])) {
      return daysToDo[year][mth][date].amount;
    }
    return 0;
  }

  textProgress() {
    const {
      cuantification, daysToDo, quantityCuantification, year, mth, date
    } = this.state;
    const { status } = daysToDo[year][mth][date];
    if (cuantification === 'none') {
      return `${status === 'completed' ? 1 : 0}/1`;
    }
    const { amount } = daysToDo[year][mth][date];
    if (cuantification === 'time') {
      return `${formatTimer(amount)}/${formatTimer(quantityCuantification)}`;
    }
    return `${amount}/${quantityCuantification}`;
  }

  fillProgress() {
    const {
      cuantification, quantityCuantification, daysToDo, year, mth, date
    } = this.state;
    const { status } = daysToDo[year][mth][date];
    if (cuantification === 'none') {
      return status === 'completed' ? 100 : 0;
    }
    const { amount } = daysToDo[year][mth][date];
    return (amount / quantityCuantification) * 100;
  }

  renderContinueButton() {
    const { cuantification } = this.state;
    if (!this.enableContinue()) {
      return (
        <Text> Completado por hoy </Text>
      );
    }
    if (cuantification === 'none') {
      return (
        <TouchableOpacity onPress={() => this.continue()}>
          <Text style={styles.textContinue}> Continue </Text>
        </TouchableOpacity>
      );
    }
    return null;
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
      year,
      mth,
      date
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
              changeCuantification={(idTask, newRepetitions, curYear, curMth, curDate) => {
                return changeCuantification(idTask, newRepetitions, curYear, curMth, curDate);
              }}
              completedCuantification={completedCuantification}
              quantity={quantityCuantification}
              year={year}
              mth={mth}
              date={date}
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
              changeCuantification={(idTask, newRepetitions, curYear, curMth, curDate) => {
                return changeCuantification(idTask, newRepetitions, curYear, curMth, curDate);
              }}
              quantity={quantityCuantification}
              completedCuantification={completedCuantification}
              amount={daysToDo[year][mth][date].amount}
              year={year}
              mth={mth}
              date={date}

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
            { this.renderContinueButton()}
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
                Dia
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
          : (
            <View style={styles.progressView}>
              <Text>
                Progreso de
                {' '}
                {choosePeriod(repetition)}
                :
              </Text>
              <AnimatedCircularProgress
                rotation={360}
                size={widthScreen * 0.7}
                width={widthScreen * 0.1}
                fill={this.fillProgress()}
                tintColor={mainColor}
                backgroundColor="#DADADA"
              >
                { () => (
                  <Text>{this.textProgress()}</Text>
                ) }
              </AnimatedCircularProgress>
            </View>
          )}

      </ScrollView>
    );
  }
}
