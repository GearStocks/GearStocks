/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2019-12-08 2:15:57 am
 * @copyright GearStocks
 */

import React from 'react';
import { Text, View, Platform, Alert } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import FlatGrid from 'react-native-super-grid';

import { styles } from './Home.component.style';

export default class HomeComponent extends React.Component {

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
      Alert.alert("zob", "obe");
  };
  
  render() {
    const { search } = this.state;
    const items = [
      { name: 'TURQUOISE', code: '#1abc9c', brand: 'Porsche' }, { name: 'EMERALD', code: '#2ecc71', brand: 'Porsche' },
      { name: 'PETER RIVER', code: '#3498db', brand: 'Porsche' }, { name: 'AMETHYST', code: '#9b59b6', brand: 'Porsche' },
      { name: 'WET ASPHALT', code: '#34495e', brand: 'Porsche' }, { name: 'GREEN SEA', code: '#16a085', brand: 'Porsche' },
      { name: 'NEPHRITIS', code: '#27ae60', brand: 'Porsche' }, { name: 'BELIZE HOLE', code: '#2980b9', brand: 'Porsche' },
      { name: 'WISTERIA', code: '#8e44ad', brand: 'Porsche' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50', brand: 'Porsche' }
    ];
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, top: 35 }}>GearStocks</Text>
        <Icon name='format-align-justify' size={30} color='black'
        containerStyle={{ right: 170, top: 2 }} />
        <SearchBar
          containerStyle={{ top: 20, borderColor: '#5dade2', borderTopWidth: 2, borderBottomWidth: 2,
          borderLeftWidth: 2, borderRightWidth: 2 }}
          lightTheme
          platform={Platform.OS === 'android' ? 'android' : 'ios'}
          placeholder="What do you want ?"
          onChangeText={this.updateSearch}
          value={search}
        />
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