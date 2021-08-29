import React from 'react';
import { View, TouchableOpacity } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';

import { createStackNavigator } from '@react-navigation/stack';

import HomePage from '../pages/home/home-page';
import FormPage from '../pages/home/form-page';
import TaskPage from '../pages/home/task-page';

const HomeStack = createStackNavigator();

// Declaration of each StackScreen with their respective names
function HomeRoute() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Formulary"
        component={FormPage}
        options={{
          title: 'Add task',
          headerStyle: {
            backgroundColor: '#1389CE',
            height: 80,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <HomeStack.Screen
        name="TaskPage"
        component={TaskPage}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: route.params.mainColor,
            height: 80,
          },
          headerRight: () => (
            <View>
              <TouchableOpacity
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ marginRight: 20 }}
                onPress={
                  () => route.params.removeTask(route.params.item.id, route.params.item.title)
}
              >
                <Ionicons name="trash-outline" size={45} />
              </TouchableOpacity>
            </View>
          ),
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            alignSelf: 'center',
          },
          title: route.params.item.title,
        })}
      />
    </HomeStack.Navigator>
  );
}

export default HomeRoute;
