/* eslint-disable react/prefer-stateless-function */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Modal, View, Text, TextInput, TouchableOpacity
} from 'react-native';
import styles from '../home-styles/ModalTaskRepeatStyle';

class ModalTaskRepeat extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      newRepetitions: '',
    });
  }

  onChangeText(text) {
    if (!/^\d*$/.test(text)) return;
    this.setState({ newRepetitions: text });
  }

  render() {
    const { props, state } = this;
    const { newRepetitions } = state;
    const { changeModalRepeatActive, mainColor } = props;
    return (
      <Modal transparent statusBarTranslucent visible>
        <View style={styles.container}>
          <View style={styles.pickerContainer}>
            <View style={[styles.header, { backgroundColor: mainColor }]}>
              <View>
                <Ionicons name="close" size={35} color={mainColor} />
              </View>
              <Text style={styles.textHeader}>Repeat</Text>
              <TouchableOpacity>
                <Ionicons name="close" size={35} onPress={changeModalRepeatActive} />
              </TouchableOpacity>
            </View>
            <View style={styles.inputs}>
              <TextInput
                onChangeText={(text) => this.onChangeText(text)}
                placeholder="00"
                style={styles.textInput}
                keyboardType="numeric"
                maxLength={3}
                value={newRepetitions}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ModalTaskRepeat;
