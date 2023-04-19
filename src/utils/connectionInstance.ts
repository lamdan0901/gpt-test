import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const CI = axios.create({
  baseURL: `${publicRuntimeConfig.BASE_URL}/api`,
  timeout: 20000,
});

CI.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default CI;
