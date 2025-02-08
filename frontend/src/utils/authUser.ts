import UserAPI from "../api/user/api"
import UserInfo from "../types/user"

class UserAuth {
	static keyName:string="user-key"

	static info:UserInfo|undefined = undefined

	static setupInfo(userId:number){
		UserAPI.info.general(userId).then((res) => {
			if (res.status >= 400) {
				throw new Error('Get company info failed')
			}
			const data = res.data
			this.info = new UserInfo(data)
		})
	}

	static getUserId() : number|undefined{
		const rawValue = localStorage.getItem(this.keyName)
		if (!rawValue || Number.isNaN(Number(rawValue)))
			return undefined
		return Number(rawValue)
	}

	static setUserId(value:number){
		localStorage.setItem(this.keyName, value.toString())
	}
	
	static delUserId(){
		localStorage.removeItem(this.keyName)
	}
}

export default UserAuth