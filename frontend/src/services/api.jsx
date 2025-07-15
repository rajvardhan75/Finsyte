import axios from 'axios';

const API = axios.create({
  baseURL: 'https://finsyte.onrender.com/api',
});

export default API;
