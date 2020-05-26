/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2019-12-08 2:15:57 am
 * @copyright GearStocks
 */

import React from 'react';
import { Text, View, Platform, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';

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

  onPress = (item) => {
    const { navigate } = this.props.navigation;
    navigate('ItemComponent', {item});
  }

  render() {
    const { search, response } = this.state;
    var images = [];
    for (const item of response) {
      images.push(
        <TouchableOpacity onPress={() => this.onPress(item)} key={item} activeOpacity={0.75} style={{width: '100%', borderWidth: 1, borderColor: "#20232a", borderRadius: 6}}>
          <View style={{width: '99%', aspectRatio: 1}} >
            <Image style= {{resizeMode: 'contain', aspectRatio: 1}} source={{ uri: item.image }} />
            <Text style={{ fontSize: 30 }}>{item.name}</Text>
            <Text style={{ fontSize: 30 }}>{item.price}</Text>
          </View>
        </TouchableOpacity>
      );
    }
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
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
              {images}
            </View>
          </ScrollView>
         

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

/*
 <View style={{width: '99%', height: undefined, aspectRatio: 1}} >
            <Image style= {{resizeMode: 'contain', width: undefined, height: undefined, aspectRatio: 1}}
            source={require('./alpine_a310_filtre_a_air.jpg')}
              />
          </View>
*/