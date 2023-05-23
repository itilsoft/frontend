import axios from 'axios';

export default RegisterApi = async (fullname, username, password) => {
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
    throw new Error(error.response.data.message);
  }
};
