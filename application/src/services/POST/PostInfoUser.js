import React from 'react';

import { routes } from '../../../config/routes';

const axios = require('axios');


export default class PostRegister extends React.Component {

  infoUser = (token, email) => {
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
        return (err);
      });
  }
}