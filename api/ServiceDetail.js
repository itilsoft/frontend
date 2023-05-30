import axios from 'axios';
import { getTokenFromStorage } from '../utils/TokenUtil';

export const ServiceDetailApi = async (serviceId) => {
    const token = await getTokenFromStorage();
    try {
        const response = await axios({
            method: 'get',
            url: `http://itilsoft.herokuapp.com/api/service/${serviceId}`,
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

export const AddCommentApi = async (serviceId, star, comment) => {
    const token = await getTokenFromStorage();
    try {
        const response = await axios({
            method: 'post',
            url: `http://itilsoft.herokuapp.com/api/comment`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            data: {
                serviceId: serviceId,
                star: star,
                description: comment,
            },
        });
        return response.data;
    } catch (error) {
        console.log({ error });
        throw error;
    }
};