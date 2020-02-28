/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2019-12-08 2:23:11 am
 * @copyright GearStocks
 */

import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';

import styles from './Profil.component.style';
import { strings } from '../../../config/strings';
import LoginComponent from '../Connection/Login/Login.component';

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

  handleClick = () => {
    <LoginComponent />;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text h4>Welcome username</Text>
        <Text h5>
          Your mail is : email@email.com
          Your firstname is : firstname 
          Your lastname is : lastname
        </Text>
        <Button title={strings.DISCONNECT} buttonStyle={styles.button} type="outline" onPress={() => this.handleClick()} />
      </View>
    );
  }
}