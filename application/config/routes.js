/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2020-01-17 7:51:22 pm
 * @copyright GearStocks
 */

import {address} from './address';

//Change address in address.js !

var port = 8000;
var localAddress = 'http://' + address + ':' + port + '/';

export const routes = {
  CONNECT: localAddress + 'connect',
  REGISTER: localAddress + 'register',
  INFO_USER: localAddress + 'infoUser',
  DISCONNECT: localAddress + 'disconnect',
  ADD_CAR_PART: localAddress + 'addCarPart',
  GET_CAR_PART: localAddress + 'getCarPart',
  FORGOT_PASSWORD: localAddress + 'forgottenPassword'
};