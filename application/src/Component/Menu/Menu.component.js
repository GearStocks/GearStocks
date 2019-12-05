/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2019-12-05 4:04:46 pm
 * @copyright GearStocks
 */

import React from 'react';
import { Text, View, Platform, StyleSheet, Image } from 'react-native';
import FlatGrid from 'react-native-super-grid';
import { Icon, SearchBar } from 'react-native-elements';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

export default class AppMenu extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

class HomeComponent extends React.Component {
  render() {
    const items = [
      { name: 'TURQUOISE', code: '#1abc9c', brand: 'Porsche' }, { name: 'EMERALD', code: '#2ecc71', brand: 'Porsche' },
      { name: 'PETER RIVER', code: '#3498db', brand: 'Porsche' }, { name: 'AMETHYST', code: '#9b59b6', brand: 'Porsche' },
      { name: 'WET ASPHALT', code: '#34495e', brand: 'Porsche' }, { name: 'GREEN SEA', code: '#16a085', brand: 'Porsche' },
      { name: 'NEPHRITIS', code: '#27ae60', brand: 'Porsche' }, { name: 'BELIZE HOLE', code: '#2980b9', brand: 'Porsche' },
      { name: 'WISTERIA', code: '#8e44ad', brand: 'Porsche' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50', brand: 'Porsche' }
    ];
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FlatGrid
          itemDimension={130}
          items={items}
          style={styles.gridView}
          renderItem={({ item, index }) => (
            //<Image source={require('../../../assets/view.png')} />,
            <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCode}>{item.brand}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});

class SearchComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> This is my Explore screen </Text>
        <SearchBar
          lightTheme
          platform={Platform.OS === 'android' ? 'android' : 'ios'}
          placeholder="Type Here"
          onChangeText={this.updateSearch}
          value={search}
        />
      </View>
    );
  }
}

class ProfilComponent extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> This is my Profil screen </Text>
      </View>
    );
  }
}

const bottomTabNavigator = createBottomTabNavigator(
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