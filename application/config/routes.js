/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2020-01-17 7:51:22 pm
 * @copyright GearStocks
 */

import * as Network from 'expo-network';

var localAddress;

async function getAddress() {
  var address = process.env.API_ADDR
  var port = process.env.API_PORT

  if (port == undefined)
    port = 8000
  if (address == undefined || address == "localhost" || address == "127.0.0.1") {
    address = await Network.getIpAddressAsync()
  }
  localAddress = 'http://' + address + ':' + port + '/';
};

getAddress();

export const routes = {
  CONNECT() {return localAddress + 'connect'},
  REGISTER() {return localAddress + 'register'},
  INFO_USER() {return localAddress + 'infoUser'},
  DISCONNECT() {return localAddress + 'disconnect'},
  ADD_CAR_PART() {return localAddress + 'addCarPart'},
  GET_CAR_PART() {return localAddress + 'getCarPart'},
  FORGOT_PASSWORD() {return localAddress + 'forgottenPassword'}
};