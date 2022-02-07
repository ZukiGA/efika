import addDays from 'date-fns/addDays';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Translation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { endOfMonth, endOfWeek, startOfWeek } from 'date-fns';
import FocusAwareStatusBar from '../../components/focus-status-bar';
import Graph from '../../components/graph';
import Days from './progress-components/scroll-days';
import styles from './progress-styles/styles';

const screenWidth = Dimensions.get('window').width;
export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Ma', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const today = new Date();

class ProgressPage extends React.Component {
  constructor(props) {
    super(props);

    const todayDate = WEEK_DAYS[today.getDay()] + today.getDate();

    this.state = {
      dateChosen: todayDate,
      goal: { days: ['Sun'] },
      day: { percentage: 1 },
      colorHolder: '#0dceda',
    };
  }

  componentDidMount() {
    this.setGoalData();

  }

  componentDidUpdate(prevProps) {
    const { route } = this.props;
    const { goal } = route.params;
    if (prevProps.goal !== goal && prevProps.goal) {
      this.setGoalData();
    }
  }

  setGoalData = () => {
    const { route } = this.props;
    const { goal } = route.params;
    const { dateChosen } = this.state;
    const newGoal = { ...goal };

    let weekProgress = {};

    if (goal.repetition === 'week') {
      weekProgress = [{
        day: 'week',
        color: '#DADADA',
        percentage: 10,
        date: `${startOfWeek(today).getDate()}-${endOfWeek(
          today,
        ).getDate()}`
      }];
    } else if (goal.repetition === 'month') {
      weekProgress = [{
        day: MONTHS[today.getMonth()],
        color: '#DADADA',
        percentage: 10,
        date: `1-${endOfMonth(today).getDate()}`
      }];
    } else {
    // TODO: Change percentage and color according to progress
      weekProgress = goal.days.map((day) => {
        return {
          day: WEEK_DAYS[day],
          color: '#DADADA',
          percentage: 10,
          date: addDays(
            today,
            -(today.getDay() - day),
          ).getDate()
        };
      });
    }

    newGoal.days = weekProgress;
    const [day] = newGoal.days.filter(
      (date) => date.day + date.date === dateChosen,
    );
    let newDay = { ...day };
    // eslint-disable-next-line prefer-destructuring
    if (newDay.day === undefined) newDay = weekProgress[0];
    this.setState({ goal: newGoal, day: newDay, dateChosen: newDay.day + newDay.date });

  };

  changeDate = (datePressed) => {
    const { goal } = this.state;

    const [day] = goal.days.filter(
      (date) => date.day + date.date === datePressed.day + datePressed.date,
    );

    this.setState({ dateChosen: datePressed.day + datePressed.date, day });
  };

  onPressCompGraph = () => {
    const colorCode = `rgb(
      ${Math.floor(Math.random() * 256)}
      ,
      ${Math.floor(Math.random() * 256)}
      ,
      ${Math.floor(Math.random() * 256)}
      )`;

    this.setState({
      colorHolder: colorCode,
    });
  };

  render() {
    // eslint-disable-next-line object-curly-newline
    const { dateChosen, day, colorHolder, goal } = this.state;

    return (
      <Translation>
        {(t, { i18 }) => (
        <ScrollView style={styles.container}>
          <FocusAwareStatusBar />
          <View style={styles.headerContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{goal.title}</Text>
            </View>

          </View>

          <View style={styles.headerContainerCarrousel}>
            <Days
              days={goal.days}
              dateChosen={dateChosen}
              changeDate={this.changeDate}
            />
          </View>

          <View style={styles.graphContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.sectionText}>{t("Completion")}</Text>
            </View>
            <TouchableOpacity
              style={styles.graph}
              onPress={this.onPressCompGraph}
            >
              <Graph goal={day} width={screenWidth * 0.7} color={colorHolder} />
            </TouchableOpacity>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.sectionText}>{t("Sucess rate")}</Text>
            </View>
            <View style={styles.graph2}>
              <View style={styles.strike}>
                <MaterialCommunityIcons name="fire" size={55} color="orange" />
                <Text style={styles.strikeText}>{t("Strike")}</Text>
                <Text style={styles.strikeDays}>
                  {goal.completedTimes}
                  {' '}
                  {t(goal.repetition, {count: 2})}
                </Text>
              </View>
              <Graph goal={day} width={screenWidth * 0.55} color="green" />
            </View>
          </View>
        </ScrollView>
      )}
      </Translation>
    );
  }
}

export default ProgressPage;
