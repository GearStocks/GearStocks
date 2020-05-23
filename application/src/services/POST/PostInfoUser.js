import React from 'react';
import { Alert } from 'react-native';

import { routes } from '../../../config/routes';

const axios = require('axios');


infoUser = (token, email) => {
  console.log(token, email);
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
      console.log('RESPONSE RECEIVED: ', res);
      return (res);
    })
    .catch((err) => {
      console.log(err.name, err.message);
    });
}