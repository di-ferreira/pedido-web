import axios from 'axios';

const api = axios.create({
  baseURL: 'https://my-json-server.typicode.com/di-ferreira/faker-db',
});

export default api;
