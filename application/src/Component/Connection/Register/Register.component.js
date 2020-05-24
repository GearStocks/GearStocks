/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2020-01-18 8:11:53 pm
 * @copyright GearStocks
 */

import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';


import { strings, errors } from '../../../../config/strings';
import styles from './Register.component.style';
import colors from '../../../../config/colors';
import PostRegister from '../../../services/POST/PostRegister';

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
      errorUsername: '',
      errorFirstname: '',
      errorLastname: '',
      errorEmail: '',
      errorPassword: '',
      errorConfirmPassword: '',
      date: '01-01-2017'
    };
  }

  handleClick = (navigate) => {
    const { email, password, username, firstname, lastname, confirmPassword, date } = this.state;
    // eslint-disable-next-line no-useless-escape
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (`${username}` === '')
      this.setState({ errorUsername: errors.ERR_USERNAME });
    if (`${firstname}` === '')
      this.setState({ errorFirstname: errors.ERR_FIRSTNAME });
    if (`${lastname}` === '')
      this.setState({ errorLastname: errors.ERR_LASTNAME });
    if (`${email}` === '')
      this.setState({ errorEmail: errors.ERR_EMAIL });
    if (reg.test(`${email}`) === false)
      this.setState({ errorEmail: errors.ERR_INVALID_EMAIL });
    if (`${password}` === '' && `${confirmPassword}` === '')
      this.setState({ errorPassword: errors.ERR_PASSWORD });
    if (`${password}` != `${confirmPassword}`)
      this.setState({ errorPassword: errors.ERR_MATCH_PASSWORD });
    else if (this.state.email &&
      this.state.password && this.state.username &&
      this.state.firstname && this.state.lastname) {
      const JSONObj = JSON.stringify({
        mail: this.state.email,
        password: this.state.password,
        username: this.state.username,
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        birthDay: "05/09/1997"
      });
      new PostRegister().register(JSONObj, navigate);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView >
          <Text style={styles.title}>Register</Text>
          <Input
            autoCapitalize='none'
            autoCorrect={false}
            label='Username'
            labelStyle={{ bottom: 5, left: 10 }}
            returnKeyType='next'
            errorMessage={this.state.errorUsername}
            errorStyle={{ fontSize: 13 }}
            inputContainerStyle={{
              borderColor: colors.PRIMARY_COLOR, borderTopWidth: 2,
              borderRightWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2
            }}
            onSubmitEditing={() => this.firstname.focus()}
            ref={(input) => { this.username = input; }}
            leftIcon={<Icon name='person' size={24} color='black' />}
            placeholder={strings.USERNAME}
            onChangeText={(username) => this.setState({ username })}
          />
          <Input
            autoCapitalize='none'
            label='Firstname'
            labelStyle={{ bottom: 5, left: 10 }}
            containerStyle={{ top: 5 }}
            autoCorrect={false}
            returnKeyType='next'
            errorMessage={this.state.errorFirstname}
            errorStyle={{ fontSize: 13 }}
            inputContainerStyle={{
              borderColor: colors.PRIMARY_COLOR, borderTopWidth: 2,
              borderRightWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2
            }}
            ref={(input) => { this.firstname = input; }}
            onSubmitEditing={() => this.lastname.focus()}
            leftIcon={<Icon name='contacts' size={24} color='black' />}
            placeholder={strings.FIRSTNAME}
            onChangeText={(firstname) => this.setState({ firstname })}
          />
          <Input
            autoCapitalize='none'
            autoCorrect={false}
            label='Lastname'
            containerStyle={{ top: 10 }}
            labelStyle={{ bottom: 5, left: 10 }}
            returnKeyType='next'
            errorMessage={this.state.errorLastname}
            errorStyle={{ fontSize: 13 }}
            inputContainerStyle={{
              borderColor: colors.PRIMARY_COLOR, borderTopWidth: 2,
              borderRightWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2
            }}
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
            errorMessage={this.state.errorEmail}
            containerStyle={{ top: 15 }}
            errorStyle={{ fontSize: 13 }}
            label='Email'
            labelStyle={{ bottom: 5, left: 10 }}
            returnKeyType='next'
            inputContainerStyle={{
              borderColor: colors.PRIMARY_COLOR, borderTopWidth: 2,
              borderRightWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2
            }}
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
            errorMessage={this.state.errorPassword}
            containerStyle={{ top: 20 }}
            label='Password'
            labelStyle={{ bottom: 5, left: 10 }}
            errorStyle={{ fontSize: 13 }}
            inputContainerStyle={{
              borderColor: colors.PRIMARY_COLOR, borderTopWidth: 2,
              borderRightWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2
            }}
            returnKeyType='next'
            placeholder={strings.PASSWORD}
            secureTextEntry={true}
            leftIcon={<Icon name='lock' size={24} color='black' />}
            onChangeText={(password) => this.setState({ password })}
          />
          <Input
            ref={(input) => { this.confirmPassword = input; }}
            inputContainerStyle={{
              borderColor: colors.PRIMARY_COLOR, borderTopWidth: 2,
              borderRightWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2
            }}
            errorStyle={{ fontSize: 13 }}
            containerStyle={{ top: 25 }}
            errorMessage={this.state.errorConfirmPassword}
            label='Confirm Password'
            labelStyle={{ bottom: 5, left: 10 }}
            onSubmitEditing={() => this.civility.focus()}
            returnKeyType='next'
            placeholder={strings.CONFIRM_PASSWORD}
            secureTextEntry={true}
            leftIcon={<Icon name='lock' size={24} color='black' />}
            onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
          />
          <Button title={strings.REGISTER} buttonStyle={styles.button} type='outline' onPress={() => this.handleClick(navigate)} />
          <Button title={strings.LOGIN} buttonStyle={styles.button2} type='outline' onPress={() => navigate('LoginComponent')} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}