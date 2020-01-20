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
      address: '',
      phonenumber: '',
      birthday: '',
      civility: '',
      login: false
    };
  }


  handleClick() {
    const { navigate } = this.props.navigation;
    const { email, password, username, firstname, lastname,
      confirmPassword, address, phonenumber, birthday, civility } = this.state;
    // eslint-disable-next-line no-useless-escape
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const JSONObj = JSON.stringify({
      mail: this.state.email,
      password: this.state.password,
      userName: this.state.username,
      firstName: this.state.firstname,
      lastName: this.state.lastname,
      civility: this.state.civility,
      address: this.state.address,
      phone: this.state.phonenumber,
      birthDay: this.state.birthday
    });

    console.log(JSONObj);

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
      Alert.alert(errors.ERR, errors.ERR_MATCH_PASSWORD);
    else if (`${civility}` === '')
      Alert.alert(errors.ERR, errors.ERR_CIVILITY);
    else if (`${address}` === '')
      Alert.alert(errors.ERR, errors.ERR_ADDRESS);
    else if (`${phonenumber}` === '')
      Alert.alert(errors.ERR, errors.ERR_PHONE_NUMBER);
    else if (`${birthday}` === '')
      Alert.alert(errors.ERR, errors.ERR_BIRTHDAY);
    else {*/
      axios.post(routes.REGISTER, JSONObj, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          console.log('RESPONSE RECEIVED: ', res);
          navigate('AppMenu');
        })
        .catch((err) => {
          navigate('AppMenu');
          //Alert.alert(err.name, err.message);
        });
    //}
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
          leftIcon={<Icon name='person' size={24} color='black' />}
          placeholder={strings.USERNAME}
          onChangeText={(username) => this.setState({ username })}
        />
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          returnKeyType='next'
          ref={(input) => { this.firstname = input; }}
          onSubmitEditing={() => this.lastname.focus()}
          leftIcon={<Icon name='contacts' size={24} color='black' />}
          placeholder={strings.FIRSTNAME}
          onChangeText={(firstname) => this.setState({ firstname })}
        />
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          returnKeyType='next'
          onSubmitEditing={() => this.email.focus()}
          leftIcon={<Icon name='contacts' size={24} color='black' />}
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
          leftIcon={<Icon name='mail' size={24} color='black' />}
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
          onSubmitEditing={() => this.civility.focus()}
          returnKeyType="next"
          placeholder={strings.CONFIRM_PASSWORD}
          secureTextEntry={true}
          leftIcon={<Icon name='lock' size={24} color='black' />}
          onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
        />
        <Input
          ref={(input) => { this.civility = input; }}
          onSubmitEditing={() => this.address.focus()}
          returnKeyType="next"
          placeholder={strings.CIVILITY}
          secureTextEntry={true}
          leftIcon={<Icon name='info' size={24} color='black' />}
          onChangeText={(civility) => this.setState({ civility })}
        />
        <Input
          ref={(input) => { this.address = input; }}
          onSubmitEditing={() => this.phonenumber.focus()}
          returnKeyType="next"
          placeholder={strings.ADDRESS}
          secureTextEntry={true}
          leftIcon={<Icon name='flag' size={24} color='black' />}
          onChangeText={(address) => this.setState({ address })}
        />
        <Input
          ref={(input) => { this.phonenumber = input; }}
          onSubmitEditing={() => this.birthday.focus()}
          returnKeyType="next"
          placeholder={strings.PHONE_NUMBER}
          secureTextEntry={true}
          leftIcon={<Icon name='phone' size={24} color='black' />}
          onChangeText={(phonenumber) => this.setState({ phonenumber })}
        />
        <Input
          ref={(input) => { this.birthday = input; }}
          returnKeyType="go"
          placeholder={strings.BIRTHDAY}
          secureTextEntry={true}
          leftIcon={<Icon name='info' size={24} color='black' />}
          onChangeText={(birthday) => this.setState({ birthday })}
        />
        <Button title={strings.REGISTER} buttonStyle={styles.button} type="outline" onPress={() => this.handleClick()} />
        <Button title={strings.LOGIN} buttonStyle={styles.button} type="outline" onPress={() => this.props.navigation.navigate('LoginComponent')} />
      </View>
    );
  }
}