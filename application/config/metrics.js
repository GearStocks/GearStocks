/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2020-01-27 12:27:07 am
 * @copyright GearStocks
 */

import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const metrics = {
  DEVICE_WIDTH: width,
  DEVICE_HEIGHT: height
};

export default metrics;
