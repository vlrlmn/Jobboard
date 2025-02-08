import validateEmail from "../../utils/emailValidation";


class RegisterUser {
	firstName: string = "";
	lastName: string = "";
	phone: string = "";
	email: string = "";
	password: string = "";
	agree: boolean = false;

	validate() : boolean {

		if (!this.agree)
			return false;

		if (!validateEmail(this.email)) {
			return false;
		}

		if (this.password.length < 8) {
			return false;
		}

		if (this.firstName.length < 1) {
			return false;
		}

		if (this.lastName.length < 1) {
			return false;
		}

		if (this.phone.length < 10) {
			return false;
		}

		return true
	}

	toRequestBody() {
		return {
			name: this.firstName,
			second_name: this.lastName,
			email: this.email,
			phone_number: this.phone,
			password: this.password
		}
	}
}

export default RegisterUser;