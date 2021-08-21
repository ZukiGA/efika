// eslint-disable-next-line import/no-extraneous-dependencies
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import {
  Alert, ScrollView, Text, View, Button
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProgressChart from '../../components/chart';
import FocusAwareStatusBar from '../../components/focus-status-bar';
import AddCardTask from './home-components/AddCardTask';
import CardTask from './home-components/CardTask';
import { styles, widthCards } from './home-styles/HomeScreenStyle';
import { addTask, removeTask } from '../../actions/user';

const ADD_TASK = 'addTask';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Bryan',
      carouselItems: [
        {
          type: ADD_TASK,
          title: 'Add Task',
          text: '',
          color: '#F28500',
        },
      ],
    };
  }

  componentDidMount() {
    this.saveTasks();
  }

  saveTasks = () => {
    const initialTask = {
      type: ADD_TASK,
      title: 'Add Task',
      text: '',
      color: '#F28500',
    };
    const { user } = this.props;
    const { tasks } = user;
    const taskCopies = [...tasks];
    taskCopies.push(initialTask);
    this.setState({ carouselItems: taskCopies });
  };

  addNewTask = (task) => {
    const { carouselItems } = this.state;
    this.setState({
      carouselItems: [task, ...carouselItems],
    });
  };

  removeTask = (id, title) => {
    const { state, props } = this;
    const { carouselItems } = state;
    const { navigation, removeReduxTask } = props;
    Alert.alert('Delete', `Do you want to delete ${title}?`, [
      {
        text: 'Yes',
        onPress: () => {
          this.setState({
            carouselItems: carouselItems.filter(
              (carousel) => carousel.id !== id
            ),
          });
          removeReduxTask(id);
          this.carousel.triggerRenderingHack();
          navigation.goBack();
        },
      },
      {
        text: 'Cancel',
      },
    ]);
  };

  continueTask = (id) => {
    const { carouselItems } = this.state;
    const today = new Date();
    const [year, month, date] = [
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    ];
    this.setState({
      carouselItems: carouselItems.map((elem) => {
        if (elem.id === id) {
          elem.completedTimes += 1;
          elem.daysToDo[year][month][date].status = 'completed';
          return elem;
        }
        return elem;
      }),
    });
  };

  changeCuantification = (idTask, quantity) => {
    const { carouselItems } = this.state;
    const today = new Date();
    const [year, month, date] = [today.getFullYear(), today.getMonth(), today.getDate()];
    this.setState({
      carouselItems: carouselItems.map((elem) => {
        if (elem.id === idTask) {
          elem.daysToDo[year][month][date].amount += quantity;
          if (
            elem.daysToDo[year][month][date].amount + quantity
            >= elem.quantityCuantification
          ) {
            elem.daysToDo[year][month][date].status = 'completed';
          }
          return elem;
        }
        return elem;
      }),
    });
  };

  _navigateFormulary = () => {
    const { navigation } = this.props;
    navigation.navigate('Formulary', {
      addTask: this.addNewTask,
    });
  };

  _navigateCardTask = (item) => {
    const { navigation } = this.props;
    navigation.navigate('TaskPage', {
      removeTask: this.removeTask,
      continueTask: this.continueTask,
      changeCuantification: this.changeCuantification,
      mainColor: item.mainColor,
      brighterColor: item.brighterColor,
      darkerColor: item.darkerColor,
      title: item.title,
      category: item.category,
      id: item.id,
      item,
    });
  };

  _renderItem = ({ item }) => {
    const { _navigateCardTask, _navigateFormulary } = this;
    if (item.type === 'addTask') {
      return (
        <AddCardTask
          item={item}
          navigateFormulary={() => _navigateFormulary()}
        />
      );
    }
    return (
      <CardTask item={item} navigateCardTask={() => _navigateCardTask(item)} />
    );
  };

  // used only in development
  removeGoals = () => {
    const { carouselItems } = this.state;
    this.setState({ carouselItems: carouselItems.filter((elem) => elem.type !== 'task') });
  }

  render() {
    const { state } = this;
    const { name, carouselItems } = state;

    return (
      <ScrollView style={styles.screenStyle}>
        <FocusAwareStatusBar />
        <View style={styles.topScreenStyle}>
          <View style={styles.iconStyle}>
            <AntDesign name="user" size={55} />
          </View>
          <View style={styles.textTitleSection}>
            <Text style={styles.title}>Good evening,</Text>
            <Text style={styles.name}>{`${name}!`}</Text>
            <View style={styles.progressChartStyle}>
              <ProgressChart />
            </View>
          </View>
        </View>
        <View style={styles.bottomScreenStyle}>
          <View style={styles.textGoalsSection}>
            <View style={styles.frameYourGoals}>
              <Text style={styles.textYourGoals}>Your goals: </Text>
            </View>
            <View style={styles.circle}>
              <Text style={styles.textYourGoals}>
                {' '}
                {carouselItems.length - 1}
                {' '}
              </Text>
            </View>
          </View>
          <View style={styles.sectionCards}>
            <View style={styles.cards}>
              <Carousel
                layout="default"
                ref={(ref) => (this.carousel = ref)}
                useScrollView
                data={carouselItems}
                sliderWidth={300}
                itemWidth={widthCards}
                renderItem={this._renderItem.bind(this)}
                addNewTask={this.addNewTask}
                onSnapToItem={(index) => this.setState({ activeIndex: index })}
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
                enableSnap={false}
              />
            </View>
          </View>
        </View>

        <Button style={{ height: 200 }} title="remove" onPress={() => this.removeGoals()}>ELIMINAR METAS</Button>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { addNewTask: addTask, removeReduxTask: removeTask },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
