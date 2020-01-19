/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2020-01-19 10:57:01 pm
 * @copyright GearStocks
 */

import React from 'react';
import { registerRootComponent } from 'expo';
import { default as App } from './App';

class Main extends React.Component {
  render() {
    return <App />;
  }
}

registerRootComponent(Main);
