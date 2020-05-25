import React from 'react';

import { routes } from '../../../config/routes';

const axios = require('axios');

export default class AddCarPart extends React.Component {

  addCarPart = (JSON) => {
    axios.post(routes.ADD_CAR_PART, JSON, {
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