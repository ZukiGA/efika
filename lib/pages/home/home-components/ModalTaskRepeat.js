// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Modal, View, Text, TextInput, TouchableOpacity,
} from 'react-native';
import styles from '../home-styles/ModalTaskRepeatStyle';

class ModalTaskRepeat extends React.Component {
  constructor(props) {
    super(props);
    const { completedCuantification } = props;
    this.state = ({
      newRepetitions: '',
      completedCuantification
    });
  }

  onChangeText(text) {
    if (!/^\d*$/.test(text)) return;
    this.setState({ newRepetitions: text });
  }

  addRepetitions() {
    const { state, props } = this;
    const { changeCuantification, idTask, quantity } = props;
    const { completedCuantification } = state;
    const addedRepetitions = parseInt(state.newRepetitions, 10);
    const newCuantification = (addedRepetitions + completedCuantification) > quantity
      ? quantity
      : addedRepetitions + completedCuantification;
    this.setState({ completedCuantification: newCuantification });
    changeCuantification(idTask, newCuantification);
  }

  render() {
    const { props, state } = this;
    const { newRepetitions, completedCuantification } = state;
    const {
      changeModalRepeatActive, mainColor
    } = props;
    return (
      <Modal transparent statusBarTranslucent visible>
        <View style={styles.container}>
          <View style={styles.pickerContainer}>
            <View style={[styles.header, { backgroundColor: mainColor }]}>
              <View>
                <Ionicons name="close" size={35} color={mainColor} />
              </View>
              <Text style={styles.textHeader}>Calcula tus repeticiones</Text>
              <TouchableOpacity>
                <Ionicons name="close" size={35} onPress={changeModalRepeatActive} />
              </TouchableOpacity>
            </View>
            <View style={styles.body}>
              <TextInput
                onChangeText={(text) => this.onChangeText(text)}
                placeholder="00"
                style={styles.textInput}
                keyboardType="numeric"
                maxLength={3}
                value={newRepetitions}
              />
              <TouchableOpacity
                onPress={() => this.addRepetitions()}
                style={[styles.roundedButton, { backgroundColor: mainColor }]}
              >
                <Text style={styles.textRoundedButton}>Añadir repeticiones</Text>
              </TouchableOpacity>
              <Text>
                Repeticiones ya realizadas:
                {completedCuantification}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ModalTaskRepeat;
