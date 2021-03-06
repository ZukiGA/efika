import React from 'react';
import { Dimensions } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import SettingsPage from '../pages/settings/settings-page';

const SettingsStack = createStackNavigator();
const screenWidth = Dimensions.get('window').width;

function SettingsRoute() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsPage}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleStyle: {
            fontSize: screenWidth * 0.09,
            color: 'black',
          },
        }}
      />
    </SettingsStack.Navigator>
  );
}

export default SettingsRoute;
