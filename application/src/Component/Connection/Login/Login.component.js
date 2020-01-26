/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2019-12-05 4:19:32 pm
 * @copyright GearStocks
 */

import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Button, Input, Icon, Text } from 'react-native-elements';

import { strings, errors } from '../../../../config/strings';
import styles from './Login.component.style';
import PostLogin from '../../../services/POST/PostLogin';

/* eslint-disable no-undef */
/* eslint-disable no-console */

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errorMail: '',
      errorPassword: '',
      hidePassword: true
    };
  } 

  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  checkError = (navigate) => {
    // eslint-disable-next-line no-useless-escape
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const { email, password } = this.state;

    const JSONObj = JSON.stringify({
      mail: this.state.email,
      password: this.state.password
    });

    if (`${email}` === '' && `${password}` === '') {
      this.setState({ errorMail: errors.ERR_ADDRESS });
      this.setState({ errorPassword: errors.ERR_PASSWORD });
    }
    else if (`${email}` === '') {
      this.setState({ errorMail: errors.ERR_ADDRESS });
      this.setState({ errorPassword: '' });
    }
    else if (reg.test(`${email}`) === false) {
      this.setState({ errorMail: errors.ERR_INVALID_EMAIL });
      this.setState({ errorPassword: '' });
    }
    else if (`${password}` === '') {
      this.setState({ errorMail: '' });
      this.setState({ errorPassword: errors.ERR_PASSWORD });
    }
    else {
      this.setState({ errorMail: '' });
      this.setState({ errorPassword: '' });
      new PostLogin().login(JSONObj, navigate);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>GearStocks</Text>
        <Input
          inputStyle={styles.input}
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          label='Email'
          labelStyle={{bottom: 10, left: 10}}
          returnKeyType='next'
          inputContainerStyle={{borderColor: '#5dade2', borderTopWidth: 2,
          borderRightWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2}}
          containerStyle={{top: 20}}
          errorMessage={this.state.errorMail}
          onSubmitEditing={() => this.password.focus()}
          blurOnSubmit={false}
          placeholder={strings.EMAIL}
          leftIcon={<Icon name='mail' size={24} color='black' />}
          onChangeText={(email) => this.setState({ email })}
        />
        <Input
          ref={(input) => { this.password = input; }}
          inputStyle={styles.input}
          returnKeyType="go"
          containerStyle={{top: 50}}
          label='Password'
          labelStyle={{bottom: 10, left: 10}}
          inputContainerStyle={{borderColor: '#5dade2', borderTopWidth: 2,
          borderRightWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2}}
          errorMessage={this.state.errorPassword}
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
        <Button title={strings.FORGOT_PASSWORD} buttonStyle={styles.forgetPassword} type="clear" onPress={() => navigate('ForgotPasswordComponent')} />
        <Button title={strings.CONNECTION} buttonStyle={styles.button} type="outline" onPress={() => this.checkError(navigate)} />
        <Button title={strings.REGISTER} buttonStyle={styles.button} type="outline" onPress={() => navigate('RegisterComponent')} />
      </View>
    );
  }
}