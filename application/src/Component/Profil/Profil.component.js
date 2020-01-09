/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2019-12-08 2:23:11 am
 * @copyright GearStocks
 */

import React from 'react';
import { Text, View } from 'react-native';


export default class ProfilComponent extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> This is my Profil screen </Text>
      </View>
    );
  }
}