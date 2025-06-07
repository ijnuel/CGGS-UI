import {
  LoginPayloadInterface,
  UserRolesEnum,
  LoginResponseInterface,
} from './auth';
import { StudentFormInterface, StudentsListInterface } from './students';
import { TestEntityTemplateFormInterface, TestEntityTemplateListInterface } from './test-entity-template';
import { ApplicationFormInterface, ApplicationListInterface } from './application';
import { FamilyFormInterface, FamilyListInterface } from './family';
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
import { StaffFormInterface, StaffListInterface } from './staff';
import { AdministratorFormInterface, AdministratorListInterface } from './administrator';
import {
  CurrentUserInterface,
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
  pageIndex?: number;
  searchText?: string;
  queryProperties?: { name: string; value: string }[];
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
  StudentsListInterface,
  StudentFormInterface,
  DropdownListInterface,
  AdministratorListInterface,
  AdministratorFormInterface,
  TestEntityTemplateListInterface,
  ApplicationListInterface,
  FamilyListInterface,
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
  StaffListInterface,
  TestEntityTemplateFormInterface,
  ApplicationFormInterface,
  FamilyFormInterface,
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
  StaffFormInterface,
};
