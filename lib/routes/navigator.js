/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import LoginRoute from './login-route';
import TabNavigator from './tab-navigator';

const Stack = createStackNavigator();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

// We haven't finished checking for the token yet
class Navigator extends React.PureComponent {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        {this.props.user.uid === null ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : this.props.user.uid === undefined ||
          this.props.user.uid === 'null' ? (
          // No token found, user isn't signed in
          <Stack.Screen
            name="LoginRoute"
            component={LoginRoute}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          // User is signed in
          <Stack.Screen name="Home" component={TabNavigator} />
        )}
      </Stack.Navigator>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Navigator);
