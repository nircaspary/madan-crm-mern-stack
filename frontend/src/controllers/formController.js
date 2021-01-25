import axios from 'axios';

export const postData = async (url, data) => {
  try {
    const res = await axios.post(url, data);
    return res;
  } catch (err) {
    return err.message;
  }
};
export const getUserData = async (url) => {
  try {
    const res = await axios.get(url);
    return res;
  } catch (err) {
    return err.message;
  }
};
export const getData = async (url, token, query) => {
  try {
    const res = await axios.get(url, {
      params: {
        team: query,
      },
      headers: {
        'x-auth-token': token,
      },
    });
    return res;
  } catch (err) {
    return err.message;
  }
};
