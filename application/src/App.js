/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2019-12-05 4:06:08 pm
 * @copyright GearStocks
 */

import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginComponent from './Component/Connection/Login/Login.component';
import RegisterComponent from './Component/Connection/Register/Register.component';
import ForgotPasswordComponent from './Component/Connection/ForgotPassword/ForgotPassword.component';
import UserInformationsComponent from './Component/Profil/UserInformations/UserInformations.component';

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
  },
  UserInformationsComponent: {
    screen: UserInformationsComponent,
    navigationOptions: {
      header: null
    }
  }
});

const AppContainer = createAppContainer(AppNavigator);