/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2020-01-26 6:18:01 am
 * @copyright GearStocks
 */

/* eslint-disable no-undef */
/* eslint-disable no-console */

import React from 'react';

import { routes } from '../../../config/routes';

const axios = require('axios');

export default class PostRegister extends React.Component {

  register = (JSONObj, navigate) => {
    console.log(JSONObj);
    axios.post(routes.REGISTER, JSONObj, {
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