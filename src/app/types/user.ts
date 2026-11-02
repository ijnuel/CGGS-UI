import { UserRolesEnum } from "./auth";

export interface CurrentUserInterface {
  userId: string;
  firstName: string;
  lastName: string;
  middleName: string;
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
  userType: UserRolesEnum;
  // Set after a super admin resets the password; the user must change it before anything else
  mustChangePassword?: boolean;
  // Set while an admin is signed in as this user for support
  impersonatorName?: string | null;
  impersonationExpiresAt?: string | null;
  userTypeString: string;
}
