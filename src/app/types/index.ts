import {
  LoginPayloadInterface,
  UserRolesEnum,
  LoginResponseInterface,
} from './auth';
import { TestEntityTemplateFormInterface, TestEntityTemplateListInterface } from './test-entity-template';
import { PrincipalRemarkFormInterface, PrincipalRemarkListInterface } from './principal-remark';
import { ProgrammeGradeRemarkFormInterface, ProgrammeGradeRemarkListInterface } from './programme-grade-remark';
import { FamilyFormInterface, FamilyListInterface } from './family';
import { StudentFormInterface, StudentListInterface } from './student';
import { ClassSubjectAssessmentFormInterface, ClassSubjectAssessmentListInterface } from './class-subject-assessment';
import { ClassSubjectFormInterface, ClassSubjectListInterface } from './class-subject';
import { ClassLevelFormInterface, ClassLevelListInterface } from './class-level';
import { ClassFormInterface, ClassListInterface } from './class';
import { SubjectFormInterface, SubjectListInterface } from './subject';
import { ProgramTypeFormInterface, ProgramTypeListInterface } from './program-type';
import { ApplicationFormInterface, ApplicationListInterface } from './application';
import { StateFormInterface, StateListInterface } from './state';
import { SessionFormInterface, SessionListInterface } from './session';
import { LocalGovernmentAreaFormInterface, LocalGovernmentAreaListInterface } from './local-government-area';
import { CountryFormInterface, CountryListInterface } from './country';
import { CompanyFormInterface, CompanyListInterface } from './company';
import { StudentClassFormInterface, StudentClassListInterface } from './student-class';
import { SchoolTermSessionFormInterface, SchoolTermSessionListInterface } from './school-term-session';
import { StaffFormInterface, StaffListInterface } from './staff';
import { AdministratorFormInterface, AdministratorListInterface } from './administrator';
import { ProgramSetupLevel, ProgramSetupLevelConfig } from './program-setup-level';
import { ResultMarkSheetInterface, ResultMarkSheetFormInterface, StudentAssessmentScoreInterface, AssessmentColumnInterface, StudentAssessmentRowInterface } from './result';
import { StudentClassSubjectAssessmentScoreListInterface, StudentClassSubjectAssessmentScoreFormInterface } from './student-class-subject-assessment-score';
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
}

export {
  GenericResponseInterface,
  PaginatedResponseInterface,
  LoginPayloadInterface,
  LoginResponseInterface,
  UserRolesEnum,
  CurrentUserInterface,
  PageQueryInterface,
  StudentFormInterface,
  DropdownListInterface,
  AdministratorListInterface,
  AdministratorFormInterface,
  TestEntityTemplateListInterface,
  PrincipalRemarkListInterface,
  ProgrammeGradeRemarkListInterface,
  FamilyListInterface,
  StudentListInterface,
  ClassSubjectAssessmentListInterface,
  ClassSubjectListInterface,
  ClassLevelListInterface,
  ClassListInterface,
  SubjectListInterface,
  ProgramTypeListInterface,
  ApplicationListInterface,
  StateListInterface,
  SessionListInterface,
  LocalGovernmentAreaListInterface,
  CountryListInterface,
  CompanyListInterface,
  StudentClassListInterface,
  SchoolTermSessionListInterface,
  StaffListInterface,
  ResultMarkSheetInterface,
  ResultMarkSheetFormInterface,
  StudentAssessmentScoreInterface,
  AssessmentColumnInterface,
  StudentAssessmentRowInterface,
  StudentClassSubjectAssessmentScoreListInterface,
  StudentClassSubjectAssessmentScoreFormInterface,
  TestEntityTemplateFormInterface,
  PrincipalRemarkFormInterface,
  ProgrammeGradeRemarkFormInterface,
  FamilyFormInterface,
  ClassSubjectAssessmentFormInterface,
  ClassSubjectFormInterface,
  ClassLevelFormInterface,
  ClassFormInterface,
  SubjectFormInterface,
  ProgramTypeFormInterface,
  ApplicationFormInterface,
  StateFormInterface,
  SessionFormInterface,
  LocalGovernmentAreaFormInterface,
  CountryFormInterface,
  CompanyFormInterface,
  StudentClassFormInterface,
  SchoolTermSessionFormInterface,
  StaffFormInterface,
  ProgramSetupLevel,
  ProgramSetupLevelConfig,
};
