import AxiosService from "./axios";

interface ApiKey {
    apiKey: string;
}

class AuthenticationService {

    async signIn(email: string, password: string): Promise<ApiKey> {
        console.log(`m=signIn stage=init email=${email} password=${password}`);
        const { data } = await AxiosService.post('/auth', { email, password });
        console.log(`m=signIn stage=end apiKey=${data['apiKey']}`);
        return data satisfies ApiKey;
    }
}

export default new AuthenticationService();