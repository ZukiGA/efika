import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import { Translation } from 'react-i18next';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeRoute from './home-route';
import SettingsRoute from './settings-route';
import ProgressRoute from './progress-route';

// Declaring the bottom tab navigator
const Tab = createBottomTabNavigator();

// Intended to be separated
function MainTabNavigator() {
  return (
    <Translation>
        {(t, { i18 }) => (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              } else if (route.name === 'Progress') {
                iconName = focused ? 'stats-chart-sharp' : 'stats-chart-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            initialRouteName: 'Home',
            activeTintColor: '#1979a9',
            inactiveTintColor: 'gray',
            labelStyle: { fontSize: 15 },
            inactiveBackgroundColor: 'white',
            style: { height: 55 },
          }}
        >
          <Tab.Screen name="Home" component={HomeRoute} options={{ tabBarLabel: t('Home')  }} />
          <Tab.Screen name="Progress" component={ProgressRoute} options={{ tabBarLabel: t('Statistics')  }}/>
          <Tab.Screen name="Settings" component={SettingsRoute} options={{ tabBarLabel: t('Settings')  }}/>
        </Tab.Navigator>
      )}
    </Translation>
  );
}

export default MainTabNavigator;
