import React from 'react';
import { Dimensions } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import ProgressPage from '../pages/progress/progress-page';

const ProgressStack = createStackNavigator();
const screenWidth = Dimensions.get('window').width;

function StatisticsStackScreen() {
  return (
    <ProgressStack.Navigator headerMode="none">
      <ProgressStack.Screen
        name="Progress"
        component={ProgressPage}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#DADADA',
          },
          headerTitleStyle: {
            fontSize: screenWidth * 0.09,
            color: '#5D4D4A',
          },
        }}
      />
    </ProgressStack.Navigator>
  );
}

export default StatisticsStackScreen;
