/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2020-01-18 8:24:51 pm
 * @copyright GearStocks
 */

import { routes } from '../../../config/routes';

const axios = require('axios');

/* eslint-disable no-undef */
/* eslint-disable no-console */

/*export const onLogin = axios.post(routes.CONNECT, JSONObj, {
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then((res) => {
    console.log('RESPONSE RECEIVED: ', res);
    console.log('JSON => ', JSON.stringify(res));
    this.setState({ isAuthorized: true });
    //navigate('UserInformationsComponent');
  })
  .catch((err) => {
    Alert.alert(err.name, err.message);
    console.log('message', err.status);

    // DEBUG
    //console.log('JSON => ', JSON.stringify(err));
  });
  */