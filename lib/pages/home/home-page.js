// eslint-disable-next-line import/no-extraneous-dependencies
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import {
  Alert, Text, View, Button
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FocusAwareStatusBar from '../../components/focus-status-bar';
import AddCardTask from './home-components/AddCardTask';
import CardTask from './home-components/CardTask';
import { styles, widthCards } from './home-styles/HomeScreenStyle';
import {
  addTask, removeTask, continueTask, changeCuantification, omitDaysTasks, deleteCompletedTasks,
} from '../../actions/user';

const ADD_TASK = 'addTask';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Bryan',
      carouselItems: [],
    };
  }

  componentDidMount() {
    const { omitReduxDaysTasks, deleteReduxCompletedTasks } = this.props;
    const today = new Date();
    omitReduxDaysTasks(today.getFullYear(), today.getMonth(), today.getDate());
    deleteReduxCompletedTasks();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.user != this.props.user)
      this.saveTasks();
  }

  saveTasks = () => {
    const initialTask = {
      type: ADD_TASK,
      title: 'Agregar meta',
      text: '',
      color: '#F28500',
    };
    const { tasks } = this.props.user;
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

  continueTask = (id, year, mth, date) => {
    const { carouselItems } = this.state;
    const { continueReduxTask, deleteReduxCompletedTasks } = this.props;
    continueReduxTask(id, year, mth, date);
    deleteReduxCompletedTasks();
    this.setState({
      carouselItems: carouselItems.map((elem) => {
        if (elem.id === id) {
          elem.completedTimes += 1;
          elem.daysToDo[year][mth][date].status = 'completed';
          return elem;
        }
        return elem;
      }),
    });
  };

  changeCuantification = (idTask, quantity, year, mth, date) => {
    const { carouselItems } = this.state;
    const { changeReduxCuantification } = this.props;
    changeReduxCuantification(idTask, quantity, year, mth, date);
    this.setState({
      carouselItems: carouselItems.map((elem) => {
        if (elem.id === idTask) {
          if (elem.daysToDo[year][mth][date].amount + quantity
            >= elem.quantityCuantification) {
            elem.completedTimes += 1;
            elem.daysToDo[year][mth][date].status = 'completed';
          }
          elem.daysToDo[year][mth][date].amount += quantity;
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
    this.setState({ carouselItems: carouselItems.filter((elem) => elem.type === ADD_TASK) });
  }

  render() {
    const { state } = this;
    const { name, carouselItems } = state;
    console.log(carouselItems);

    return (
      <View style={styles.screenStyle}>
        <FocusAwareStatusBar />
        <View style={styles.topScreenStyle}>
          <View style={styles.iconStyle}>
            <AntDesign name="user" size={55} />
          </View>
          <View style={styles.textTitleSection}>
            <Text style={styles.title}>Buenas tardes,</Text>
            <Text style={styles.name}>{`${name}!`}</Text>
          </View>
        </View>
        <View style={styles.bottomScreenStyle}>
          <View style={styles.textGoalsSection}>
            <View style={styles.frameYourGoals}>
              <Text style={styles.textYourGoals}>Metas activas: </Text>
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
            <Button title="remove" onPress={() => this.removeGoals()}>ELIMINAR METAS</Button>
          </View>
        </View>

      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addNewTask: addTask,
      removeReduxTask: removeTask,
      continueReduxTask: continueTask,
      changeReduxCuantification: changeCuantification,
      omitReduxDaysTasks: omitDaysTasks,
      deleteReduxCompletedTasks: deleteCompletedTasks,
    },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
