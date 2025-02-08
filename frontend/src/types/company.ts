class CompanyInfo {
    id:number
    name:string
    llcNumber:string
    /**
     *
     */
    constructor(data:any) {
        this.id = data.id
        this.name = data.name
        this.llcNumber = data.llcNumber
    }
}

export default CompanyInfo;