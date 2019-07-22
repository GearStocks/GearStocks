import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginComponent from './Component/Connection/Login/Login.component';
import RegisterComponent from './Component/Connection/Register/Register.component';
import ForgotPasswordComponent from './Component/Connection/ForgotPassword/ForgotPassword.component';

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

const AppNavigator = createStackNavigator({
  LoginComponent: {
    screen: LoginComponent,
    navigationOptions: {
      header: null
    }
  },
  RegisterComponent: {
    screen: RegisterComponent,
    navigationOptions: {
      header: null
    }
  },
  ForgotPasswordComponent: {
    screen: ForgotPasswordComponent,
    navigationOptions: {
      title: 'Forgot Password'
    }
  }
});

const AppContainer = createAppContainer(AppNavigator);