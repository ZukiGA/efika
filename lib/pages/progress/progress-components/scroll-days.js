/* eslint-disable object-curly-newline */
import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import styles from '../progress-styles/styles';
import { white, black, coolBlue } from '../../../styles/color-literals';

const screenWidth = Dimensions.get('window').width;

export default class ScrollDays extends React.PureComponent {
  render() {
    const { days, changeDate, dateChosen } = this.props;
    return (
      <View style={[styles.carrouselOptions, styles.spaceAroundCenter]}>
        {days.map((day) => (
          <TouchableOpacity
            onPress={() => changeDate(day)}
            style={[
              styles.carrouselDays,
              {
                borderColor: day.color,
                backgroundColor:
                  day.day + day.date === dateChosen ? coolBlue : white,
                height:
                  day.day + day.date === dateChosen
                    ? screenWidth * 0.165
                    : screenWidth * 0.13,
                width:
                  day.day + day.date === dateChosen
                    ? screenWidth * 0.165
                    : screenWidth * 0.13,
              },
            ]}
            key={day.date + day.day + day.color + day.percentage}
          >
            <Text
              style={[
                styles.carrouselDayText,
                {
                  color: day.day + day.date === dateChosen ? white : black,
                },
              ]}
            >
              {day.day}
            </Text>
            <Text
              style={[
                styles.carrouselDayText2,
                {
                  color: day.day + day.date === dateChosen ? white : black,
                },
              ]}
            >
              {day.date}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}
