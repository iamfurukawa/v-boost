import axios from 'axios';
import * as vscode from 'vscode';

const AxiosService = axios.create({
    baseURL: 'https://gpt-proxy-internal.vercel.app'
});

AxiosService.interceptors.request.use(request => {
    const config = vscode.workspace.getConfiguration('vboost.data');
    const apiKey = config.get<string>('apiKey');

    if (apiKey) {
        request.headers["apiKey"] = `${apiKey}`;
    }
    console.log("chamou!")
    console.log(request);
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

export default AxiosService;