import {
  LoginPayloadInterface,
  UserRolesEnum,
  LoginResponseInterface,
} from './auth';
import { StudentFormInterface, StudentsListInterface } from './students';
import { TestEntityTemplateFormInterface, TestEntityTemplateListInterface } from './test-entity-template';
import { ApplicationFormInterface, ApplicationListInterface } from './application';
import { ParentFormInterface, ParentListInterface } from './parent';
import { StateFormInterface, StateListInterface } from './state';
import { SessionFormInterface, SessionListInterface } from './session';
import { LocalGovernmentAreaFormInterface, LocalGovernmentAreaListInterface } from './local-government-area';
import { CountryFormInterface, CountryListInterface } from './country';
import { CompanyFormInterface, CompanyListInterface } from './company';
import { StudentClassFormInterface, StudentClassListInterface } from './student-class';
import { SchoolConfigurationFormInterface, SchoolConfigurationListInterface } from './school-configuration';
import { ProgramTypeFormInterface, ProgramTypeListInterface } from './program-type';
import { ClassLevelFormInterface, ClassLevelListInterface } from './class-level';
import { ClassFormInterface, ClassListInterface } from './class';
import { TeacherFormInterface, TeacherListInterface } from './teacher';
import { AdministratorFormInterface, AdministratorListInterface } from './administrator';
import {
  CurrentUserInterface,
  UserListInterface,
  GenderEnum,
  ReligionEnum,
  UserFormInterface,
} from './user';

interface GenericResponseInterface<T> {
  error: string;
  exceptionError: string;
  message: string;
  messages: string[];
  entity: T;
  succeeded: boolean;
}

interface PaginatedResponseInterface<T> {
  currentPage: number;
  recordPerPage: number;
  totalPages: number;
  totalCount: number;
  data: T;
}

interface PageQueryInterface {
  start: number;
  recordsPerPage: number;
  pageIndex?: number
  searchText?: string;
}

interface DropdownListInterface {
  name: string;
  description: string;
  value: string | number;
  id: string | number;
}

export {
  GenericResponseInterface,
  PaginatedResponseInterface,
  LoginPayloadInterface,
  LoginResponseInterface,
  UserRolesEnum,
  CurrentUserInterface,
  PageQueryInterface,
  UserListInterface,
  UserFormInterface,
  GenderEnum,
  ReligionEnum,
  StudentsListInterface,
  StudentFormInterface,
  DropdownListInterface,
  AdministratorListInterface,
  AdministratorFormInterface,
  TestEntityTemplateListInterface,
  ApplicationListInterface,
  ParentListInterface,
  StateListInterface,
  SessionListInterface,
  LocalGovernmentAreaListInterface,
  CountryListInterface,
  CompanyListInterface,
  StudentClassListInterface,
  SchoolConfigurationListInterface,
  ProgramTypeListInterface,
  ClassLevelListInterface,
  ClassListInterface,
  TeacherListInterface,
  TestEntityTemplateFormInterface,
  ApplicationFormInterface,
  ParentFormInterface,
  StateFormInterface,
  SessionFormInterface,
  LocalGovernmentAreaFormInterface,
  CountryFormInterface,
  CompanyFormInterface,
  StudentClassFormInterface,
  SchoolConfigurationFormInterface,
  ProgramTypeFormInterface,
  ClassLevelFormInterface,
  ClassFormInterface,
  TeacherFormInterface,
};
