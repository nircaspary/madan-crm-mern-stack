import axios from 'axios';

axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
const baseURL = 'http://127.0.0.1:8000/api/v1/';
export const post = async (URL, data) => await axios.post(baseURL + URL, data);
export const get = async (URL, query) => await axios.get(baseURL + URL, { params: query });
export const patch = async (URL, data) => await axios.patch(baseURL + URL, data);
export const deleteItem = async (URL) => await axios.delete(baseURL + URL);
