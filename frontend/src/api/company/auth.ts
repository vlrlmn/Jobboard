import RegisterCompany from "../../types/forms/registerCompany";
import SignInUser from "../../types/forms/signInUser";
import client from "./client";

class AuthAPI {
    static login(form: SignInUser) {
        return client.post('auth', {
            email: form.email,
            password: form.password
        });
    }
    static register(form:RegisterCompany) {
        return client.post('register', form.toRequestBody());
    }
}

export default AuthAPI