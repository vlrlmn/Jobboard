import client from "./client"

class InfoAPI {
    static general(companyId:number){
        console.log({companyId})
        return client.get(`${companyId}`)
    }
}

export default InfoAPI