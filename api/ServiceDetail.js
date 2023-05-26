import axios from 'axios';
import { getTokenFromStorage } from '../utils/TokenUtil';

export default ServicesApi = async (serviceId) => {
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

// export const addCommentToService = async (serviceId, rating, comment) => {
//     const token = await getTokenFromStorage();
//     try {
//         const response = await axios({
//             method: 'post',
//             url: `http://itilsoft.herokuapp.com/api/service/${serviceId}/comment`,
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: 'Bearer ' + token,
//             },
//             data: {
//                 rating: rating,
//                 comment: comment,
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.log({ error });
//         throw error;
//     }
// };