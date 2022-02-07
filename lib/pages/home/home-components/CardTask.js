import React from 'react';
import {
  View, TouchableOpacity, Text
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Translation } from 'react-i18next';

import { styles, heightCard } from '../home-styles/cardTaskStyle';


import getCurrentDate from '../home-utils/getCurrentDate';

const CardTask = (props) => {
  const { navigateCardTask, item } = props;
  const {
    mainColor, title, completedTimes, timesToDo
  } = item;

  const textProgress = () => {
    const today = new Date();
    const { initialDate, repetition, daysToDo, quantityCuantification, cuantification } = item;
    const [year, mth, date] = getCurrentDate(repetition, today, new Date(initialDate));

    if(!daysToDo[year] || !daysToDo[year][mth] || !daysToDo[year][mth][date]) return 100;
    const { status } = daysToDo[year][mth][date];
    if(cuantification === 'none'){
      return status === 'completed' || status === 'none' ? 100 : 0;
    }
    const { amount } = daysToDo[year][mth][date];
    return (amount / quantityCuantification) * 100;
  }

  const fill = textProgress();
  const size = (Math.trunc(heightCard * 0.5));
  const width = (Math.trunc(heightCard * 0.08));
  // console.log(fill)

  return (     
    <Translation>
      {(t, { i18 }) => (
      <TouchableOpacity onPress={navigateCardTask}>
        <View style={[styles.card,
          // eslint-disable-next-line react-native/no-inline-styles
          { backgroundColor: mainColor, padding: 20 }]}
        >

          <View style={styles.titleCardTask}>
            <Text style={styles.text} adjustsFontSizeToFit>{title}</Text>
          </View>

          <View style={styles.graphCardTask}>
            {fill === 100 ? 
            <Text style={styles.textCompleted}>{t('Completed for today')}</Text>
            :
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
              }
          </View>

        </View>
      </TouchableOpacity>
     )}
    </Translation>
  );
};

export default CardTask;
