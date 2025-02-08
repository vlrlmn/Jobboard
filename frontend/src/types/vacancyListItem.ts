class VacancyListItem {
    id: number;
    name: string;
    salary: string;
    companyName: number;
    locationId: number;
    constructor(data:any) {
        this.id = data["id"];
        this.name = data["name"];
        this.salary = data["salary"];
        this.companyName = data["companyName"];
        this.locationId = data["locationId"];    
    }
}

export default VacancyListItem