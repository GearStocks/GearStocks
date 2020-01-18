/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2019-12-05 4:19:32 pm
 * @copyright GearStocks
 */

import React from 'react';
import { View, TouchableOpacity, Image, Alert, AsyncStorage } from 'react-native';
import { Button, Input, Icon, Text } from 'react-native-elements';
import { strings, errors } from '../../../../config/strings';
import { routes } from '../../../../config/routes';
import * as onLogin from '../../../services/POST/PostLogin';

import styles from './Login.component.style';
const axios = require('axios');

/* eslint-disable no-undef */
/* eslint-disable no-console */

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      hidePassword: true,
      isAuthorized: false
    };
  }

  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  handleClick() {
    const { navigate } = this.props.navigation;
    // eslint-disable-next-line no-useless-escape
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const { email, password } = this.state;

    const JSONObj = JSON.stringify({
      mail: this.state.email,
      password: this.state.password
    });

    /*onLogin.onLogin(JSONObj).then((res) => { //any payload you want to send just for example
      navigate('UserInformationsComponent');
    });*/

    axios.post(routes.CONNECT, JSONObj, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        console.log('RESPONSE RECEIVED: ', res);
        console.log('JSON => ', JSON.stringify(res));
        this.setState({ isAuthorized: true });
        navigate('UserInformationsComponent');
      })
      .catch((err) => {
        Alert.alert(err.name, err.message);
        console.log('message', err.status);

        // DEBUG
        //console.log('JSON => ', JSON.stringify(err));

        navigate('UserInformationsComponent');
      });

    /*
  if (`${email}` === '' && `${password}` === '')
    Alert.alert(errors.ERR, errors.ERR_EMAIL_PASSWORD);
  else if (`${email}` === '')
    Alert.alert(errors.ERR, errors.ERR_EMAIL);
  else if (reg.test(`${email}`) === false)
    Alert.alert(errors.ERR, errors.ERR_INVALID_EMAIL);
  else if (`${password}` === '')
    Alert.alert(errors.ERR, errors.ERR_PASSWORD);
  else {
  navigate('UserInformationsComponent');
  }*/


  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text h2>Login</Text>
        <Input
          inputStyle={styles.input}
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          returnKeyType='next'
          onSubmitEditing={() => this.password.focus()}
          blurOnSubmit={false}
          placeholder={strings.EMAIL}
          leftIcon={<Icon name='person' size={24} color='black' />}
          onChangeText={(email) => this.setState({ email })}
        />

        <Input
          ref={(input) => { this.password = input; }}
          returnKeyType="go"
          placeholder={strings.PASSWORD}
          secureTextEntry={this.state.hidePassword}
          leftIcon={<Icon name='lock' size={24} color='black' />}
          rightIcon={
            <TouchableOpacity activeOpacity={0.8} style={styles.visibilityBtn} onPress={this.managePasswordVisibility}>
              <Image source={(this.state.hidePassword) ? require('../../../../assets/hide.png') : require('../../../../assets/view.png')} style={styles.btnImage} />
            </TouchableOpacity>
          }
          onChangeText={(password) => this.setState({ password })}
        />
        <Button title={strings.FORGOT_PASSWORD} type="clear" onPress={() => navigate('ForgotPasswordComponent')} />
        <Button title={strings.CONNECTION} buttonStyle={styles.button} type="outline" onPress={() => this.handleClick()} />
        <Button title={strings.REGISTER} buttonStyle={styles.button} type="outline" onPress={() => navigate('RegisterComponent')} />
      </View>
    );
  }
}
