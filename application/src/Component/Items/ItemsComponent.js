/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2019-12-05 4:04:46 pm
 * @copyright GearStocks
 */

import React from 'react';
import { Text, View, Platform, TouchableHighlight } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import FlatGrid from 'react-native-super-grid';

import { styles } from './Home.component.style';

export default class ItemsComponent extends React.Component {

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
      const items = [
        { name: 'PNEU', code: '#1abc9c', brand: 'Porsche' }, { name: 'EMERALD', code: '#2ecc71', brand: 'Porsche' },
        { name: 'PETER RIVER', code: '#3498db', brand: 'Porsche' }, { name: 'AMETHYST', code: '#9b59b6', brand: 'Porsche' },
        { name: 'WET ASPHALT', code: '#34495e', brand: 'Porsche' }, { name: 'GREEN SEA', code: '#16a085', brand: 'Porsche' },
        { name: 'NEPHRITIS', code: '#27ae60', brand: 'Porsche' }, { name: 'BELIZE HOLE', code: '#2980b9', brand: 'Porsche' },
        { name: 'WISTERIA', code: '#8e44ad', brand: 'Porsche' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50', brand: 'Porsche' }
      ];
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 30, top: 35 }}>GearStocks</Text>
          <Icon name='format-align-justify' size={30} color='black'
            containerStyle={{ right: 170, top: 2 }} onPress={() => { this.props.navigation.openDrawer(); }} />
            <Text>{this.props.example}</Text>
        </View>
      );
    }
  }