import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'https://api-ummttqqbt.herokuapp.com/',
});

export default instance;
