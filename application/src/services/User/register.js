import { Alert } from 'react-native';
import { routes } from '../../../config/routes';

const axios = require('axios');

export default function connect(JSONObj, navigate) {
    return axios.post(routes.REGISTER, JSONObj, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
    })
    .then((res) => {
      Alert.alert(
        "Congratulations !",
        "You are now register in GearStocks, you can now log in.",
        [
            { text: "Login", onPress: () => navigate('LoginComponent') }
        ],
        { cancelable: false }
      )
    });
}