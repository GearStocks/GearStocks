/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2019-12-05 5:00:02 pm
 * @copyright GearStocks
 */

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        height: 50,
        width: 300,
        borderRadius: 20,
        backgroundColor: '#050175',
        top: 50,
        marginBottom: 10
    },
    input: {
        fontSize: 20,
        height: 30,
        width: 100,
        left: 10
    },
    btnImage: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    },
    title: {
        fontWeight: 'bold',
        bottom: 100,
        alignItems: 'center',
        fontSize: 50
    }
});