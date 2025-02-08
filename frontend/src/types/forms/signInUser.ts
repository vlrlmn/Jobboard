import validateEmail from "../../utils/emailValidation";

class SignInUser {
	email: string = ""
	password: string = ""
	validate() : boolean {
		if (this.email.length < 3 || !validateEmail(this.email)) {
			return false;
		}
		if (this.password.length < 8) {
			return false;
		}
		return true
	}
}

export default SignInUser