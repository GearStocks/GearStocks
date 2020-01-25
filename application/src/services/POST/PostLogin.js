/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2020-01-18 8:24:51 pm
 * @copyright GearStocks
 */

/* eslint-disable no-undef */
/* eslint-disable no-console */

import React from 'react';

import { routes } from '../../../config/routes';

const axios = require('axios');

export default class PostLogin extends React.Component {

  login = (JSONObj, navigate) => {
    axios.post(routes.CONNECT, JSONObj, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        console.log('RESPONSE RECEIVED: ', res);
        navigate('AppMenu');
      })
      .catch((err) => {
        console.log("ici", err.message);
        // DEBUG
        //console.log('JSON => ', JSON.stringify(err));
      });
  }
}