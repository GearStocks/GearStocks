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

import AppMenu from './Component/Menu/Menu.component';

import { user, instanciateUser } from './services/User';

export default class App extends React.Component {
  render() {

    if (!user || user == undefined || user == null) {
      instanciateUser();
    }
    console.disableYellowBox = true;
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
  AppMenu: {
    screen: AppMenu,
    navigationOptions: {
      header: null
    }
  }
});

const AppContainer = createAppContainer(AppNavigator);