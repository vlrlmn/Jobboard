import RegisterUser from "../../types/forms/registerUser";
import SignInUser from "../../types/forms/signInUser";
import client from "./client";

class AuthAPI {
    static login(form: SignInUser) {
        return client.post('user/login', {
            email: form.email,
            password: form.password
        });
    }
    static register(form:RegisterUser) {
        return client.post('user/register', form.toRequestBody());
    }
}

export default AuthAPI