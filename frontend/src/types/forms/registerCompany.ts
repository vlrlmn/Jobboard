import validateEmail from "../../utils/emailValidation";


class RegisterCompany {
	name: string = "";
	email: string = "";
	documentId: string = "";
	password: string = "";
	agree: boolean = false;

	validate() : boolean {

		if (!this.agree)
			return false;

		if (this.documentId.length == 0) {
			return false
		} 

		if (!validateEmail(this.email)) {
			return false;
		}

		if (this.password.length < 8) {
			return false;
		}

		if (this.name.length < 3) {
			return false;
		}

		return true
	}

	toRequestBody(){
		return {
			name: this.name,
			email: this.email,
			llc_number: this.documentId,
			password: this.password
		}
	}
}

export default RegisterCompany;