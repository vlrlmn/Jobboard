import client from "./client";

class VacancyApplyAPI {
    static async applyVacancy(vacancyId: number, data: any) {
        return client.post(`vacancy/${vacancyId}/apply`, data);
    }
    static async applyList(vacancyId: number) {
        return client.get(`vacancy/${vacancyId}/apply/list`);
    }
}

export default VacancyApplyAPI;