import AuthAPI from "./auth"
import InfoAPI from "./info"
import VacancyAPI from "./vacancy"

class CompanyAPI {
    static info = InfoAPI
    static auth = AuthAPI
    static vacancy = VacancyAPI 
}

export default CompanyAPI