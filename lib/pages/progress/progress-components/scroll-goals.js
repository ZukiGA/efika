import React from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import {
  black,
  coolGray,
  mediumGray,
  white,
} from '../../../styles/color-literals';
import styles from '../progress-styles/styles';

const screenWidth = Dimensions.get('window').width;

class ScrollGoals extends React.PureComponent {
  render() {
    const { goalChosen, changeGoal, goals } = this.props;
    return (
      <ScrollView
        style={[styles.carrouselOptions, styles.backgroundGray]}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {goals.map((label) => (
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

const mapStateToProps = (state) => {
  return {
    goals: state.user.tasks,
  };
};

export default connect(mapStateToProps)(ScrollGoals);
