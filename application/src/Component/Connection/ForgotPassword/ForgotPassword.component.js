/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2020-03-02 6:31:31 pm
 * @copyright GearStocks
 */

import React from 'react';
import { View, Alert } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import styles from './ForgotPassword.component.style';
import { strings, errors } from '../../../../config/strings';

import { user } from '../../../services/User'

export default class ForgotPasswordComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      isSend: false
    };
  }

  handleClick() {
    // eslint-disable-next-line no-useless-escape
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const { email } = this.state;

    const JSONObj = JSON.stringify({
      mail: this.state.email
    });

    if (`${email}` === '')
      Alert.alert(errors.ERR, errors.ERR_EMAIL);
    else if (reg.test(`${email}`) === false)
      Alert.alert(errors.ERR, errors.ERR_INVALID_EMAIL);
    else {
      const { navigate } = this.props.navigation;
      user.forgotPassword(JSONObj, navigate);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{bottom: '30%'}}>
        <Text h4>Enter your email</Text>
        </View>
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          returnKeyType="send"
          blurOnSubmit={false}
          placeholder={strings.ENTER_EMAIL}
          onChangeText={(email) => this.setState({ email })}
        />
        <Button title={strings.SEND} buttonStyle={styles.button} type="outline" onPress={() => this.handleClick()} />
      </View>
    );
  }
}