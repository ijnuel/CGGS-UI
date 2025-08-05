import { FormGroup } from "@angular/forms";
import { DropdownListInterface } from ".";

export enum ProgramSetupLevel {
  PROGRAMTYPE = 'Program Type',
  CLASSLEVEL = 'Class Level',
  CLASSARM = 'Class Arm',
  CLASSSUBJECT = 'Class Subject',
  CLASSSUBJECTASSESSMENT = 'Class Subject Assessment',
} 

export interface ProgramSetupLevelConfig {
  label: ProgramSetupLevel;
  formGroup?: FormGroup;
  submitHandler: (parent: any) => void;
  childItemsFn: (id: string) => any[];
  childConfig?: ProgramSetupLevelConfig;
  getName?: (item: any) => string;
  getId?: (item: any) => string;
  showTable?: (item: any) => boolean;
  tableHeaderData?: any[];
  getTableData?: (id: string) => any[];
  showAddButton?: (item: any) => boolean;
  dropDownOptions?: (id: string) => { key: string, dropDownListFn:() => DropdownListInterface[] }[]
}