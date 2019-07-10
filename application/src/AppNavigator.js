import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import ConnectionComponent from './Component/Connection/ConnectionComponent';
import RegisterComponent from './Component/Connection/RegisterComponent';

const AppNavigator = createStackNavigator({
  ConnectionComponent: { 
    screen: ConnectionComponent,
    navigationOptions: {
      header: null
    }
  },
  RegisterComponent: {
    screen: RegisterComponent,
    navigationOptions: {
      header: null
    }
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;