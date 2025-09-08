export interface StudentClassListInterface {
    id: string;
    name: string;
}

export interface StudentClassFormInterface {
    id?: string;
    studentId?: string;
    sessionId?: string;
    classId?: string;
    name?: string;
}
