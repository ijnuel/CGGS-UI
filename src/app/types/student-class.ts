export interface StudentClassListInterface {
    id: string;
    name: string;
    studentNo: string;
    studentFullName: string;
}

export interface StudentClassFormInterface {
    id?: string;
    studentId?: string;
    sessionId?: string;
    classId?: string;
    name?: string;
}
