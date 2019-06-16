import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';


import AppDrawerStackNavigator from './DrawerNavigation';
import WelcomeStack from './../screens/welcomeScreen';


export default createAppContainer(createSwitchNavigator({
  Welcome:WelcomeStack,
  Main:AppDrawerStackNavigator,
 
}));