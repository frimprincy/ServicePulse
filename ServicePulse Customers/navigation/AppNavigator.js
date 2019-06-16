import React from 'react';
import { createAppContainer, createSwitchNavigator,createStackNavigator } from 'react-navigation';

import WelcomeStack from './../screens/WelcomeScreen';
import AppDrawerStackNavigator from './MainDrawerNavigator';
import CommercialDetails from './../components/projects/commercialSubDetails';






export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Welcome: WelcomeStack,
  MainDrawer: AppDrawerStackNavigator,
 
}));




