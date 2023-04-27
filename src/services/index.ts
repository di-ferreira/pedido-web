import axios from 'axios';

// const URL = 'http://emsoft03.ddns.net:2001/server/ticket/';

const URL = 'http://51.81.246.218:2002/emsoft/emauto/';

const api = axios.create({
  baseURL: URL,
});

export default api;
