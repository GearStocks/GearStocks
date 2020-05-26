import { Alert } from 'react-native';

import { routes } from '../../../config/routes';

const axios = require('axios');

export default function connect(JSONObj, navigate) {
    return axios.post(routes.FORGOT_PASSWORD, JSONObj, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then((res) => {
        Alert.alert(
            "Send mail",
            "Please check your email, you will receive your new password",
            [
                { text: "OK", onPress: () => navigate('LoginComponent') }
            ],
            { cancelable: false }
        );
    });
}