import React from 'react';
import { routes } from '../../../config/routes';

const axios = require('axios');

export default class GetCarPart extends React.Component {

  getCarPart = (JSON) => {
    axios.post(routes.GET_CAR_PART, JSON, {
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