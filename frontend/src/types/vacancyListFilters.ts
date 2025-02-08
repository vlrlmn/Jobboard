import employments from "../info/employments";
import locations from "../info/locations";
import statuses from "../info/vacancyStatuses";
import workFormats from "../info/workFormats";
import LocationArea from "./location";
import Vacancy from "./vacancy";

class VacancyListFilters {
	search: string = ""
	companyId: number|undefined
	locations: Array<LocationArea> = []
	salaryRange: Array<number> = [0, 0]
	withSalary: boolean = false
	degreeIsRequired: boolean = false
	workFormats: Array<{value:number, title:string}> = []
	employments: Array<{value:number, title:string}> = []
	statuses: Array<{value:number, title:string}> = []
	constructor(data:any) {
		if (data["s"]) {
			this.search = data["s"]
		}
		if (data["emp"]) {
			if (Array.isArray(data["emp"])) {
				data["emp"] = data["emp"].map((e) => Number(e))
				this.employments = employments.filter((employment) => {
					return data["emp"].includes(employment.value)
				})
			} else {
				data["emp"] = Number(data["emp"])
				this.employments = employments.filter((employment) => {
					return employment.value === data["emp"] 
				})
			}
		}
		if (data["loc"]) {
			if (Array.isArray(data["loc"])){
				data["loc"] = data["loc"].map((l) => Number(l))
				this.locations = locations.filter((loc) => {
					return data["loc"].includes(loc.value)
				})
			} else {
				data["loc"] = Number(data["loc"])
				this.locations = locations.filter((loc) => {
					return loc.value === data["loc"] 
				})
			}
		}

		if (data["wf"]) {
			if (Array.isArray(data["wf"])){
				data["wf"] = data["wf"].map((f) => Number(f))
				this.workFormats = workFormats.filter((f) => {
					return data["wf"].includes(f.value)
				})
			} else {
				data["wf"] = Number(data["wf"])
				this.locations = locations.filter((f) => {
					return f.value === data["wf"] 
				})
			}
		}
		if (data["st"]) {
			if (Array.isArray(data["st"])){
				data["st"] = data["st"].map((f) => Number(f))
				this.statuses = statuses.filter((f) => {
					return data["st"].includes(f.value)
				})
			} else {
				data["st"] = Number(data["st"])
				this.statuses = statuses.filter((f) => {
					return f.value === data["st"] 
				})
			}
		}

		if (data["s_min"]) {
			this.salaryRange[0] = Number(data["s_min"]) ?? 0
		}
		if (data["s_max"]) {
			this.salaryRange[1] = Number(data["s_max"]) ?? 0
		}
		if (data["s_max"] || data["s_min"]) {
			this.withSalary = true
		}
		if (data["is_degree"]) {
			this.degreeIsRequired = true
		}
	}

	toQuery(){
		const query: any = {}

		if (this.search) {
			query["s"] = this.search
		}

		if (this.employments.length) {
			query["emp"] = this.employments.map((employment) => {
				return employment.value
			})
		}

		if (this.locations.length) {
			query["loc"] = this.locations.map((loc) => {
				return loc.value
			})
		}

		if (this.workFormats.length) {
			query["wf"] = this.workFormats.map((loc) => {
				return loc.value
			})
		}

		if (this.statuses.length) {
			query["st"] = this.statuses.map(st => {
				return st.value
			})
		}

		if (this.withSalary) {
			query["s_min"] = this.salaryRange[0]
			query["s_max"] = this.salaryRange[1]
		}

		if (this.degreeIsRequired) {
			query["is_degree"] = 1
		}

		if (this.companyId) {
			query["company_id"] = this.companyId
		}

		return query
	}

	toQueryStr(){
		const query = this.toQuery()
		const queryStr = Object.keys(query).map((key) => {
			if (Array.isArray(query[key])) {
				return query[key].map((value) => {
					return `${key}=${value}`
				}).join("&")
			}
			return `${key}=${query[key]}`
		}).join("&")
		return queryStr
	}

	check(vacancy:Vacancy) {
		const match = {
			search: this.search ? 
				vacancy.name.toLowerCase().includes(this.search.toLowerCase()) 
				|| vacancy.comment?.toLowerCase().includes(this.search.toLowerCase()) : true,
			employments: this.employments.length ? 
				this.employments.some(e => e.value === vacancy.employmentId) : true,
			locations: this.locations.length ? 
				this.locations.some(l => l.value === vacancy.locationId) : true,
			workFormats: this.workFormats.length ? 
				this.workFormats.some(wf => wf.value === vacancy.workFormatId) : true,
			statuses: this.statuses.length ? 
				this.statuses.some(st => st.value === vacancy.status) : true,
			salary: this.withSalary && this.salaryRange[1] > 0 ? 
				(vacancy.salary >= this.salaryRange[0] && vacancy.salary <= this.salaryRange[1]) : true,
			degree: this.degreeIsRequired ? 
				vacancy.withDegree === this.degreeIsRequired : true,
		}

		return Object.values(match).every((value) => value)
	}
}

export default VacancyListFilters