/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
// import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { BottomSheet } from 'react-native-elements';
import FocusAwareStatusBar from '../../components/focus-status-bar';
import styles from './progress-styles/styles';
import { deleteTasks } from '../../actions/user';
import selectGoalIcon from './progress-utils/select-goal-icon';
import selectColorRepetition from './progress-utils/select-color-repetition';

function nameSort(a, b) {
  // Use toUpperCase() to ignore character casing
  const bandA = a.nameTask;
  const bandB = b.nameTask;

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison;
}

function categorySort(a, b) {
  // Use toUpperCase() to ignore character casing
  const bandA = a.categoryName;
  const bandB = b.categoryName;

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison;
}

function repetitionSort(a, b) {
  // Use toUpperCase() to ignore character casing
  const bandA = a.repetition;
  const bandB = b.repetition;

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison;
}

function completedSort(a, b) {
  // Use toUpperCase() to ignore character casing
  const bandA = a.completedTimes;
  const bandB = b.completedTimes;

  let comparison = 0;
  if (bandA < bandB) {
    comparison = 1;
  } else if (bandA > bandB) {
    comparison = -1;
  }
  return comparison;
}

class ProgressHome extends React.Component {

  // eslint-disable-next-line react/state-in-constructor
  constructor(props) {
    super(props);
    this.state = {
      template: 'list',
      columns: 1,
      viewSorts: false,
      sort: 'Name',
    };
  }

    onSelectGoal = (goal) => {
      const { navigation } = this.props;
      navigation.navigate('Statistics', { goal });
    }

    listTemplate = (item) => (
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.goalSelector}
        onPress={() => this.onSelectGoal(item)}
      >
        <View style={styles.goalContainer}>

          {selectGoalIcon(item.categoryName, item.mainColor)}
          <View style={styles.goalText}>
            <Text style={styles.goalSelectorText}>{item.nameTask}</Text>
            <Text
              style={
                  [styles.goalRepetitionText,
                    { color: selectColorRepetition(item.repetition) }]
              }
            >
              every
              {' '}
              {item.repetition}
            </Text>
          </View>

        </View>
        {item.completedTimes === 0 ? <MaterialCommunityIcons name="close" size={30} color="red" /> : <MaterialCommunityIcons name="check" size={30} color="green" /> }
      </TouchableOpacity>
    )

    gridTemplate = (item) => (
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.goalSelectorGrid}
        onPress={() => this.onSelectGoal(item)}
      >
        <View style={styles.alignCenter}>

          {selectGoalIcon(item.categoryName, item.mainColor)}
          <View>
            <Text style={styles.goalSelectorText}>{item.nameTask}</Text>
            <Text
              style={
        [styles.goalRepetitionTextGrid,
          { color: selectColorRepetition(item.repetition) }]
            }
            >
              every
              {' '}
              {item.repetition}
            </Text>
          </View>

        </View>
        {item.completedTimes === 0 ? <MaterialCommunityIcons name="close" size={30} color="red" /> : <MaterialCommunityIcons name="check" size={30} color="green" /> }
      </TouchableOpacity>
    )

    goalSelector = ({ item }) => {
      const { template } = this.state;
      const isList = template === 'list';

      return isList ? this.listTemplate(item) : this.gridTemplate(item);

    };

    onChangeLayout = (isList) => {
      this.setState({ template: isList ? 'grid' : 'list', columns: isList ? 2 : 1 });
    }

    onChangeSort = (sort) => {
      this.setState({ sort, viewSorts: false });
    }

    goalSelectorHeader = () => {

      const { sort, template } = this.state;
      const isList = template === 'list';

      return (
        <View style={styles.goalSelectorHeader}>
          <View style={styles.goalSelectorHeaderFilters}>
            <TouchableOpacity
              style={styles.goalSelectorHeaderFilterIcon}
              activeOpacity={0.3}
              onPress={() => this.setState({ viewSorts: true })}
            >
              <MaterialCommunityIcons name="arrow-down" size={17} color="black" />
              <Text style={styles.goalSelectorHeaderText}>
                {sort}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={() => this.onChangeLayout(isList)}
            >
              {isList ? <MaterialCommunityIcons name="view-list" size={25} color="black" /> : <MaterialCommunityIcons name="view-grid" size={25} color="black" />}
            </TouchableOpacity>
          </View>
          <Text style={styles.goalSelectorHeaderText}>
            Select one goal to see your progress
          </Text>
        </View>
      );

    }

    sortGoals = (goals, sort) => {
      const newGoals = [...goals];
      if (sort === 'Category') {

        return newGoals.sort(categorySort);
      } if (sort === 'Kind of repetition') {
        return newGoals.sort(repetitionSort);
      } if (sort === 'Completed') {
        return newGoals.sort(completedSort);
      }
      return newGoals.sort(nameSort);
    }

    render() {
      const {
        columns, template, viewSorts, sort
      } = this.state;
      const { goals } = this.props;
      const sortedGoals = this.sortGoals(goals, sort);

      const list = [
        { title: 'Name' },
        { title: 'Category' },
        { title: 'Kind of repetition' },
        { title: 'Completed' },
        {
          title: 'Cancel',
          containerStyle: { backgroundColor: 'red' },
          titleStyle: { color: 'white' },
          onPress: () => this.setState({ viewSorts: false }),
        },
      ];
      return (
        <View style={styles.container}>
          <FocusAwareStatusBar />
          <View style={styles.headerContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Statistics</Text>
            </View>
          </View>
          <View style={styles.headerLine} />
          <FlatList
            data={sortedGoals}
            renderItem={this.goalSelector}
            keyExtractor={(goal) => goal.id}
            ListHeaderComponent={this.goalSelectorHeader}
            numColumns={columns}
            key={template}
          />
          {/* TODO: IMPPROVE PERFORMANCE OF THIS COMPONENT */}
          <BottomSheet
            isVisible={viewSorts}
            modalProps={
                {
                  onRequestClose: () => this.setState({ viewSorts: false }),
                }
            }
          >
            <Text style={styles.bottomModalTitle}>Sort by</Text>
            <View style={styles.headerLine} />
            {list.map((l) => (
              <TouchableOpacity
                key={l.title}
                style={[styles.bottomModal, l.containerStyle]}
                activeOpacity={0.9}
                onPress={l.title === 'Cancel' ? () => l.onPress() : () => this.onChangeSort(l.title)}
              >
                {l.title !== 'Cancel' && <MaterialCommunityIcons name="arrow-down" size={17} style={l.titleStyle} />}
                <Text style={[styles.bottomModalText, l.titleStyle]}>{l.title}</Text>
              </TouchableOpacity>

            ))}
          </BottomSheet>
          {/* <Button onPress={() => removeGoals()}>ELIMINAR METAS</Button> */}
        </View>
      );
    }
}

const mapStateToProps = (state) => {
  return {
    goals: state.user.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { removeGoals: deleteTasks },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressHome);
