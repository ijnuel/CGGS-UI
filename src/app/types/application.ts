export interface ApplicationListInterface {
    id: string;
    familyNo: string;
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

export interface ApplicationFormInterface {
    id?: string;
    familyNo: string;
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
