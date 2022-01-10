// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Translation } from 'react-i18next';
import styles from '../home-styles/ModalViewTimeStyles';
import { softBlue } from '../../../styles/color-literals';

class ModalViewTime extends React.Component {
  constructor(props) {
    super(props);
    const { title } = props;
    this.state = {
      title,
      minutes: '',
      seconds: '',
    };
  }

  onChangeText(text, type) {
    if (!/^\d*$/.test(text)) return;
    if (type === 'seconds' && parseInt(text, 10) > 59) return;
    this.setState({
      [type]: text,
    });
    if (type === 'minutes' && text.length === 2) {
      this.secondTextInput.focus();
    }
  }

  onPressOut(type) {
    const { state } = this;
    if (state[type].length === 1) {
      this.setState({
        [type]: `0${state[type]}`,
      });
    }
  }

  pressOkButton() {
    const { state, props } = this;
    let { minutes, seconds } = state;
    const { changeCuantificationTime, changeModalTimeActive } = props;
    if (minutes === '') minutes = '00';
    if (seconds === '') seconds = '00';
    if (seconds.length === 1) seconds = `0${seconds}`;
    changeCuantificationTime(minutes, seconds);
    changeModalTimeActive();
  }

  render() {
    const { state, props } = this;
    const { title, minutes, seconds } = state;
    const { changeModalTimeActive } = props;
    return (
      <Translation>
        {(t, { i18 }) => (
        <Modal transparent statusBarTranslucent visible>
          <View style={styles.container}>
            <View style={styles.pickerContainer}>
              <View style={styles.header}>
                <View>
                  <Ionicons name="close" size={35} color={softBlue} />
                </View>
                <Text style={styles.textHeader}>{t(title)}</Text>
                <TouchableOpacity onPress={changeModalTimeActive}>
                  <Ionicons name="close" size={35} />
                </TouchableOpacity>
              </View>
              <View style={styles.inputs}>
                <TextInput
                  value={minutes}
                  onChangeText={(text) => this.onChangeText(text, 'minutes')}
                  onEndEditing={() => this.onPressOut('minutes')}
                  keyboardType="numeric"
                  maxLength={2}
                  placeholder="00"
                  textAlign="right"
                  placeholderTextColor="#CACACA"
                  style={styles.textInput}
                />
                <Text style={styles.subindex}>m</Text>
                <Text style={styles.textInput}>: </Text>
                <TextInput
                  value={seconds}
                  onChangeText={(text) => this.onChangeText(text, 'seconds')}
                  onEndEditing={() => this.onPressOut('seconds')}
                  keyboardType="number-pad"
                  maxLength={2}
                  placeholder="00"
                  textAlign="right"
                  placeholderTextColor="#CACACA"
                  ref={(input) => {
                    this.secondTextInput = input;
                  }}
                  style={styles.textInput}
                />
                <Text style={styles.subindex}>s</Text>
              </View>
              {minutes !== '' || parseInt(seconds, 10) > 10 ? (
                <TouchableOpacity
                  style={styles.okButton}
                  onPress={() => this.pressOkButton()}
                >
                  <Text style={styles.okText}>OK!</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </Modal>
      )}
      </Translation>
    );
  }
}

export default ModalViewTime;
