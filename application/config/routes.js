/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2020-01-17 7:51:22 pm
 * @copyright GearStocks
 */

import {address} from './address';

//Change address in address.js !

var localAddress = 'https://' + 'dev.gearstocks.store:8000/';

export const routes = {
  CONNECT: localAddress + 'connect',
  REGISTER: localAddress + 'register',
  INFO_USER: localAddress + 'infoUser',
  UPDATE_INFO_USER: localAddress + 'updateInfoUser',
  DISCONNECT: localAddress + 'disconnect',
  ADD_CAR_PART: localAddress + 'addCarPart',
  FORGOT_PASSWORD: localAddress + 'forgottenPassword',
  LIST_PARTS: localAddress + 'listParts',
  GET_FULL_CAR_PART: localAddress + 'getFullCarPart',
  ADD_BOOKMARK: localAddress + 'addBookmark'
};