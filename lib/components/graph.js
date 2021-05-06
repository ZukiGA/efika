/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    const { width } = this.props;
    this.state = {
      width: width * 0.14,
      size: width,
      fontSize: width * 0.26,
    };
  }

  render() {
    const { goal, color } = this.props;
    const { fontSize, width, size } = this.state;
    return (
      <AnimatedCircularProgress
        size={size}
        width={width}
        fill={goal.percentage}
        tintColor={color}
        backgroundColor="#DADADA"
      >
        {() => <Text style={{ fontSize, color }}>{goal.percentage} %</Text>}
      </AnimatedCircularProgress>
    );
  }
}
