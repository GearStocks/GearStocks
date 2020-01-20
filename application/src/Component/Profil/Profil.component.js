/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2019-12-08 2:23:11 am
 * @copyright GearStocks
 */

import React from 'react';
import { Text, View } from 'react-native';

import styles from './Profil.component.style';

export default class ProfilComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      phonenumber: '',
      birthday: '',
      civility: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text h3>Welcome 'USER'</Text>
        <Text h5>
          Your mail is : email@email.com
          Your username is : username
          Your firstname is : firstname
          Your lastname is : lastname
        </Text>
      </View>
    );
  }
}