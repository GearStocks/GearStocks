import { routes } from '../../../config/routes';

const axios = require('axios');

export default function listParts(obj, JSONObj) {
    return axios.post(routes.LIST_PARTS, JSONObj, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
    })
    .then((res) => {
        let items;
        let response = [];
        if (res.data.parts) {
            for (const responseData of res.data.parts) {
                if (responseData.name) {
                    items = { name: responseData.name, image: responseData.photo, price: responseData.price }
                    response.push(items);
                }
            }
        }
        obj.setState({response});
    })
    .catch((err) => {
        console.log(err.name, err.message);
    });

}
