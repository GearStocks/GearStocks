/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2019-12-08 2:15:57 am
 * @copyright GearStocks
 */

import React from 'react';
import { Text, View, Platform, Alert } from 'react-native';
import { SearchBar, Icon, Button } from 'react-native-elements';
import FlatGrid from 'react-native-super-grid';
import SearchHeader from 'react-native-search-header';

import { styles } from './Home.component.style';
import { routes } from '../../../config/routes';
import { test } from '../../services/POST/PostLogin';

const axios = require('axios');

export default class HomeComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      search: null,
      response: [],
      namePart: '',
    };
  }

  updateSearch = search => {
    this.setState({ search });
    this.launchSearch(search);
  };

  launchSearch = (search) => {
    if (search === null) {
        Alert.alert(
          "Error",
          "Please enter an item",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
    } else {
    const JSONObj = JSON.stringify({
      keyWord: search
    });
    axios.post(routes.LIST_PARTS, JSONObj, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then((res) => {
        let items;
        this.state.response = [];
        for (const responseData of res.data.parts) {
          console.log("input " + search)
          if (responseData.name ) {
          items = { name: responseData.name, code: '#1abc9c', price: responseData.price }
          this.state.response.push(items);
          }
        }
        console.log("ici " + JSON.stringify(this.state.response));
        this.forceUpdate();
      })
      .catch((err) => {
        console.log(err.name, err.message);
      });
    }
  };

  render() {
    const { search, response } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, top: 35 }}>GearStocks</Text>
        <Icon name='format-align-justify' size={30} color='black'
          containerStyle={{ right: 170, top: 2 }} onPress={() => { this.props.navigation.openDrawer(); }} />
        <SearchBar
          containerStyle={{
            top: 20, borderColor: '#5dade2', borderTopWidth: 2, borderBottomWidth: 2,
            borderLeftWidth: 2, borderRightWidth: 2
          }}
          lightTheme
          returnKeyType='none'
          platform={Platform.OS === 'android' ? 'android' : 'ios'}
          autoCapitalize='none'
          placeholder="What do you want ?"
          onChangeText={(search) => this.updateSearch(search)}
          value={search}
        />
        <FlatGrid
          itemDimension={130}
          items={response}
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
