class VacancyApply {
    id: number
    userId : number
    userName : string
    resumeId: number
    resumeName: string
    experience: number
    message: string
    withDegree: boolean = false
    constructor(data:any) {
        this.id = data["id"]
        this.userName = data["userName"] ?? data["user_name"]
        this.userId = data["userId"] ?? data["user_id"]
        this.resumeId = data["resume_id"]
        this.message = data["message"]
        this.resumeName = data["resumeName"] ?? data["resume_name"]
        this.experience = data["experience"]
        this.withDegree = data["withDegree"] ?? data["with_degree"]
    }
}

export default VacancyApply