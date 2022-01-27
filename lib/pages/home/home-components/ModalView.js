// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Translation } from 'react-i18next';
import { Divider } from 'react-native-paper';

import styles from '../home-styles/ModalViewStyle';
import { softBlue } from '../../../styles/color-literals';

class ModalView extends React.Component {
  constructor(props) {
    super(props);
    const { title } = props;
    this.state = {
      title,
      numbs: [...new Array(99)].map((value, index) => (index + 1).toString()),
    };
  }

  renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.flatListItem}
      key={index}
      onPress={() => this.pickElement(item)}
    >
      <Text style={styles.flatListTitle}>
        {' '}
        {item}
        {' '}
      </Text>
    </TouchableOpacity>
  );

  componentDidMount = () => {
    const { props } = this;
    const { title, elementToChange } = props;
    this.setState({
      title,
      elementToChange,
    });
  };

  pickElement = (item) => {
    const { props, state } = this;
    const { changeElem, changeModalActive } = props;
    const { elementToChange } = state;

    changeElem(item, elementToChange);
    changeModalActive();
  };

  render() {
    const { props, state } = this;
    const { changeModalActive } = props;
    const { title, numbs } = state;
    return (
      <Translation>
        {(t, { i18 }) => (
        <Modal
          transparent
          statusBarTranslucent
          visible
          animationType="slide"
        >
          <View style={styles.container}>
            <View style={styles.pickerContainer}>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => changeModalActive()}>
                  <Ionicons name="close" size={35} />
                </TouchableOpacity>
                <Text style={styles.titleStyle}>{t(title)}</Text>
                <View>
                  <Ionicons name="close" size={35} color={softBlue} />
                </View>
              </View>

              <View style={styles.flatListContainer}>
                <FlatList
                  data={numbs}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={Divider}
                  renderItem={this.renderItem}
                  initialNumToRender={5}
                  maxToRenderPerBatch={25}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
      </Translation>
    );
  }
}

export default ModalView;
