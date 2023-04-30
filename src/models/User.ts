export enum UserRole {
    PROFESSOR = "Professor",
    CORRECTOR = "Corrector",
    STUDENT = "Student"
}

export type User = {
    _id: string;
    username: string;
    name: string;
}
