// export const API_URL = 'http://201.76.163.158:2001';
export const API_URL =
    process.env.NODE_ENV === 'production'
        ? 'http://201.76.163.158:2001'
        : 'http://51.81.246.218:2002';
