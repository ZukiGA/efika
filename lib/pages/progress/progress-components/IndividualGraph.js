import React from 'react';
import { Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barPercentage: this.props.goal.percentage,
      fill: 'hola',
      width: this.props.width * 0.14,
      size: this.props.width,
      color: this.props.color,
      fontSize: this.props.width * 0.26,
    };
  }

  render() {
    return (
      <AnimatedCircularProgress
        size={this.state.size}
        width={this.state.width}
        fill={this.props.goal.percentage}
        tintColor={this.props.color}
        backgroundColor="#DADADA"
      >
        {() => (
          <Text
            style={{ fontSize: this.state.fontSize, color: this.props.color }}
          >
            {this.props.goal.percentage}%
          </Text>
        )}
      </AnimatedCircularProgress>
    );
  }
}
