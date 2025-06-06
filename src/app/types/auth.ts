export interface LoginPayloadInterface {
  userName: string;
  email: string;
  password: string;
}

export interface LoginResponseInterface {
  message: string;
  token: boolean;
  currentUser: LoggedUserInterface;
}

export interface LoggedUserInterface {
  id: string;
  userName: string;
  email: string;
  userType: string;
}

export enum UserRolesEnum {
  SuperAdmin = 'superadmin',
  Admin = 'admin',
  Staff = 'staff',
  Student = 'student',
  Family = 'family'
}
