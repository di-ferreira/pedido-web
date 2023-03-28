import axios from 'axios';

const URL = 'http://emsoft03.ddns.net:2001/server/ticket/';

const api = axios.create({
  baseURL: URL,
});

export default api;
