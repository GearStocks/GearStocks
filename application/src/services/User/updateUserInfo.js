import { routes } from '../../../config/routes';

const axios = require('axios');

export default function updateUserInfo(JSONObj, callback){
    console.log(JSONObj);
    return axios.post(routes.UPDATE_INFO_USER, JSONObj, {
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