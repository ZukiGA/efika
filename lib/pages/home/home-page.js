// eslint-disable-next-line import/no-extraneous-dependencies
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import {
  Alert,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ProgressChart from '../../components/chart';
import FocusAwareStatusBar from '../../components/focus-status-bar';
import AddCardTask from './home-components/AddCardTask';
import CardTask from './home-components/CardTask';
import { styles, widthCards } from './home-styles/HomeScreenStyle';

const ADD_TASK = 'addTask';
const TASK = 'task';
const NONE = 'none';
const DAY = 'day';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
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

  addNewTask = (task) => {
    const { state } = this;
    const { carouselItems } = state;
    const newItem = {
      type: TASK,
      id: task.id,
      title: task.nameTask,
      category: task.category,
      repetition: task.repetition,
      timesToDo: task.timesToDo,
      completedTimes: task.completedTimes,
      days: task.days,
      text: `${task.category} ${task.mainColor} ${task.repetition} ${task.days}`,
      mainColor: task.mainColor,
      brighterColor: task.brighterColor,
      darkerColor: task.darkerColor,
    };
    if (task.cuantification !== NONE) {
      newItem.cuantification = task.cuantification;
      newItem.quantityCuantification = task.quantityCuantification;
    } else {
      newItem.cuantification = NONE;
    }
    if (task.repetition === DAY) {
      newItem.daysToDo = task.daysToDo;
    }
    this.setState({
      carouselItems: [newItem, ...carouselItems],
    });
  };

  removeTask = (id, title) => {
    const { state, props } = this;
    const { carouselItems } = state;
    const { navigation } = props;
    Alert.alert('Delete', `Do you want to delete ${title}?`, [
      {
        text: 'Yes',
        onPress: () => {
          this.setState({
            carouselItems: carouselItems.filter(
              (carousel) => carousel.id !== id
            ),
          });
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
    const { state } = this;
    const { carouselItems } = state;
    const today = new Date();
    this.setState({
      carouselItems: carouselItems.map((elem) => {
        if (elem.id === id) {
          elem.completedTimes += 1;
          elem.daysToDo[today.getFullYear()][today.getMonth()][today.getDate()] = 'completed';
          return elem;
        }
        return elem;
      })
    });
  }

  _navigateFormulary = () => {
    const { props } = this;
    const { navigation } = props;
    navigation.navigate('Formulary', {
      addTask: this.addNewTask,
    });
  };

  _navigateCardTask = (item) => {
    const { props } = this;
    const { navigation } = props;
    navigation.navigate('TaskPage', {
      removeTask: this.removeTask,
      continueTask: this.continueTask,
      mainColor: item.mainColor,
      brighterColor: item.brighterColor,
      darkerColor: item.darkerColor,
      title: item.title,
      id: item.id,
      item,
    });
  };

  _renderItem = ({ item, index }) => {
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
      <CardTask
        item={item}
        navigateCardTask={() => _navigateCardTask(item)}
      />
    );
  };

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
                data={this.state.carouselItems}
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
      </ScrollView>
    );
  }
}

export default HomePage;
