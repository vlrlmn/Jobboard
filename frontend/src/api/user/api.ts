import InfoAPI from "./info"
import AuthAPI from "./auth"
import VacancyApplyAPI from "./vacancyApply"

class UserAPI {
    static auth = AuthAPI
    static info = InfoAPI
    static apply = VacancyApplyAPI
}

export default UserAPI