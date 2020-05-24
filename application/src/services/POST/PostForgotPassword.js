import React from 'react';
import { Alert } from 'react-native';

import { routes } from '../../../config/routes';

const axios = require('axios');

export default class ForgotPassword extends React.Component {

  forgotPassword = (JSON) => {
    axios.post(routes.FORGOT_PASSWORD, JSON, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then((res) => {
        console.log('RESPONSE RECEIVED: ', res);
        Alert.alert(
          "Send mail",
          "Please check your email, you will receive your new password",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
      })
      .catch((err) => {
        console.log(err.name, err.message);
      });
  }
}