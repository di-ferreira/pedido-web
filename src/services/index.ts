import axios from 'axios';

const URL = 'http://51.81.246.218:2002/emsoft/emauto/';

const api = axios.create({
  baseURL: URL,
  withCredentials: false,
});

export default api;
