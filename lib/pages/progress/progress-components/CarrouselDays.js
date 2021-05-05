import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../progress-styles/StatisticsStyles';

const screenWidth = Dimensions.get('window').width;

export default class CarrouselDays extends React.PureComponent {
  render() {
    return (
      <View
        style={[
          styles.carrouselOptions,
          { justifyContent: 'space-around', alignItems: 'center' },
        ]}
      >
        {this.props.goal.days.map((day, index) => (
          <TouchableOpacity
            onPress={() => this.props.changeDate(day)}
            style={[
              styles.carrouselDays,
              {
                borderColor: day.color,
                backgroundColor:
                  day.day + day.date === this.props.dateChoosen
                    ? '#70C5F3'
                    : 'white',
                height:
                  day.day + day.date === this.props.dateChoosen
                    ? screenWidth * 0.165
                    : screenWidth * 0.13,
                width:
                  day.day + day.date === this.props.dateChoosen
                    ? screenWidth * 0.165
                    : screenWidth * 0.13,
              },
            ]}
            key={index + day.date + day.day + day.color + day.percentage}
          >
            <Text
              style={[
                styles.carrouselDayText,
                {
                  color:
                    day.day + day.date === this.props.dateChoosen
                      ? 'white'
                      : 'black',
                },
              ]}
            >
              {day.day}
            </Text>
            <Text
              style={[
                styles.carrouselDayText2,
                {
                  color:
                    day.day + day.date === this.props.dateChoosen
                      ? 'white'
                      : 'black',
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
