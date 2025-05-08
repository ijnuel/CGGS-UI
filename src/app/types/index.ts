import {
  LoginPayloadInterface,
  UserRolesEnum,
  LoginResponseInterface,
} from './auth';
import { StudentFormInterface, StudentsListInterface } from './students';
import { TestEntityTemplateFormInterface, TestEntityTemplateListInterface } from './test-entity-template';
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
  TestEntityTemplateFormInterface,
};
