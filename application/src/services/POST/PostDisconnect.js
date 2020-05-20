import React from 'react';
import { Alert } from 'react-native';

import { routes } from '../../../config/routes';

const axios = require('axios');

export default class Disconnect extends React.Component {

  disconnect = (mail) => {
    axios.post(routes.DISCONNECT, mail, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then((res) => {
        console.log('RESPONSE RECEIVED: ', res);
      })
      .catch((err) => {
        console.log(err.name, err.message);
      });
  }
}