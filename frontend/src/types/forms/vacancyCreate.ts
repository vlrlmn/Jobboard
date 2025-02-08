class VacancyCreate {
    name: string = "" 
    employment: {title:string, value:number}|null = null
    location: {title:string, value:number}|null = null
    workFormat: {title:string, value:number}|null = null
    salary: number|null = null
    skills: string[] = []
    experience: number|null = null
    comment: string|null = null
    isDegreeRequired : boolean = false

    clear(){
        this.name = ""
        this.employment = null
        this.location = null
        this.salary = null
        this.skills = []
        this.experience = null
        this.comment = null
        this.isDegreeRequired = false
    }

    validate(){
        const checks = [
            !this.name,
            !this.employment,
            !this.location,
            !this.workFormat,
            this.salary == null,
            this.experience == null,
            !this.comment,
        ]

        const failedCheck = checks.find(check => {
            return check
        })
        if (failedCheck != undefined)
            return false
        return true
    }

    toRequestBody(){
        return {
            name: this.name,
            employment: this.employment?.value,
            location: this.location?.value,
            salary: this.salary?.toString(),
            skills: this.skills.join(" "),
            work_format: this.workFormat?.value,
            experience: Number(this.experience),
            comment: this.comment,
            is_degree_required: this.isDegreeRequired
        }
    }
}

export default VacancyCreate