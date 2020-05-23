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
import SearchComponent from '../Search/Search.component';

export default class AppMenu extends React.Component {
  render() {    
    if (this.props.navigation.state.params.token)
      return ( <AppContainer screenProps={this.props.navigation.state.params.token} />);
    else
      console.log("No token");
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
    Search: {
      screen: SearchComponent,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="search" size={25} color={tintColor} />
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