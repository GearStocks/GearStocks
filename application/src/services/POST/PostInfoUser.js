import React from 'react';
import { Alert } from 'react-native';

import { routes } from '../../../config/routes';

const axios = require('axios');

export default class InfoUser extends React.Component {

  infoUser = (JSON, navigate) => {
    axios.post(routes.INFO_USER(), JSON, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then((res) => {
        console.log('RESPONSE RECEIVED: ', res);
        navigate('AppMenu');
      })
      .catch((err) => {
        console.log(err.name, err.message);
      });
  }
}