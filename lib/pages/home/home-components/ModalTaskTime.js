/* eslint-disable react/prefer-stateless-function */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Modal, View, Text, TouchableOpacity, Dimensions
} from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

import styles from '../home-styles/ModalTaskTimeStyle';

const widthScreen = Dimensions.get('window').width;

class ModalTaskTime extends React.Component {
  constructor(props) {
    super(props);
    const { quantity, amount } = props;
    this.state = {
      isPlaying: false,
      blockedClose: false,
      finished: false,
      lastTime: quantity,
      amount,
      completedTime: 0
    };
  }

  onComplete() {
    const { idTask, changeCuantification, continueProgress } = this.props;
    const { completedTime, lastTime } = this.state;
    this.setState({ finished: true, isPlaying: false });
    changeCuantification(idTask, completedTime + lastTime);
    // continueProgress();
  }

  formatTimer(remainingTime, animatedColor) {
    const { isPlaying, finished } = this.state;

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60 === 0 ? '00' : remainingTime % 60;
    if (finished) {
      return (<Text>Has acabado por hoy!</Text>);
    }
    return (
      <View>
        <Text style={[styles.timerText, { color: animatedColor }]}>
          {minutes}
          :
          {seconds}
        </Text>
        <View style={styles.playPauseView}>
          {isPlaying
            ? <Ionicons name="pause" size={35} onPress={() => this.pauseButton(remainingTime)} />
            : <Ionicons name="play" size={35} onPress={() => this.togglePlaying()} />}
        </View>
      </View>
    );
  }

  togglePlaying() {
    this.setState((prevState) => ({ isPlaying: !prevState.isPlaying }));
  }

  pauseButton(time) {
    const { lastTime, completedTime } = this.state;
    const addedTime = completedTime + lastTime - time;
    this.setState({
      completedTime: addedTime,
      lastTime: time,
      blockedClose: false,
    });
    this.togglePlaying();
  }

  closeModal() {
    const { completedTime, isPlaying, amount } = this.state;
    if (isPlaying) {
      this.setState({ blockedClose: true });
      return;
    }
    const { changeModalTimeActive, changeCuantification, idTask } = this.props;
    changeCuantification(idTask, completedTime - amount);
    changeModalTimeActive();
  }

  render() {
    const { props, state } = this;
    const { isPlaying, blockedClose } = state;
    const { mainColor, quantity, completedCuantification } = props;
    return (
      <Modal transparent statusBarTranslucent visible>
        <View style={styles.container}>
          <View style={styles.pickerContainer}>
            <View style={[styles.header, { backgroundColor: mainColor }]}>
              <View>
                <Ionicons name="close" size={35} color={mainColor} />
              </View>
              <Text style={styles.textHeader}>Calcula tu tiempo</Text>
              <TouchableOpacity>
                <Ionicons name="close" size={35} onPress={() => this.closeModal()} />
              </TouchableOpacity>
            </View>

            <CountdownCircleTimer
              isPlaying={isPlaying}
              duration={Math.trunc(quantity - completedCuantification)}
              onComplete={() => this.onComplete()}
              colors={mainColor}
              size={widthScreen * 0.6}
            >
              {({ remainingTime, animatedColor }) => {
                return (
                  this.formatTimer(remainingTime, animatedColor)
                );
              }}
            </CountdownCircleTimer>

            {blockedClose ? <Text style={styles.alertText}>Pausa antes de salir</Text> : null }

          </View>
        </View>
      </Modal>
    );
  }
}

export default ModalTaskTime;
