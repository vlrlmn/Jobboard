import { AxiosResponse, AxiosHeaders } from 'axios';

interface FakeRequestParams {
    responseData: () => any;
    delay: number;
}

export const fakeRequest = async ({ responseData, delay }: FakeRequestParams): Promise<AxiosResponse<any>> => {
    return new Promise<AxiosResponse<any>>((resolve) => {
        setTimeout(() => {
            const data = responseData();
            resolve({
                data: data,
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {
                    headers: new AxiosHeaders()
                },
            });
        }, delay);
    });
};