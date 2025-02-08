import vacancies from "../../info/vacancies";
import VacancyCreate from "../../types/forms/vacancyCreate";
import VacancyListFilters from "../../types/vacancyListFilters";
import client from "./client";

class VacancyAPI {

    static mockVacancies = import.meta.env.DEV ? vacancies : null

    static async list(filters:VacancyListFilters) {
        return client.get(`/vacancy_filter?${filters.toQueryStr()}`)
    }

    static async submit(companyId:number, form:VacancyCreate) {
        return client.post(`${companyId}/vacancy`, form.toRequestBody())
    }

    static async details(companyId:number, vacancyId:number) {
        return client.get(`${companyId}/vacancy/${vacancyId}/view`)
    }

    static async cancel(companyId:number, vacancyId:number) {
        return client.patch(`${companyId}/vacancy/${vacancyId}/cancel`)
    }
}

export default VacancyAPI