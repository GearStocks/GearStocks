/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2020-01-22 7:06:18 pm
 * @copyright GearStocks
 */

import { StyleSheet } from 'react-native';

import Constants from 'expo-constants';
import colors from '../../../../config/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  button: {
    height: 50,
    width: 350,
    borderRadius: 5,
    marginBottom: 10,
    top: 40
  },
  button2: {
    top: 100,
    height: 50,
    width: 350,
    borderRadius: 5,
    marginBottom: 10
  }
});