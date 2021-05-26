import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import styles from '../home-styles/cardTaskStyle';

const CardTask = (props) => {
  const { navigateCardTask, item } = props;
  const { mainColor, text } = item;
  return (
    <TouchableOpacity onPress={navigateCardTask}>
      <View style={[styles.card, { backgroundColor: mainColor }]}>
        <Text style={styles.text}>{item.title}</Text>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardTask;
