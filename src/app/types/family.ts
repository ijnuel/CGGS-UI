export interface FamilyListInterface {
    id: string;
    familyNo: string;
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    gender: number;
    religion: number;
    dateOfBirth: Date;
    originLgaId: string;
    stateOfOriginId: string;
    nationalityId: string;
    homeAddress: string;
    residentialCity: string;
    residentialStateId: string;
    phoneNumber: string;
}

export interface FamilyFormInterface {
    id?: string;
    email: string;
    lastName: string;
    religion: number;
    originLgaId: string;
    stateOfOriginId: string;
    nationalityId: string;
    homeAddress: string;
    residentialCity: string;
    residentialStateId: string;
    phoneNumber: string;
}
