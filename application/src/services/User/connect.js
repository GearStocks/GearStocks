import { routes } from '../../../config/routes';

const axios = require('axios');

export default function connect(JSONObj, navigate, callback) {
    return axios.post(routes.CONNECT, JSONObj, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then((res) => {
        callback(res);
        navigate('AppMenu');
    })
}