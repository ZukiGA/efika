/* eslint-disable object-curly-newline */
/* eslint-disable indent */
import React from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FocusAwareStatusBar from '../../components/focus-status-bar';
import generalData from '../../data/Goals';
import Days from './progress-components/scroll-days';
import Goals from './progress-components/scroll-goals';
import Graph from '../../components/graph';
import styles from './progress-styles/styles';

const screenWidth = Dimensions.get('window').width;

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const today = new Date();

class ProgressPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateChosen: '',
      goalChosen: 'General',
      goal: { days: ['Sun'] },
      day: { percentage: 1 },
      colorHolder: '#0dceda',
    };
  }

  componentDidMount() {
    this.setTime();
    this.setGoal();
    this.setFocusDay();
  }

  setTime = () => {
    this.setState({
      dateChosen: weekDays[today.getDay()] + today.getDate().toString(),
    });
  };

  setGoal = () => {
    const { goalChosen } = this.state;
    generalData.map((goal) => {
      return goal.title === goalChosen ? this.setState({ goal }) : null;
    });
  };

  setFocusDay = () => {
    const dateString = today.getDate().toString();
    generalData[0].days.map((day) => {
      return day.day + day.date === weekDays[today.getDay()] + dateString
        ? this.setState({ day })
        : null;
    });
  };

  changeDate = (day) => {
    const { goal } = this.state;
    this.setState({ dateChosen: day.day + day.date });
    goal.days.map((dia) => {
      return dia.day + dia.date === day.day + day.date
        ? this.setState({ day: dia })
        : null;
    });
  };

  changeGoal = (goal) => {
    this.setState({ goalChosen: goal });
    generalData.map((meta) => {
      return meta.title === goal
        ? this.setState({
            goal: meta,
            day: meta.days[0],
            dateChosen: meta.days[0].day + meta.days[0].date,
          })
        : null;
    });
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

export default ProgressPage;
