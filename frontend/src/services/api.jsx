import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});
// const API = axios.create({
//   baseURL: 'https://finsyte.onrender.com/api',
// });

export default API;
