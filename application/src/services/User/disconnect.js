import { Updates } from 'expo';
import { routes } from '../../../config/routes';

const axios = require('axios');

export default function disconnect(JSONObj, callback) {
    return axios.post(routes.DISCONNECT, JSONObj, {
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
        }
    })
    .then((res) => {
        callback(res);
        Updates.reload();
    });
}