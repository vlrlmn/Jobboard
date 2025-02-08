import CompanyAPI from "../api/company/api"
import CompanyInfo from "../types/company"

class CompanyAuth {
	static keyName:string="company-key"

	static info:CompanyInfo|undefined = undefined

	static setupInfo(companyId:number){
		CompanyAPI.info.general(companyId).then((res) => {
			if (res.status >= 400) {
				throw new Error('Get company info failed')
			}
			const data = res.data
			this.info = new CompanyInfo(data)
		})
	}

	static getCompanyId() : number|undefined{
		const rawValue = localStorage.getItem(this.keyName)
		if (!rawValue || Number.isNaN(Number(rawValue)))
			return undefined
		return Number(rawValue)
	}

	static setCompanyId(value:number){
        localStorage.setItem("user-type", "company")
        localStorage.setItem(this.keyName, value.toString())
	}

	static delCompanyId(){
		localStorage.removeItem("user-type")
		localStorage.removeItem(this.keyName)
	}
}

export default CompanyAuth