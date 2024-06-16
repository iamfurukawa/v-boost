import AxiosService from "./axios";

export interface Message {
    role: string;
    content: string;
}

export interface CompleteResponse {
    responses: string[];
}

class VBoostService {
    async complete(messages: Message[]): Promise<CompleteResponse> {
        console.log(`m=signIn stage=init complete=${JSON.stringify(messages)}`);
        const { data } = await AxiosService.post('/completion', { messages });
        //const { data } = { data: { responses: ["wow"] } };
        console.log(`m=signIn stage=end completition=${JSON.stringify(data)}`);
        return data satisfies CompleteResponse;
    }
}

export default new VBoostService();