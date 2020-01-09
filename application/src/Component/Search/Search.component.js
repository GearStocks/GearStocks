/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2019-12-08 2:18:26 am
 * @copyright GearStocks
 */

import React from 'react';
import { Text, View, Platform } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default class SearchComponent extends React.Component {

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