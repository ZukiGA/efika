import React from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import generalData from '../../../data/Goals';
import styles from '../progress-styles/styles';
import {
  white,
  coolGray,
  black,
  mediumGray,
} from '../../../styles/color-literals';

const screenWidth = Dimensions.get('window').width;

class ScrollGoals extends React.PureComponent {
  render() {
    const { goalChosen, changeGoal } = this.props;
    return (
      <ScrollView
        style={[styles.carrouselOptions, styles.backgroundGray]}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {generalData.map((label) => (
          <View key={label.title}>
            <TouchableOpacity
              style={[
                {
                  backgroundColor:
                    goalChosen === label.title ? coolGray : white,
                  paddingHorizontal: screenWidth * 0.05,
                },
                styles.borderRightGray,
              ]}
              underlayColor="#ffffff"
              activeOpacity={0.8}
              onPress={() => changeGoal(label.title)}
            >
              <Text
                style={[
                  styles.carrouselText,
                  {
                    color: goalChosen === label.title ? black : mediumGray,
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

export default ScrollGoals;
