/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2019-12-08 2:18:26 am
 * @copyright GearStocks
 */

import React from 'react';
import { Text, View, Platform, Alert } from 'react-native';
import { SearchBar, Button } from 'react-native-elements';

import styles from './Search.component.style';
import { strings, errors } from '../../../config/strings';

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

  handleClick = () => {
    const { search } = this.state;

    if (`${search}` === '')
      Alert.alert(errors.ERR, errors.ERR_SEARCH);
  };

  render() {
    const { search } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> Search </Text>
        <SearchBar
          lightTheme
          platform={Platform.OS === 'android' ? 'android' : 'ios'}
          placeholder="Type Here"
          onChangeText={this.updateSearch}
          value={search}
        />
        <Button title={strings.SEARCH} buttonStyle={styles.button} type="outline" onPress={() => this.handleClick()} />
      </View>
    );
  }
}