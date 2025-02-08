import CompanyAPI from "../api/company/api"

enum VacancyStatus {
	Uploaded = 0,
	Canceled,
	Hired,
}

class Vacancy {
	id: number
	name: string
	companyId: number
	companyName: string
	salary: number
	comment: string|undefined
	employmentId:number|undefined
	locationId: number
	experience: number|undefined
	applies: number|undefined
	skills: string[] = []
	workFormatId: number|undefined
	withDegree: boolean = false
	status: VacancyStatus = 0
	/**
	 *
	 */
	constructor(data:any) {
		this.id = data["id"]
		this.name = data["name"]
		this.comment = data["comment"]
		this.companyId = data["companyId"]
		this.companyName = data["companyName"] ?? data["company_name"]
		this.salary = data["salary"]
		this.locationId = data["location"] ?? data["location_id"] ?? data["locationId"]
		this.applies = data["applies"]
		this.workFormatId = data["work_format_id"] ?? data["workFormat"]
		this.employmentId = data["employment_id"] ?? data["emplyment"]
		this.experience = data["experience"]
		this.withDegree = data["is_degree_required"]
		this.skills = data["skills"] ? data["skills"].split(" ") : []
		if (data["status"]) {
			this.status = data["status"]
		}
	}
	
	async setupDetails() {
		CompanyAPI.vacancy.details(this.companyId, this.id).then((response) => {
			if (response.status >= 400) {
				console.error("Failed to fetch vacancy details")
				return
			}
			const data = response.data.data
			console.log(data)
			this.name = data["name"]
			this.comment = data["comment"]
			this.salary = data["salary"]
			this.locationId = data["location"]
			this.applies = data["applies"]
			this.workFormatId = data["work_format"]
			this.employmentId = data["employment"]
			this.experience = data["experience"]
			this.withDegree = data["is_degree_required"]
			this.companyId = data["company_id"]
			this.skills = data["skills"] ? data["skills"].split(" ") : []
			if (data["status"]) {
				this.status = data["status"]
			}
		})
	}
}``

export default Vacancy