import axios, {AxiosResponse, RawAxiosRequestHeaders} from 'axios';

class RequestService {
    get = (url: string, isAuthRequired: boolean = false, contentType: string = 'application/json'): Promise<AxiosResponse> => {
        return createRequest('GET', url, null, isAuthRequired, contentType);
    };

    post = (url: string, body: any, isAuthRequired: boolean = false, contentType: string = 'application/json'): Promise<AxiosResponse> => {
        return createRequest('POST', url, body, isAuthRequired, contentType);
    };

    put = (url: string, body: any, isAuthRequired: boolean = false, contentType: string = 'application/json'): Promise<AxiosResponse> => {
        return createRequest('PUT', url, body, isAuthRequired, contentType);
    };

    delete = (url: string, body: any, isAuthRequired: boolean = false, contentType: string = 'application/json'): Promise<AxiosResponse> => {
        return createRequest('DELETE', url, body, isAuthRequired, contentType);
    };
}

const createRequest = (method: string, url: string, body: any, isAuthRequired: boolean, contentType: string): Promise<AxiosResponse> => {
    return axios({
        method,
        url,
        withCredentials: true,
        data: body,
        headers: setHeader(isAuthRequired, contentType),
    });
};

const setHeader = (isAuthRequired: boolean, contentType: string): RawAxiosRequestHeaders => {
    if (isAuthRequired) {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token') || '';
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
    axios.defaults.headers.common['Content-Type'] = contentType;
    return axios.defaults.headers.common;
};

const requestService: RequestService = new RequestService();
export default requestService;
