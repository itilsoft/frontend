import axios from 'axios';

export default LoginApi = async (username, password) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'http://itilsoft.herokuapp.com/api/user/login',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username: username,
                password: password
            },
        });
        console.log({ response: response.data });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
