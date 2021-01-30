import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LoginScreen from 'src/screens/login-screen/login-screen';
import SignupDataScreen from 'src/screens/signup-data-screen/signup-data-screen';
import SignupScreen from 'src/screens/signup-screen/signup-screen';
import {WelcomeScreen} from 'src/screens/welcome-screen';
import NavigationRoutes from './NavigationRoutes';

const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={NavigationRoutes.WELCOME} component={WelcomeScreen} />
      <Stack.Screen name={NavigationRoutes.LOGIN} component={LoginScreen} />
      <Stack.Screen name={NavigationRoutes.SIGNUP} component={SignupScreen} />
      <Stack.Screen
        name={NavigationRoutes.SIGNUP_DATA}
        component={SignupDataScreen}
      />
    </Stack.Navigator>
  );
};
