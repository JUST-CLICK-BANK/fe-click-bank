import axios, { Method, AxiosResponse } from 'axios';

interface ApiRequestBody {
    [key: string]: any; // 이 부분은 body가 어떤 형식의 데이터인지에 따라 더 구체화할 수 있습니다.
}

export const api = async (
    url: string,
    method: Method,
    body?: ApiRequestBody
): Promise<AxiosResponse<any>> => {
    axios.defaults.baseURL = "http://192.168.0.23:8080";

    const res = await axios({
        url,
        method,
        data: body,
    });

    return res;
};
