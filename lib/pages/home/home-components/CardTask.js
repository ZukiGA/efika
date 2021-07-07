import React from 'react';
import {
  View, TouchableOpacity, Text
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { styles, heightCard } from '../home-styles/cardTaskStyle';

const CardTask = (props) => {
  const { navigateCardTask, item } = props;
  const {
    mainColor, text, title, completedTimes, timesToDo
  } = item;
  const fill = Math.trunc((completedTimes / timesToDo) * 100);
  const size = (Math.trunc(heightCard * 0.5));
  const width = (Math.trunc(heightCard * 0.08));

  return (
    <TouchableOpacity onPress={navigateCardTask}>
      <View style={[styles.card,
        // eslint-disable-next-line react-native/no-inline-styles
        { backgroundColor: mainColor, padding: 20 }]}
      >

        <View style={styles.titleCardTask}>
          <Text style={styles.text} adjustsFontSizeToFit>{title}</Text>
        </View>

        <View style={styles.graphCardTask}>
          <AnimatedCircularProgress
            rotation={360}
            size={size}
            width={width}
            fill={fill}
            tintColor="#0dceda"
            backgroundColor="#DADADA"
          >
            { () => (
              <Text>
                {fill}
                %
              </Text>
            ) }
          </AnimatedCircularProgress>
        </View>

      </View>
    </TouchableOpacity>
  );
};

export default CardTask;
