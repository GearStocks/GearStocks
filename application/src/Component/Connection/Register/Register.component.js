/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2020-01-18 8:11:53 pm
 * @copyright GearStocks
 */

import React from 'react';
import { View, Alert } from 'react-native';
import { Input, Text, Icon, Button } from 'react-native-elements';
import { strings, errors } from '../../../../config/strings';
import styles from './Register.component.style';
import { routes } from '../../../../config/routes';

const axios = require('axios');

/* eslint-disable no-undef */
/* eslint-disable no-console */

export default class RegisterComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      login: false
    };
  }


  handleClick() {
    // eslint-disable-next-line no-useless-escape
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const JSONObj = JSON.stringify({
      mail: this.state.email,
      password: this.state.password,
      username: this.state.username
    });

    axios.post(routes.REGISTER, JSONObj, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        console.log('RESPONSE RECEIVED: ', res);
      })
      .catch((err) => {
        Alert.alert(err.name, err.message);
      });


    /*if (`${username}` === '')
      Alert.alert(errors.ERR, errors.ERR_USERNAME);
    else if (`${firstname}` === '')
      Alert.alert(errors.ERR, errors.ERR_FIRSTNAME);
    else if (`${lastname}` === '')
      Alert.alert(errors.ERR, errors.ERR_LASTNAME);
    else if (`${email}` === '')
      Alert.alert(errors.ERR, errors.ERR_EMAIL);
    else if (reg.test(`${email}`) === false)
      Alert.alert(errors.ERR, errors.ERR_INVALID_EMAIL);
    else if (`${password}` === '' && `${confirmPassword}` === '')
      Alert.alert(errors.ERR, errors.ERR_PASSWORD);
    else if (`${password}` != `${confirmPassword}`)
      Alert.alert(errors.ERR, errors.ERR_MATCH_PASSWORD);*/
  }

  render() {
    return (
      <View style={styles.container}>
        <Text h2>Register</Text>
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          returnKeyType='next'
          onSubmitEditing={() => this.firstname.focus()}
          ref={(input) => { this.username = input; }}
          placeholder={strings.USERNAME}
          onChangeText={(username) => this.setState({ username })}
        />
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          returnKeyType='next'
          ref={(input) => { this.firstname = input; }}
          onSubmitEditing={() => this.lastname.focus()}
          placeholder={strings.FIRSTNAME}
          onChangeText={(firstname) => this.setState({ firstname })}
        />
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          returnKeyType='next'
          onSubmitEditing={() => this.email.focus()}
          ref={(input) => { this.lastname = input; }}
          placeholder={strings.LASTNAME}
          onChangeText={(lastname) => this.setState({ lastname })}
        />
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          returnKeyType='next'
          ref={(input) => { this.email = input; }}
          onSubmitEditing={() => this.password.focus()}
          blurOnSubmit={false}
          placeholder={strings.EMAIL}
          leftIcon={<Icon name='person' size={24} color='black' />}
          onChangeText={(email) => this.setState({ email })}
        />
        <Input
          ref={(input) => { this.password = input; }}
          onSubmitEditing={() => this.confirmPassword.focus()}
          returnKeyType="next"
          placeholder={strings.PASSWORD}
          secureTextEntry={true}
          leftIcon={<Icon name='lock' size={24} color='black' />}
          onChangeText={(password) => this.setState({ password })}
        />
        <Input
          ref={(input) => { this.confirmPassword = input; }}
          returnKeyType="go"
          placeholder={strings.CONFIRM_PASSWORD}
          secureTextEntry={true}
          leftIcon={<Icon name='lock' size={24} color='black' />}
          onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
        />
        <Button title={strings.REGISTER} buttonStyle={styles.button} type="outline" onPress={() => this.handleClick()} />
        <Button title={strings.LOGIN} buttonStyle={styles.button} type="outline" onPress={() => this.props.navigation.navigate('LoginComponent')} />
      </View>
    );
  }
}