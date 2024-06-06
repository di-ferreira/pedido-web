import axios from 'axios';

import { API_URL } from '../config';

const URL = API_URL + '/emsoft/emauto/';

const api = axios.create({
    baseURL: URL,
    withCredentials: false,
});

export default api;
