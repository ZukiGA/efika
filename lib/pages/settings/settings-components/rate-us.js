import React from 'react';
import { View } from 'react-native';
import { Overlay, Rating } from 'react-native-elements';

export default class RateUs extends React.Component {
  toggleOverlay = () => {
    const { dropPress } = this.props;
    dropPress();
  };

  render() {
    const { active } = this.props;
    return (
      <View>
        <Overlay isVisible={active} onBackdropPress={this.toggleOverlay}>
          <Rating />
        </Overlay>
      </View>
    );
  }
}
