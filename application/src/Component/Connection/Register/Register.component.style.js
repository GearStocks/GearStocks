/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2020-01-22 7:06:18 pm
 * @copyright GearStocks
 */

import { StyleSheet } from 'react-native';

import colors from '../../../../config/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    padding: 30
  },
  button: {
    height: 50,
    borderRadius: 5,
    marginBottom: 10,
    top: 40
  },
  button2: {
    top: 100,
    width: 350,
    borderRadius: 5,
    marginBottom: 10
  }
});