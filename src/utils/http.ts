import axios from 'axios';
import { type AxiosRequestConfig, type AxiosResponse } from 'axios';

const http = async <T = any>(
  url: string,
  method: 'get' | 'post' | 'put' | 'delete' = 'get',
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return axios({
    url,
    method,
    data,
    ...config,
  });
};

export default http;

