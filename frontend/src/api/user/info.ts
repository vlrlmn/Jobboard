import UserResume from "../../types/forms/userResume";
import client from "./client";

class InfoAPI {
    static async general(userId:number) {
        return client.get(`user/${userId}`)
    }

    static async uploadResume(userId:number, form:UserResume) {
        return client.post(`user/${userId}/resume/create`, form.toRequestBody())
    }

    static async getResume(userId:number) {
        return client.get(`user/${userId}/resume/get`)
    }
}

export default InfoAPI;