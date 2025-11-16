import { StudentListInterface } from '../types/student';

/**
 * Computes the full name from firstName, middleName, and lastName
 * @param student - Student object with name properties
 * @returns Student object with computed fullName property
 */
export function computeStudentFullName(student: StudentListInterface): StudentListInterface {
  const parts = [
    student.firstName,
    student.middleName,
    student.lastName
  ].filter(part => part != null && String(part).trim() !== '');
  
  return {
    ...student,
    fullName: parts.join(' ').trim() || ''
  };
}

/**
 * Computes full name for an array of students
 * @param students - Array of student objects
 * @returns Array of students with computed fullName properties
 */
export function computeStudentsFullName(students: StudentListInterface[]): StudentListInterface[] {
  return students.map(computeStudentFullName);
}

/**
 * Student class that automatically computes fullName in the constructor
 */
export class Student {
  id: string;
  studentNo: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  fullName: string;
  gender: number;
  religion: number;
  dateOfBirth: Date;
  originLGAId: string;
  stateOfOriginId: string;
  nationalityId: string;
  homeAddress: string;
  residentialCity: string;
  residentialStateId: string;
  phoneNumber: string;
  familyId: string;
  classId: string;

  constructor(data: Omit<StudentListInterface, 'fullName'>) {
    this.id = data.id;
    this.studentNo = data.studentNo;
    this.userId = data.userId;
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.middleName = data.middleName;
    this.gender = data.gender;
    this.religion = data.religion;
    this.dateOfBirth = data.dateOfBirth;
    this.originLGAId = data.originLGAId;
    this.stateOfOriginId = data.stateOfOriginId;
    this.nationalityId = data.nationalityId;
    this.homeAddress = data.homeAddress;
    this.residentialCity = data.residentialCity;
    this.residentialStateId = data.residentialStateId;
    this.phoneNumber = data.phoneNumber;
    this.familyId = data.familyId;
    this.classId = data.classId;
    
    // Compute fullName in constructor
    this.fullName = this.computeFullName();
  }

  /**
   * Computes the full name from firstName, middleName, and lastName
   * @returns The computed full name
   */
  private computeFullName(): string {
    const parts = [
      this.firstName,
      this.middleName,
      this.lastName
    ].filter(part => part != null && String(part).trim() !== '');
    
    return parts.join(' ').trim() || '';
  }

  /**
   * Converts the Student instance back to StudentListInterface
   */
  toInterface(): StudentListInterface {
    return {
      id: this.id,
      studentNo: this.studentNo,
      userId: this.userId,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      middleName: this.middleName,
      fullName: this.fullName,
      gender: this.gender,
      religion: this.religion,
      dateOfBirth: this.dateOfBirth,
      originLGAId: this.originLGAId,
      stateOfOriginId: this.stateOfOriginId,
      nationalityId: this.nationalityId,
      homeAddress: this.homeAddress,
      residentialCity: this.residentialCity,
      residentialStateId: this.residentialStateId,
      phoneNumber: this.phoneNumber,
      familyId: this.familyId,
      classId: this.classId
    };
  }
}

