import Axios from 'axios';
const instance = Axios.create({
  // baseURL: 'http://localhost:5000/',
  baseURL: 'https://api-ummttqqbt.herokuapp.com/',
});

export default instance;
