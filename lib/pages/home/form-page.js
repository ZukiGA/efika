// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import React from 'react';
import {
  Alert,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Translation } from 'react-i18next';
import { Chip, Badge } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Popover from 'react-native-popover-view';

import { addTask } from '../../actions/user';
import FocusAwareStatusBar from '../../components/focus-status-bar';
import ModalView from './home-components/ModalView';
import ModalViewTime from './home-components/ModalViewTime';
import createTask from './home-utils/createTask';
import styles from './home-styles/FormularyStyles';
import { white, strongGrey, softBlue } from '../../styles/color-literals';
import {
  ELEM_CHIPS,
  ELEM_CUANTIFICATION,
  ELEM_REPETITION,
  DAYS
} from './home-constants/form-constants';

class FormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Terminar App',
      switchEnabled: false,
      buttonDisabled: false,
      timesToDo: 2,
      repeat: 0,
      modalTitle: '',
      elementToChangeModal: '',
      modalActive: false,
      modalTimeActive: false,
      elemChips: ELEM_CHIPS,
      elemCuantification: ELEM_CUANTIFICATION,
      elemRepetition: ELEM_REPETITION,
      days: DAYS,

    };
  }

  // For changing elemCuantification
  changeObj = (obj, cat) => {
    this.setState((prevState) => ({
      [obj]: prevState[obj].map((elem) => {
        if (elem.key !== cat) return { key: elem.key, status: false };
        return { key: elem.key, status: !elem.status };
      }),
    }));
  };

  changeRepetitions = (obj, cat) => {
    this.setState((prevState) => ({
      [obj]: prevState[obj].map((elem) => {
        if (elem.key !== cat) return { key: elem.key, status: false };
        return { key: elem.key, status: true };
      }),
    }));
  };

  changeChips = (cat) => {
    this.setState((prevState) => ({
      elemChips: prevState.elemChips.map((elem) => {
        if (elem.key !== cat) {
          return {
            key: elem.key,
            mainColor: elem.mainColor,
            brighterColor: elem.brighterColor,
            darkerColor: elem.darkerColor,
            status: false,
          };
        }
        return {
          key: elem.key,
          mainColor: elem.mainColor,
          brighterColor: elem.brighterColor,
          darkerColor: elem.darkerColor,
          status: !elem.status,
        };
      }),
    }));
  };

  changeTitle = (title) => { this.setState({ title }); };

  changeSwitch = () => {
    this.setState((prevState) => ({ switchEnabled: !prevState.switchEnabled }));
  };

  // for changing day selection
  selectDays = (day) => {
    this.setState((prevState) => ({
      days: prevState.days.map((elem) => {
        if (elem.key !== day) return { key: elem.key, num: elem.num, status: elem.status };
        return { key: elem.key, num: elem.num, status: !elem.status };
      }),
    }));
  };

  changeModalActive = () => {
    this.setState((prevState) => ({ modalActive: !prevState.modalActive }));
  };

  changeModalTimeActive = () => {
    this.setState((prevState) => ({ modalTimeActive: !prevState.modalTimeActive }));
  };

  openModal = (title, elementToChange) => {
    const { elemCuantification } = this.state;
    if ((elemCuantification[0].status && elemCuantification[0].key === elementToChange)
    || (elemCuantification[1].status && elemCuantification[1].key === elementToChange)) {
      this.setState((prevState) => ({
        repeat: 0,
        time: 0,
        elemCuantification: prevState.elemCuantification.map((elem) => {
          return { key: elem.key, status: false };
        }),
      }));
      return;
    }

    if (elementToChange === 'time') {
      this.setState({
        modalTimeTitle: title,
        modalTimeActive: true,
      });
      return;
    }

    this.setState({
      modalTitle: title,
      elementToChangeModal: elementToChange,
      modalActive: true,
    });
  };

  changeElem = (newTime, element) => {
    this.setState({ [element]: newTime });
    if (element !== 'timesToDo') this.changeRepetitions('elemCuantification', element);
  };

  changeCuantificationTime = (minutes, seconds) => {
    this.changeElem([minutes, seconds], 'time');
  };

  addNewTaskRedux = (task) => {
    const { addNewTask } = this.props;
    addNewTask(task);
  };

  // func when you click the button and add to the main page

  addTask = () => {
    const { state } = this;
    const { route } = this.props;
    const { navigation } = this.props;
    let task;

    this.setState({
      buttonDisabled: true,
    });
    let mounted = true;

    setTimeout(() => {
      if (mounted) { this.setState({ buttonDisabled: false }); }
    }, 500);

    try {
      task = createTask(state);
      if (task.typeOfObject === 'error') throw task;
    } catch (e) {
      Alert.alert(`${e.name}`, `${e.message}`);
    }

    this.addNewTaskRedux(task);

    mounted = false;
    route.params.addTask(task);
    navigation.goBack();
  }

  render() {
    const { state } = this;
    const {
      modalActive,
      modalTitle,
      elementToChangeModal,
      modalTimeActive,
      modalTimeTitle,
      title,
      elemChips,
      timesToDo,
      elemRepetition,
      days,
      switchEnabled,
      elemCuantification,
      time,
      repeat,
      buttonDisabled
    } = state;

    return (
      <Translation>
        {(t, { i18 }) => (
        <View style={styles.screenStyle}>
          {modalActive ? (
            <ModalView
              changeModalActive={() => this.changeModalActive()}
              changeElem={(newElem, element) => this.changeElem(newElem, element)}
              title={modalTitle}
              elementToChange={elementToChangeModal}
            />
          ) : null}
          {modalTimeActive ? (
            <ModalViewTime
              changeModalTimeActive={() => this.changeModalTimeActive()}
              changeCuantificationTime={(minutes, seconds) => (
                this.changeCuantificationTime(minutes, seconds)
              )}
              title={modalTimeTitle}
            />
          ) : null}
          <FocusAwareStatusBar />
          <ScrollView style={styles.scrollViewStyle}>
            <View>
              <View style={styles.topElements}>
                <View style={styles.input}>
                  <TextInput
                    placeholder={t("Name of your goal")}
                    onChangeText={this.changeTitle}
                    value={title}
                    style={styles.textInput}
                    textAlign="center"
                  />
                </View>

                <View style={styles.rowChips}>
                  {elemChips.map((elemChip) => (
                    <Chip
                      key={elemChip.key}
                      style={[
                        styles.chipStyle,
                        elemChip.status
                          ? { backgroundColor: elemChip.mainColor }
                          : styles.inactiveChipStyle,
                      ]}
                      onPress={() => this.changeChips(elemChip.key)}
                    >
                      <Text
                        style={[
                          styles.textChipStyle,
                          elemChip.status
                            ? {
                              backgroundColor: elemChip.mainColor,
                              color: white,
                            }
                            : styles.inactiveChipStyle,
                        ]}
                      >
                        {t(elemChip.key)}
                      </Text>
                    </Chip>
                  ))}
                </View>

                <View style={styles.timesStyle}>
                  <TouchableOpacity
                    style={styles.roundedTimes}
                    activeOpacity={1}
                    onPress={() => this.openModal('Times to do', 'timesToDo')}
                  >
                    <Text style={styles.textTitle}>
                      {timesToDo === 0 ? (
                        <Text> {t("Press")} </Text>
                      ) : (
                        <Text>
                          { timesToDo }
                        </Text>
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.bottomElements}>
                <Popover from={(
                  <TouchableOpacity style={styles.rowTitleAndIcon}>
                    <Text style={styles.textTitle}>{t("Repetition of habit")}</Text>
                    <AntDesign name="questioncircleo" size={20} color={strongGrey} />
                  </TouchableOpacity>
                )}
                >
                  <Text>{t("Repetition of habit section")}</Text>
                </Popover>
                <View style={styles.habitsIconsView}>
                  <TouchableOpacity
                    style={styles.iconStyle}
                    onPress={() => this.changeObj('elemRepetition', 'day')}
                  >
                    <MaterialIcons
                      name="today"
                      size={75}
                      color={
                        elemRepetition[0].status
                          ? softBlue
                          : strongGrey
                      }
                    />
                    <Text style={styles.textIconStyle}>{t("day")}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconStyle}
                    onPress={() => this.changeObj('elemRepetition', 'week')}
                  >
                    <MaterialCommunityIcons
                      name="calendar-week"
                      size={75}
                      color={
                        elemRepetition[1].status
                          ? softBlue
                          : strongGrey
                      }
                    />
                    <Text style={styles.textIconStyle}>{t("week")}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconStyle}
                    onPress={() => this.changeObj('elemRepetition', 'month')}
                  >
                    <MaterialCommunityIcons
                      name="calendar-month"
                      size={75}
                      color={
                        elemRepetition[2].status
                          ? softBlue
                          : strongGrey
                      }
                    />
                    <Text style={styles.textIconStyle}>{t("month")}</Text>
                  </TouchableOpacity>
                </View>

                {elemRepetition[0].status ? (
                  <View style={styles.daysSectionStyle}>
                    {days.map((day) => (
                      <TouchableOpacity
                        key={day.key}
                        style={[
                          styles.dayStyle,
                          day.status ? styles.activeDay : styles.inactiveDay,
                        ]}
                        onPress={() => this.selectDays(day.key)}
                      >
                        <Text
                          style={[
                            styles.textIconStyle,
                            day.status
                              ? styles.activeDayText
                              : styles.inactiveDayText,
                          ]}
                        >
                          {t(day.key)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : null}

                <View style={styles.cuantificacionStyle}>
                  <Text style={styles.textTitle}>{t("Optional")}</Text>
                  <Switch
                    onValueChange={this.changeSwitch}
                    value={switchEnabled}
                    trackColor={{ false: '#DADADA', true: '#8ad4ff' }}
                    thumbColor={switchEnabled ? '#1389CE' : '#7a7a7a'}
                  />
                </View>

                {switchEnabled ? (
                  <View style={styles.cuantificacionViewStyle}>
                    <Popover from={(
                      <TouchableOpacity style={styles.rowTitleAndIcon}>
                        <Text> {t("How are you going to quantify?")} </Text>
                        <AntDesign name="questioncircleo" size={15} color={strongGrey} />
                      </TouchableOpacity>
                    )}
                    >
                      <Text>{t("This option allows")}</Text>
                    </Popover>
                    <View style={styles.habitsIconsView}>
                      <TouchableOpacity
                        style={styles.iconStyle}
                        onPress={() => this.openModal('Pick time', 'time')}
                      >
                        <MaterialCommunityIcons
                          name={
                            elemCuantification[0].status
                              ? 'clock-time-eight-outline'
                              : 'clock-time-eight'
                          }
                          color={
                            elemCuantification[0].status
                              ? '#1389CE'
                              : '#4B4B4B'
                          }
                          size={65}
                        />
                        {elemCuantification[0].status ? (
                          <Badge style={styles.badgeStyle}>
                            <Text>
                              {time[0]}
                              :
                              {time[1]}
                            </Text>
                          </Badge>
                        ) : null}
                        <Text> {t("Time")} </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.iconStyle}
                        onPress={() => this.openModal('Pick repetitions', 'repeat')}
                      >
                        <MaterialCommunityIcons
                          name="repeat"
                          size={65}
                          color={
                              elemCuantification[1].status
                                ? '#1389CE'
                                : '#4B4B4B'
                          }
                        />
                        {elemCuantification[1].status ? (
                          <Badge style={styles.badgeStyle}>
                            <Text>
                              {repeat}
                            </Text>
                          </Badge>
                        ) : null}
                        <Text> {t("Repetition")} </Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                ) : null}
              </View>
            </View>

            <TouchableOpacity
              style={styles.roundedButton}
              onPress={this.addTask}
              disabled={buttonDisabled}
            >
              <Text style={styles.textRoundedButton}>{t("Add Goal")}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
      </Translation>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addNewTask: addTask }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
