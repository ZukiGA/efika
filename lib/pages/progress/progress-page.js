/* eslint-disable no-param-reassign */
import { endOfMonth, endOfWeek, startOfWeek } from 'date-fns';
import addDays from 'date-fns/addDays';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import FocusAwareStatusBar from '../../components/focus-status-bar';
import Graph from '../../components/graph';
import Days from './progress-components/scroll-days';
import Goals from './progress-components/scroll-goals';
import styles from './progress-styles/styles';

const screenWidth = Dimensions.get('window').width;

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const today = new Date();

class ProgressPage extends React.Component {
  constructor(props) {
    super(props);

    const todayDate = weekDays[today.getDay()] + today.getDate();

    this.state = {
      dateChosen: todayDate,
      goalChosen: 'General',
      goal: { days: ['Sun'] },
      day: { percentage: 1 },
      colorHolder: '#0dceda',
    };
  }

  componentDidMount() {
    this.setDates();
    this.setGoal();
    this.setFocusDay();
  }

  componentDidUpdate(prevProps) {
    const { goals } = this.props;
    if (prevProps.goals !== goals && prevProps.goals) {
      this.setDates();
      this.setGoal();
      this.setFocusDay();
    }
  }

  setDates = () => {
    const { goals } = this.props;
    goals.forEach((goal) => {
      goal.days.forEach((day) => {
        if (day.day === 'Month') {
          day.date = `1-${endOfMonth(today).getDate()}`;
        } else if (day.day === 'Week') {
          day.date = `${startOfWeek(today).getDate()}-${endOfWeek(
            today,
          ).getDate()}`;
        } else {
          day.date = addDays(
            today,
            -(today.getDay() - weekDays.indexOf(day.day)),
          ).getDate();
        }
      });
    });
  };

  setGoal = () => {
    const { goalChosen } = this.state;
    const { goals } = this.props;
    const [goal] = goals.filter((task) => task.title === goalChosen);

    this.setState({ goal });
  };

  setFocusDay = () => {
    const { dateChosen } = this.state;
    const { goals } = this.props;
    const [day] = goals[0].days.filter(
      (date) => date.day + date.date === dateChosen,
    );

    this.setState({ day });
  };

  changeDate = (datePressed) => {
    const { goal } = this.state;

    const [day] = goal.days.filter(
      (date) => date.day + date.date === datePressed.day + datePressed.date,
    );

    this.setState({ dateChosen: datePressed.day + datePressed.date, day });
  };

  changeGoal = (goalChosen) => {
    const { dateChosen } = this.state;
    const { goals } = this.props;

    const [goal] = goals.filter((meta) => meta.title === goalChosen);
    const [day] = goal.days.filter(
      (date) => date.day + date.date === dateChosen,
    );

    if (day) {
      this.setState({
        goalChosen,
        goal,
        day,
        dateChosen: day.day + day.date,
      });
    } else {
      this.setState({
        goalChosen,
        goal,
        day: goal.days[0],
        dateChosen: goal.days[0].day + goal.days[0].date,
      });
    }
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
    const { goalChosen, goal, dateChosen, day, colorHolder } = this.state;
    return (
      <ScrollView style={styles.container}>
        <FocusAwareStatusBar />
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Statistics</Text>
          </View>

          <Goals goalChosen={goalChosen} changeGoal={this.changeGoal} />
        </View>

        <View style={styles.headerContainerCarrousel}>
          <Days
            goal={goal}
            dateChosen={dateChosen}
            changeDate={this.changeDate}
          />
        </View>

        <View style={styles.graphContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionText}>Completion</Text>
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
            <Text style={styles.sectionText}>Success rate</Text>
          </View>
          <View style={styles.graph2}>
            <Graph goal={day} width={screenWidth * 0.55} color="green" />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    goals: state.user.tasks,
  };
};

export default connect(mapStateToProps)(ProgressPage);
