/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2019-12-08 2:15:57 am
 * @copyright GearStocks
 */

import React from 'react';
import { Text, View, Platform, Image, FlatList } from 'react-native';
import { SearchBar, Icon, Card } from 'react-native-elements';
import FlatGrid from 'react-native-super-grid';

import { styles } from './Home.component.style';

import { listParts } from '../../services/Search'

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
//    this.setState({ search });
    this.launchSearch(search);
  };
  
  launchSearch = (search) => {
    const JSONObj = JSON.stringify({
      keyWord: search
    });
    listParts(this, JSONObj);
  };

  render() {
    const { search, response } = this.state;
    console.log(response);
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
          <Card containerStyle={{padding: 0}}>
            {
              response.map((r, i) => {
                return (
                  <View key={i} style={{width: '100%'}}>
                    <Image
                      resizeMode="cover"
                      source={{ uri: r.photo }}
                    />
                    <Text style={styles.name}>{u.name}</Text>
                  </View>
                );
              })
            }
          </Card>

          <FlatList style={{flex: 1, flexDirection: 'column', width: '100%'}}
            data={response}
            renderItem={({ item, index }) => (
                <View id={index} style={{width: '100%'}}>
                  <Image style={{flex: 1}} source={require('./alpine_a310_filtre_a_air.jpg')}/>
                </View>
            )}
            keyExtractor={(item, index) => index + ""}
          />
          {/*
          <FlatGrid
            itemDimension={130}
            items={response}
            style={styles.gridView}
            renderItem={({ item, index }) => (
              <View style={{flex: 1, flexDirection: 'column', width: '100%', backgroundColor: item.code }}>
                <Image style={{flex: 1}} source={require('./alpine_a310_filtre_a_air.jpg')}/>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCode}>{item.brand}</Text>
              </View>
            )}
            />*/}
        </View>
    );
  }
}