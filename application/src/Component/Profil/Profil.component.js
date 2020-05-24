/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2019-12-08 2:23:11 am
 * @copyright GearStocks
 */

import React from 'react';
import { View } from 'react-native';
import { Updates } from 'expo';
import { Text, Button, Icon, Input } from 'react-native-elements';

import styles from './Profil.component.style';
import { strings, errors } from '../../../config/strings';
import colors from '../../../config/colors';
import { routes } from '../../../config/routes';
import LoginComponent from '../Connection/Login/Login.component';

const axios = require('axios');

export default class ProfilComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'e',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
      birthday: '',
      errorUsername: '',
      errorFirstname: '',
      errorLastname: '',
      errorEmail: '',
      errorPassword: '',
      errorNewPassword: '',
      errorConfirmPassword: '',
    };
  }

  getInfoUser = function(token, email) {
    console.log("ICI" + token, email)
    const JSONObj = JSON.stringify({
      userToken: token,
      mail: email
    });
    axios.post(routes.INFO_USER, JSONObj, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then((res) => {
        console.log('RESPONSE RECEIVED: ', res.data.Data);
        //const json = JSON.stringify(res.data.Data);
        console.log("Get Value username " + JSON.stringify(res.data.Data['username']));
        //this.setState({ email: json.res.data.Data['email'] });
        this.setState({ firstname: res.data.Data.firstName });
        this.setState({ lastname: res.data.Data.lastName });
        this.setState({ username: res.data.Data.username });
        this.setState({ password: res.data.Data.password });
      })
      .catch((err) => {
        console.log(err.name, err.message);
      });
  }

  disconnect = function(email) {
    console.log(email);
    const JSONObj = JSON.stringify({
      mail: email
    });
    axios.post(routes.DISCONNECT, JSONObj, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((res) => {
      this.props.screenProps.token = null;
      Updates.reload();
    })
    .catch((err) => {
      console.log(err.name, err.message);
    });
  }
  
  checkError = (zob) => {
    const { email, password, username, firstname, lastname, confirmPassword, date } = this.state;
    // eslint-disable-next-line no-useless-escape
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const JSONObj = JSON.stringify({
      mail: this.state.email,
      password: this.state.password,
      username: this.state.username,
      firstName: this.state.firstname,
      lastName: this.state.lastname,
      birthDay: "05/10/2007",
    });

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
    else
    this.updateInfoUser(JSONObj, `${email}`);
  }

  updateInfoUser = function(email) {
    const JSONObj = JSON.stringify({
      mail: email
    });
    axios.post(routes.INFO_USER, JSONObj, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then((res) => {
        console.log('RESPONSE RECEIVED:zob ', res.data.Data);
        this.setState({ email: json['email'] });
        this.setState({ firstname: res.data.Data.firstName });
        this.setState({ lastname: res.data.Data.lastName });
        this.setState({ username: res.data.Data.username });
        this.setState({ password: res.data.Data.password });
      })
      .catch((err) => {
        console.log(err.name, err.message);
      });
  }

  componentDidMount() {
    if (this.props.screenProps.token === null) {
      <LoginComponent />
    }
    this.getInfoUser(this.props.screenProps.token.Token, this.props.screenProps.email);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, top: 35 }}>GearStocks</Text>
        <Icon name='format-align-justify' size={30} color='black'
            containerStyle={{ right: 170, top: 2 }} onPress={() => { this.props.navigation.openDrawer(); }} />
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          label='Username'
          labelStyle={{bottom: 5, left: 10}}
          returnKeyType='next'
          errorMessage={this.state.errorUsername}
          errorStyle={{fontSize: 13}}
          inputContainerStyle={{borderColor: colors.PRIMARY_COLOR, borderTopWidth: 2,
          borderRightWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2}}
          onSubmitEditing={() => this.firstname.focus()}
          ref={(input) => { this.username = input; }}
          leftIcon={<Icon name='person' size={24} color='black' />}
          placeholder={strings.USERNAME}
          onChangeText={(username = this.state.username) => this.setState({ username })}
        />
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          label='Email'
          labelStyle={{bottom: 5, left: 10}}
          returnKeyType='next'
          errorMessage={this.state.errorEmail}
          errorStyle={{fontSize: 13}}
          inputContainerStyle={{borderColor: colors.PRIMARY_COLOR, borderTopWidth: 2,
          borderRightWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2}}
          onSubmitEditing={() => this.firstname.focus()}
          ref={(input) => { this.email = input; }}
          leftIcon={<Icon name='person' size={24} color='black' />}
          placeholder={strings.EMAIL}
          onChangeText={(email = this.state.email) => this.setState({ email })}
        />
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          label='Firstname'
          labelStyle={{bottom: 5, left: 10}}
          returnKeyType='next'
          errorMessage={this.state.errorFirstname}
          errorStyle={{fontSize: 13}}
          inputContainerStyle={{borderColor: colors.PRIMARY_COLOR, borderTopWidth: 2,
          borderRightWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2}}
          onSubmitEditing={() => this.firstname.focus()}
          ref={(input) => { this.firstname = input; }}
          leftIcon={<Icon name='person' size={24} color='black' />}
          placeholder={strings.FIRSTNAME}
          onChangeText={(firstname = this.state.firstname) => this.setState({ firstname })}
        />
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          label='Lastname'
          labelStyle={{bottom: 5, left: 10}}
          returnKeyType='next'
          errorMessage={this.state.errorLastname}
          errorStyle={{fontSize: 13}}
          inputContainerStyle={{borderColor: colors.PRIMARY_COLOR, borderTopWidth: 2,
          borderRightWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2}}
          onSubmitEditing={() => this.lastname.focus()}
          ref={(input) => { this.lastname = input; }}
          leftIcon={<Icon name='person' size={24} color='black' />}
          placeholder={strings.LASTNAME}
          onChangeText={(lastname = this.state.lastname) => this.setState({ lastname })}
        />
        
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          label='Password'
          labelStyle={{bottom: 5, left: 10}}
          returnKeyType='next'
          errorMessage={this.state.errorPassword}
          errorStyle={{fontSize: 13}}
          inputContainerStyle={{borderColor: colors.PRIMARY_COLOR, borderTopWidth: 2,
          borderRightWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2}}
          onSubmitEditing={() => this.password.focus()}
          ref={(input) => { this.password = input; }}
          leftIcon={<Icon name='person' size={24} color='black' />}
          placeholder={strings.PASSWORD}
          onChangeText={(password = this.state.password) => this.setState({ password })}
        />
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          label='New Password'
          labelStyle={{bottom: 5, left: 10}}
          returnKeyType='next'
          errorMessage={this.state.errorNewPassword}
          errorStyle={{fontSize: 13}}
          inputContainerStyle={{borderColor: colors.PRIMARY_COLOR, borderTopWidth: 2,
          borderRightWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2}}
          onSubmitEditing={() => this.newPassword.focus()}
          ref={(input) => { this.newPassword = input; }}
          leftIcon={<Icon name='person' size={24} color='black' />}
          placeholder='New Password'
          onChangeText={(newPassword = this.state.newPassword) => this.setState({ newPassword })}
        />
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          label='Confirm Password'
          labelStyle={{bottom: 5, left: 10}}
          returnKeyType='next'
          errorMessage={this.state.errorConfirmPassword}
          errorStyle={{fontSize: 13}}
          inputContainerStyle={{borderColor: colors.PRIMARY_COLOR, borderTopWidth: 2,
          borderRightWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2}}
          onSubmitEditing={() => this.confirmPassword.focus()}
          ref={(input) => { this.confirmPassword = input; }}
          leftIcon={<Icon name='person' size={24} color='black' />}
          placeholder='Confirm Password'
          onChangeText={(confirmPassword = this.state.confirmPassword) => this.setState({ confirmPassword })}
        />
        <Button title="Update informations" buttonStyle={styles.button} type="outline" onPress={() => this.checkError(this.state.email)} />
        <Button title={strings.DISCONNECT} buttonStyle={styles.button} type="outline" onPress={() => this.disconnect(this.state.email)} />
      </View>
    );
  }
}