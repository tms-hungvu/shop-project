import  axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
    AxiosResponse,
} from "axios";


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
    const { method, url } = config;
    
    const authToken =  'sdfsf';
    if(authToken){
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${authToken}`
        };
    }
  
    if (method === "get") {
      config.timeout = 15000;
    }
    return config;
};
const onResponse = (response: AxiosResponse): AxiosResponse => {
    const { method, url } = response.config;
    const { status } = response;
   
  
    if (response && response.data) {
        return response.data;
    }
    return response;
};
const onErrorResponse = async (error: AxiosError | Error): Promise<AxiosError> => {
    
    
    if (axios.isAxiosError(error)) {

      const originalConfig : any = error.config;
      const { message } = error;
      const { method, url } = error.config as AxiosRequestConfig;
      const { statusText, status } = error.response as AxiosResponse ?? {};
      
      const token = false;
      if(status === 403) window.location.href = "/login";
      if(status === 404) window.location.href = "/not-found";
      if (!token || status != 401) return Promise.reject(error);
      
      if(checkErrorRefreshToken(error)) return Promise.reject(error);
      try {
       
        // if (refreshingFunc == undefined){
        //     refreshingFunc = renewToken();
        // }
        const [new_access_token, new_refresh_token] = await refreshingFunc;
      
        
        originalConfig.headers.Authorization = `Bearer dsf`;
        

        try {
            return await axiosClient.request(originalConfig);
        } catch(innerError : any) {
            if (isUnauthorizedError(innerError)) {
                throw innerError;
            }                  
        }

        } catch (err) {
            
          
            alert('your refresh token and access token were expried, you have to login again !!!');
        } finally {
            refreshingFunc = undefined;
        }
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