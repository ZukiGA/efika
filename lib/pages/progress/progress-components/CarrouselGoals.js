import React from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { generalData } from '../../../data/Goals';
import { styles } from '../progress-styles/StatisticsStyles';

const screenWidth = Dimensions.get('window').width;

class CarrouselDays extends React.PureComponent {
  render() {
    return (
      <ScrollView
        style={[styles.carrouselOptions, { backgroundColor: 'gray' }]}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {generalData.map((label, index) => (
          <View>
            <TouchableOpacity
              style={{
                backgroundColor:
                  this.props.goalChoosen === label.title ? '#DADADA' : 'white',
                paddingHorizontal: screenWidth * 0.05,
                borderRightColor: 'gray',
                borderRightWidth: 1,
              }}
              underlayColor="#ffffff"
              activeOpacity={0.8}
              onPress={() => this.props.changeGoal(label.title)}
            >
              <Text
                style={[
                  styles.carrouselText,
                  {
                    color:
                      this.props.goalChoosen === label.title
                        ? 'black'
                        : '#757575',
                  },
                ]}
              >
                {label.title}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  }
}

export default CarrouselDays;
