/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { Translation } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheet } from "react-native-elements";
import { Button } from "react-native-paper";
import FocusAwareStatusBar from "../../components/focus-status-bar";
import styles from "./progress-styles/styles";
import { deleteTasks } from "../../actions/user";
import selectGoalIcon from "./progress-utils/select-goal-icon";
import getCurrentDate from "../home/home-utils/getCurrentDate";
import selectColorRepetition from "./progress-utils/select-color-repetition";

function nameSort(a, b) {
  // Use toUpperCase() to ignore character casing
  const bandA = a.title;
  const bandB = b.title;

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
  const bandA = a.category;
  const bandB = b.category;

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
  const bandA = a.timesToDo;
  const bandB = b.timesToDo;

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
      template: "list",
      columns: 1,
      viewSorts: false,
      sort: 'Name',
      visibleAlert: false
    };
  }

  onSelectGoal = (goal) => {
    const { navigation } = this.props;
    navigation.navigate("Statistics", { goal });
  };

  fillProgress(item) {
    const {
      cuantification,
      quantityCuantification,
      daysToDo,
      repetition,
      initialDate,
    } = item;
    const today = new Date();
    const [year, mth, date] = getCurrentDate(
      repetition,
      today,
      new Date(initialDate)
    );
    if (
      !daysToDo[year] ||
      !daysToDo[year][mth] ||
      !daysToDo[year][mth][date] ||
      daysToDo[year][mth][date].status === "none"
    ) {
      return false;
    }
    const { status } = daysToDo[year][mth][date];
    if (cuantification === "none") {
      return status === "completed" ? false : true;
    }
    const { amount } = daysToDo[year][mth][date];
    const percentage = (amount / quantityCuantification) * 100;
    const finalAmount = Math.min(percentage, 100);
    return finalAmount !== 100;
  }

  listTemplate = (item) => (
    <Translation>
      {(t, { i18 }) => (
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.goalSelector}
          onPress={() => this.onSelectGoal(item)}
        >
          <View style={styles.goalContainer}>
            {selectGoalIcon(item.category, item.mainColor)}
            <View style={styles.goalText}>
              <Text style={styles.goalSelectorText}>{item.title}</Text>
              <Text
                style={[
                  styles.goalRepetitionText,
                  { color: selectColorRepetition(item.repetition) },
                ]}
              >
                {t("Every")} {t(item.repetition)}
              </Text>
            </View>
          </View>
          {this.fillProgress(item) ? (
            <MaterialCommunityIcons name="close" size={30} color="red" />
          ) : (
            <MaterialCommunityIcons name="check" size={30} color="green" />
          )}
        </TouchableOpacity>
      )}
    </Translation>
  );

  gridTemplate = (item) => (
    <Translation>
      {(t, { i18 }) => (
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.goalSelectorGrid}
          onPress={() => this.onSelectGoal(item)}
        >
          <View style={styles.alignCenter}>

            {selectGoalIcon(item.category, item.mainColor)}
            <View>
              <Text style={styles.goalSelectorText}>{item.title}</Text>
              <Text
                style={[
                  styles.goalRepetitionTextGrid,
                  { color: selectColorRepetition(item.repetition) },
                ]}
              >
                {t("Every")} {t(item.repetition)}
              </Text>
            </View>
          </View>
          {this.fillProgress(item) ? (
            <MaterialCommunityIcons name="close" size={30} color="red" />
          ) : (
            <MaterialCommunityIcons name="check" size={30} color="green" />
          )}
        </TouchableOpacity>
      )}
    </Translation>
  );

  goalSelector = ({ item }) => {
    const { template } = this.state;
    const isList = template === "list";

    return isList ? this.listTemplate(item) : this.gridTemplate(item);
  };

  onChangeLayout = (isList) => {
    this.setState({
      template: isList ? "grid" : "list",
      columns: isList ? 2 : 1,
    });
  };

  onChangeSort = (sort) => {
    this.setState({ sort, viewSorts: false });
  };

  goalSelectorHeader = () => {
    const { sort, template } = this.state;
    const isList = template === "list";

    return (
      <Translation>
        {(t, { i18 }) => (
          <View style={styles.goalSelectorHeader}>
            <View style={styles.goalSelectorHeaderFilters}>
              <TouchableOpacity
                style={styles.goalSelectorHeaderFilterIcon}
                activeOpacity={0.3}
                onPress={() => this.setState({ viewSorts: true })}
              >
                <MaterialCommunityIcons
                  name="arrow-down"
                  size={17}
                  color="black"
                />
                <Text style={styles.goalSelectorHeaderText}>{t(sort)}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.3}
                onPress={() => this.onChangeLayout(isList)}
              >
                {isList ? (
                  <MaterialCommunityIcons
                    name="view-list"
                    size={25}
                    color="black"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="view-grid"
                    size={25}
                    color="black"
                  />
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.goalSelectorHeaderText}>
              {t("Select one goal")}
            </Text>
          </View>
        )}
      </Translation>
    );
  };

  sortGoals = (goals, sort) => {
    const newGoals = [...goals];
    if (sort === "Category") {
      return newGoals.sort(categorySort);
    }

  hideDialog = () => {
    this.setState((prevState) => ({ visibleAlert: !prevState.visibleAlert }));
  };

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
    if (sort === "Completed") {
      return newGoals.sort(completedSort);
    }
    return newGoals.sort(nameSort);
  };

    deleteGoals = () => {
      this.hideDialog()
      this.props.removeGoals()
    }

    render() {
      const {
        columns, template, viewSorts, sort, visibleAlert
      } = this.state;
      const { goals, removeGoals } = this.props;
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
        <Translation>
          {(t, { i18 }) => (
          <View style={styles.container}>
            <FocusAwareStatusBar />
            <View style={styles.headerContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{t("Statistics")}</Text>
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
            <Alert
            visibleAlert={visibleAlert}
            hideDialog={this.hideDialog}
            message={t("Delete goals alert")}
            accept={this.deleteGoals}
            noActive
            noMessage="NO"
            yesMessage={t("YES")}
          />
            <BottomSheet
              isVisible={viewSorts}
              modalProps={{
                onRequestClose: () => this.setState({ viewSorts: false }),
              }}
            >
              <Text style={styles.bottomModalTitle}>{t("Sort by")}</Text>
              <View style={styles.headerLine} />
              {list.map((l) => (
                <TouchableOpacity
                  key={l.title}
                  style={[styles.bottomModal, l.containerStyle]}
                  activeOpacity={0.9}
                  onPress={
                    l.title === "Cancel"
                      ? () => l.onPress()
                      : () => this.onChangeSort(l.title)
                  }
                >
                  {l.title !== "Cancel" && (
                    <MaterialCommunityIcons
                      name="arrow-down"
                      size={17}
                      style={l.titleStyle}
                    />
                  )}
                  <Text style={[styles.bottomModalText, l.titleStyle]}>
                    {t(l.title)}
                  </Text>
                </TouchableOpacity>
              ))}
            </BottomSheet>
            <Button onPress={() => this.setState({visibleAlert: true})}>{t("Delete goals")}</Button>
          </View>
        )}
      </Translation>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    goals: state.user.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ removeGoals: deleteTasks }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressHome);
