/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2019-12-05 4:04:46 pm
 * @copyright GearStocks
 */

import React from 'react';
import { Icon } from 'react-native-elements';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import HomeComponent from '../Home/Home.component';
import ProfilComponent from '../Profil/Profil.component';
import LoginComponent from '../Connection/Login/Login.component';

export default class AppMenu extends React.Component {
  render() {
    console.log(this.props.navigation.state.params)
    if (this.props.navigation.state.params.token)
      return (<AppContainer screenProps={{
        token: this.props.navigation.state.params.token,
        email: this.props.navigation.state.params.email
      }} />);
    else
      <LoginComponent />
  }
}

const bottomTabNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeComponent,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={25} color={tintColor} />
        )
      }
    },
    Profil: {
      screen: ProfilComponent,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="person" size={25} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: 'Home'
  }
);

const AppContainer = createAppContainer(bottomTabNavigator);