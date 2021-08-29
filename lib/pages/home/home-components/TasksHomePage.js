// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../home-styles/HomeScreenStyle';

const TasksHomePage = (props) => {
  const { task } = props;
  const { icon } = task;
  (
    <View style={[styles.containerSquare, { borderColor: props.task.mainColor }]}>
      <View style={styles.logo}>
        <Ionicons name={icon} size={65} color="black" />
      </View>
      <View style={styles.columnaMitad}>
        <Text style={styles.textMeta}>
          {' '}
          {props.task.meta}
          {' '}
        </Text>
        <Text style={styles.textCantidad}>
          {' '}
          {props.task.proporcion}
          {' '}
        </Text>
      </View>
    </View>
  );
};

export default TasksHomePage;
