import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginPage from '../pages/login/login-page';
import SignupPage from '../pages/login/signup-page';

const LoginStack = createStackNavigator();

function LoginRoute() {
  return (
    <LoginStack.Navigator headerMode="screen">
      <LoginStack.Screen
        name="LoginScreen"
        component={LoginPage}
        options={{
          headerShown: false,
        }}
      />
      <LoginStack.Screen
        name="SignUpScreen"
        component={SignupPage}
        options={{
          headerShown: true,
          title: 'Register',
          headerTitle: 'Create a new account',
        }}
      />
    </LoginStack.Navigator>
  );
}

export default LoginRoute;
