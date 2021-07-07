// eslint-disable-next-line import/no-extraneous-dependencies
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from '../home-styles/cardTaskStyle';

const AddCardTask = (props) => {
  const { item, navigateFormulary } = props;
  const { color, title } = item;
  return (
    <TouchableOpacity onPress={navigateFormulary}>
      <View
        style={[
          styles.card,
          // eslint-disable-next-line react-native/no-inline-styles
          { backgroundColor: color, alignItems: 'center', padding: 50 },
        ]}
      >
        <Text style={[
          styles.text,
          // eslint-disable-next-line react-native/no-inline-styles
          { textAlign: 'center' }
        ]}
        >
          {title}
        </Text>
        <AntDesign name="pluscircleo" size={55} />
      </View>
    </TouchableOpacity>
  );
};

export default AddCardTask;
