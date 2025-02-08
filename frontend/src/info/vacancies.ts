import Vacancy from "../types/vacancy";

function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const vacancies: Vacancy[] = Array.from({ length: 20 }, (_, index) => new Vacancy({
    id: index + 1,
    name: `Vacancy ${index + 1}`,
    companyName: `Company ${index + 1}`,
    salary: randomNumber(20, 100) * 100,
    locationId: randomNumber(1, 50),
    applies: randomNumber(0, 100),
    employmentId: randomNumber(1, 3),
    workFormatId: randomNumber(1, 3),
    experience: randomNumber(0, 10),
    withDegree: randomNumber(0, 1) === 1,
    skills: ["JavaScript", "TypeScript", "Vue", "Node.js"].join(" "),
    // status: Math.floor(Math.random() * 3) + 1,
}));

export default vacancies;