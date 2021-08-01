/* eslint-disable react/prefer-stateless-function */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Modal, View, Text, TouchableOpacity
} from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

import styles from '../home-styles/ModalTaskTimeStyle';

const formatTimer = (remainingTime, animatedColor) => {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60 === 0 ? '00' : remainingTime % 60;
  return (
    <Text style={[styles.timerText, { color: animatedColor }]}>
      {minutes}
      :
      {seconds}
    </Text>
  );
};

class ModalTaskTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
    };
  }

  togglePlaying() {
    this.setState((prevState) => ({ isPlaying: !prevState.isPlaying }));
  }

  render() {
    const { props, state } = this;
    const { isPlaying } = state;
    const { changeModalTimeActive, mainColor } = props;
    return (
      <Modal transparent statusBarTranslucent visible>
        <View style={styles.container}>
          <View style={styles.pickerContainer}>
            <View style={[styles.header, {backgroundColor: mainColor}]}>
              <View>
                <Ionicons name="close" size={35} color={mainColor} />
              </View>
              <Text style={styles.textHeader}>time</Text>
              <TouchableOpacity>
                <Ionicons name="close" size={35} onPress={changeModalTimeActive} />
              </TouchableOpacity>
            </View>

            <CountdownCircleTimer
              isPlaying={isPlaying}
              duration={60}
              colors={mainColor}
            >
              {({ remainingTime, animatedColor }) => (
                formatTimer(remainingTime, animatedColor)
              )}
            </CountdownCircleTimer>

            {
               isPlaying
                 ? <Ionicons name="pause" size={35} onPress={() => this.togglePlaying()} />
                 : <Ionicons name="play" size={35} onPress={() => this.togglePlaying()} />
            }

          </View>
        </View>
      </Modal>
    );
  }
}

export default ModalTaskTime;
