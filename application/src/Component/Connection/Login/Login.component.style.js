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
        justifyContent: 'center',
        marginRight: 10,
        marginLeft: 10
    },
    button: {
        height: 50,
        width: 350,
        borderRadius: 5,
        top: 130,
        marginBottom: 20
    },
    forgetPassword: {
        top: 60
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
        right: 10,
        resizeMode: 'contain'
    },
    title: {
        fontWeight: 'bold',
        bottom: 100,
        alignItems: 'center',
        fontSize: 50
    }
});