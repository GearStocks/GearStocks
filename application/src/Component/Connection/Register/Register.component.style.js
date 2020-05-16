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
        marginRight: 10,
        marginLeft: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        bottom: 40
    },
    button: {
        height: 50,
        width: 350,
        borderRadius: 5,
        top: 60,
        marginBottom: 10
    }
});