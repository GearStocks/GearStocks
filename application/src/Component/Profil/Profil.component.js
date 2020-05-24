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
import { strings } from '../../../config/strings';
import colors from '../../../config/colors';
import { routes } from '../../../config/routes';
import LoginComponent from '../Connection/Login/Login.component';

const axios = require('axios');

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

  updateInfoUser = function(mail, ) {
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
        <Text h4>Welcome {this.state.username}</Text>
        <Text h4>Email : {this.state.email}</Text>
        <Text h4>Username : {this.state.username}</Text>
        <Text h4>Firstname : {this.state.firstname}</Text>
        <Text h4>Lastname : {this.state.lastname}</Text>
        <Text h4>Password : {this.state.password}</Text>
        <Text h5>
        </Text>
        <Button title={strings.DISCONNECT} buttonStyle={styles.button} type="outline" onPress={() => this.disconnect(this.state.email)} />
      </View>
    );
  }
}