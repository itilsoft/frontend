import axios from 'axios';
import { getTokenFromStorage } from '../utils/TokenUtil';

export default ServicesApi = async () => {
    const token = await getTokenFromStorage();
    try {
        const response = await axios({
            method: 'get',
            url: 'http://itilsoft.herokuapp.com/api/service',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            data: {},
        });
        console.log({ response: response.data });
        return response.data;
    } catch (error) {
        console.log({ error });
    }
};
