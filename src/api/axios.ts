import  axios, {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosResponse,
} from "axios";
import Cookies from "js-cookie"

var refreshingFunc : any = undefined;
const isUnauthorizedError = (error : AxiosError) => { 
    const status = error.response?.status;
    return status === 401;
}
const checkErrorRefreshToken = (error : any) => { 
    const {
        response: { status, data },
    } = error;
    return status === 401 && data.message && data.message == 'refresh_token error';
 }
const onRequest = (config: InternalAxiosRequestConfig | any): InternalAxiosRequestConfig => {
    
    const authToken =  Cookies.get('auth');
    if(authToken){
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${authToken}`
        };
    }
  
    return config;
};
const onResponse = (response: AxiosResponse): AxiosResponse => {
    if (response && response.data) {
        return response.data;
    }
    return response;
};
const onErrorResponse = async (error: AxiosError | Error): Promise<AxiosError> => {
    
    
    if (axios.isAxiosError(error)) {

      const {  status } = error.response as AxiosResponse ?? {};
      
      const token = false;
      if(status === 403) window.location.href = "/login";
      if(status === 404) window.location.href = "/not-found";
      if (!token || status != 401) return Promise.reject(error);
      
      if(checkErrorRefreshToken(error)) return Promise.reject(error);
   
    }
  
    return Promise.reject(error);
};

  const setupInterceptors = (instance: AxiosInstance): AxiosInstance => {
    instance.defaults.baseURL = process.env.NEXT_PUBLIC_URL_API;

    instance.defaults.paramsSerializer = (params) => {
      return Object.keys(params)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    };
    instance.interceptors.request.use(onRequest, onErrorResponse);
    instance.interceptors.response.use(onResponse, onErrorResponse);
  
    return instance;
  };

  const axiosInstance = axios.create();
  export const axiosClient = setupInterceptors(axiosInstance);