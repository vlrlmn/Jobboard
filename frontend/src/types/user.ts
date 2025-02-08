class UserInfo {
    id: number;
    firstName: string;
    lastName: string;
    phone: boolean;
    email: boolean;
    /**
     *
     */
    constructor(data: any) {
        this.id = data.id;
        this.firstName = data.name;
        this.lastName = data.second_name;
        this.phone = data.phone_number;
        this.email = data.email;     
    }

    getFullName(){
        return `${this.firstName} ${this.lastName}`
    }
}

export default UserInfo;