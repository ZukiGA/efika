/* eslint-disable no-unused-vars */
import React from 'react';
import { Dimensions } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const screenWidth = Dimensions.get('window').width;

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barPercentage: 75,
      width: 35,
    };
  }

  render() {
    const { width, barPercentage } = this.state;
    return (
      <AnimatedCircularProgress
        size={screenWidth - 50}
        width={width}
        fill={barPercentage}
        tintColor="#0dceda"
        backgroundColor="#212121"
      >
        {() => (
          <AnimatedCircularProgress
            size={screenWidth - 150}
            width={width}
            fill={80}
            tintColor="#6ef3d6"
            backgroundColor="#757575"
          >
            {() => (
              <AnimatedCircularProgress
                size={screenWidth - 250}
                width={width}
                fill={50}
                tintColor="#c6fce5"
                backgroundColor="#BDBDBD"
              />
            )}
          </AnimatedCircularProgress>
        )}
      </AnimatedCircularProgress>
    );
  }
}
