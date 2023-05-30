import axios from 'axios';
import { getTokenFromStorage } from '../utils/TokenUtil';

export const GetStatisticsApi = async () => {
    const token = await getTokenFromStorage();
    try {
        const response = await axios({
            method: 'get',
            url: `http://itilsoft.herokuapp.com/api/admin/statistics`,
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