import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import ConnectionComponent from './Component/Connection/ConnectionComponent';
import RegisterComponent from './Component/Connection/Register/Register.component';
//import ForgotPasswordComponent from './Component/Connection/ForgotPassword/ForgotPassword.component';

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
  /*ForgotPasswordComponent: {
    screen: ForgotPasswordComponent,
    navigationOptions: {
      header: null
    }
  }*/
});

const AppContainer = createAppContainer(AppNavigator);


export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}