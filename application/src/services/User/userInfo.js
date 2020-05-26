import { routes } from '../../../config/routes';

const axios = require('axios');

export default function userInfo(JSONObj, callback){
    console.log(JSONObj);
    return axios.post(routes.INFO_USER, JSONObj, {
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
        }
    })
    .then((res) => {
        callback(res);
    });
}