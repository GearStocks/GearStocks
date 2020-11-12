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
import { user } from '../../../services/User';

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
        email: this.state.email,
        password: this.state.password,
        username: this.state.username,
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        birthDay: "05/09/1997"
      });
      user.register(JSONObj, navigate);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={{ bottom: '5%' }}>
          <Text style={{ fontSize: 30 }}>
            Register
        </Text>
        </View>
        <View style={{ width: '100%' }}>
          <Input
            autoCapitalize='none'
            autoCorrect={false}
            returnKeyType='next'
            errorMessage={this.state.errorUsername}
            inputContainerStyle={{
              borderColor: colors.PRIMARY_COLOR, borderWidth: 2
            }}
            onSubmitEditing={() => this.firstname.focus()}
            ref={(input) => { this.username = input; }}
            leftIcon={<Icon name='person' size={24} color='black' />}
            placeholder={strings.USERNAME}
            onChangeText={(username) => this.setState({ username })}
          />
          <Input
            containerStyle={{ top: 5 }}
            autoCorrect={false}
            returnKeyType='next'
            errorMessage={this.state.errorFirstname}
            inputContainerStyle={{
              borderColor: colors.PRIMARY_COLOR, borderWidth: 2
            }}
            ref={(input) => { this.firstname = input; }}
            onSubmitEditing={() => this.lastname.focus()}
            leftIcon={<Icon name='contacts' size={24} color='black' />}
            placeholder={strings.FIRSTNAME}
            onChangeText={(firstname) => this.setState({ firstname })}
          />
          <Input
            autoCorrect={false}
            containerStyle={{ top: 10 }}
            returnKeyType='next'
            errorMessage={this.state.errorLastname}
            inputContainerStyle={{
              borderColor: colors.PRIMARY_COLOR, borderWidth: 2
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
            returnKeyType='next'
            inputContainerStyle={{
              borderColor: colors.PRIMARY_COLOR, borderWidth: 2
            }}
            ref={(input) => { this.email = input; }}
            onSubmitEditing={() => this.password.focus()}
            blurOnSubmit={false}
            placeholder={strings.EMAIL}
            leftIcon={<Icon name='mail' size={24} color='black' />}
            onChangeText={(email) => this.setState({ email })}
          />
          <Input
            autoCapitalize='none'
            ref={(input) => { this.password = input; }}
            onSubmitEditing={() => this.confirmPassword.focus()}
            errorMessage={this.state.errorPassword}
            containerStyle={{ top: 20 }}
            inputContainerStyle={{
              borderColor: colors.PRIMARY_COLOR, borderWidth: 2
            }}
            returnKeyType='next'
            placeholder={strings.PASSWORD}
            secureTextEntry={true}
            leftIcon={<Icon name='lock' size={24} color='black' />}
            onChangeText={(password) => this.setState({ password })}
          />
          <Input
            autoCapitalize='none'
            ref={(input) => { this.confirmPassword = input; }}
            inputContainerStyle={{
              borderColor: colors.PRIMARY_COLOR, borderWidth: 2
            }}
            containerStyle={{ top: 25 }}
            errorMessage={this.state.errorConfirmPassword}
            onSubmitEditing={() => this.confirmPassword.focus()}
            returnKeyType='next'
            placeholder={strings.CONFIRM_PASSWORD}
            secureTextEntry={true}
            leftIcon={<Icon name='lock' size={24} color='black' />}
            onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
          />
          <Button title={strings.REGISTER} buttonStyle={{ top: '10%' }} type='outline' onPress={() => this.handleClick(navigate)} />
          <Button title={strings.LOGIN} buttonStyle={{ top: '15%' }} type='outline' onPress={() => navigate('LoginComponent')} />
        </View>
      </View>
    );
  }
}