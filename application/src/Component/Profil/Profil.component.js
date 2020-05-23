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

import infoUser from '../../services/POST/PostInfoUser'
import { routes } from '../../../config/routes';
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

  test = function(token, email) {
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
        console.log('RESPONSE RECEIVED: ', res.data);
        this.setState({ email: res.data.email });
        this.setState({ firstname: res.data.firstName });
        this.setState({ lastname: res.data.lastName });
        this.setState({ username: res.data.username });
      })
      .catch((err) => {
        console.log(err.name, err.message);
      });
  }

  componentDidMount() {
    this.test(this.props.screenProps.token, this.props.screenProps.email);
  }

  handleClick = () => {
    <LoginComponent />;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text h4>Welcome {this.state.username}</Text>
        <Text h4>Email : {this.state.email}</Text>
        <Text h4>Username : {this.state.username}</Text>
        <Text h4>Firstname : {this.state.firstname}</Text>
        <Text h4>Lastname : {this.state.lastname}</Text>
        <Text h5>
        </Text>
        <Button title={strings.DISCONNECT} buttonStyle={styles.button} type="outline" onPress={() => this.handleClick()} />
      </View>
    );
  }
}