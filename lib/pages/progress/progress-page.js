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
import selectGoalColor from './progress-utils/select-goal-color';

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
      progress: {percentage: 1}
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

    const year = today.getFullYear()
    const month = today.getMonth()
    const daysTODO = goal.daysToDo[year.toString()][month.toString()]

    if (goal.repetition === 'week') {
      const startWeek = startOfWeek(today).getDate()
      const endWeek = endOfWeek(today).getDate()
      let status = "invalid";

      Object.keys(daysTODO).forEach((day) => {
        if (startWeek <= day && day <= endWeek) {
          status = daysTODO[day].status
        }
      })

      weekProgress = [{
        day: 'week',
        color: selectGoalColor(status),
        percentage: status === "completed" ? 100 : 0,
        date: `${startWeek}-${endWeek}`
      }];
    } else if (goal.repetition === 'month') {
      const status = daysTODO[Object.entries(daysTODO)[0][0]].status
      weekProgress = [{
        day: MONTHS[month],
        color: selectGoalColor(status),
        percentage: status === "completed" ? 100 : 0,
        date: `1-${endOfMonth(today).getDate()}`
      }];
    } else {
    // TODO: Change percentage and color according to progress
      weekProgress = goal.days.map((day) => {
        const date = addDays(
          today,
          -(today.getDay() - day),
        ).getDate()
        const object = daysTODO[date.toString()]
        const status = object !== undefined ? object.status : "invalid"
        // console.log(object)
        return {
          day: WEEK_DAYS[day],
          color: selectGoalColor(status),
          percentage: status === "completed" ? 100 : 0,
          date
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
    this.setState({ goal: newGoal, day: newDay, dateChosen: newDay.day + newDay.date,     progress:{
      percentage: 100*(goal.completedTimes / goal.timesToDo)
    } });

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
    const { dateChosen, day, colorHolder, goal, progress } = this.state;
    // console.log(goal)

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
              <Graph goal={progress} width={screenWidth * 0.55} color="green" />
            </View>
          </View>
        </ScrollView>
      )}
      </Translation>
    );
  }
}

export default ProgressPage;
