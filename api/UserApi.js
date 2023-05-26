import axios from 'axios';
import { getTokenFromStorage } from '../utils/TokenUtil';

const Login = async (username, password) => {
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
        console.log({ error });
    }
};

const Register = async (fullname, username, password) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'http://itilsoft.herokuapp.com/api/user/register',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                fullname: fullname,
                username: username,
                password: password
            },
        });
        console.log({ response: response.data });
        return response.data;
    } catch (error) {
        console.log({ error });
    }
};

const Logout = async () => {
    const token = await getTokenFromStorage();
    try {
        const response = await axios({
            method: 'post',
            url: 'http://itilsoft.herokuapp.com/api/user/logout',
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

const GetUser = async () => {
    const token = await getTokenFromStorage();
    try {
        const response = await axios({
            method: 'get',
            url: 'http://itilsoft.herokuapp.com/api/user',
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
        return { token: null };
    }
};

const UpdatePassword = async (oldPassword, newPassword) => {
    const token = await getTokenFromStorage();
    try {
        const response = await axios({
            method: 'post',
            url: 'http://itilsoft.herokuapp.com/api/user/change-password',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            data: { oldPassword, newPassword },
        });
        console.log({ response: response.data });
        return response.data;
    } catch (error) {
        console.log({ error });
    }
};

export { Login, Register, Logout, GetUser, UpdatePassword }