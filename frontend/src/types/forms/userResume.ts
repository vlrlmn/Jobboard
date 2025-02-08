

class UserResume {
	id:number = 0
	name:string = ""
	experienceInYears:number|null = null
	skills:string[] = []
	description:string = ""
	isWithDegree:boolean = false

	constructor(data:any=undefined) {
		if (!data)
			return
		this.id = data.id
		this.name = data.name
		this.experienceInYears = data.experience
		this.skills = data.skills.split(' ')
		this.description = data.description
		this.isWithDegree = data.is_with_degree
	}

	validate() : boolean{

		return true
	}

	toRequestBody(){
		return {
			name: this.name,
			experience: Number(this.experienceInYears),
			skills: this.skills.join(" "),
			description: this.description,
			is_with_degree: this.isWithDegree
		}
	}
}

export default UserResume