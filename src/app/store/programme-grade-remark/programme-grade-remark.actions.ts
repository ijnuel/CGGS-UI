import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  QueryInterface,
  ProgrammeGradeRemarkListInterface,
  ProgrammeGradeRemarkFormInterface,
} from '../../types';

// Get All (non-paginated)
export const getProgrammeGradeRemarkAll = createAction('[ProgrammeGradeRemark] Get All', props<{ query?: QueryInterface }>());

export const getProgrammeGradeRemarkAllSuccess = createAction(
  '[ProgrammeGradeRemark/API] Get All Success',
  props<{
    payload: GenericResponseInterface<ProgrammeGradeRemarkListInterface[]>;
  }>()
);

export const getProgrammeGradeRemarkAllFail = createAction(
  '[ProgrammeGradeRemark/API] Get All Fail',
  props<{ error: string }>()
);

// Get All Paginated
export const getProgrammeGradeRemarkList = createAction(
  '[ProgrammeGradeRemark] Get List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getProgrammeGradeRemarkListSuccess = createAction(
  '[ProgrammeGradeRemark/API] Get List Success',
  props<{
    payload: GenericResponseInterface<PaginatedResponseInterface<ProgrammeGradeRemarkListInterface[]>>;
  }>()
);

export const getProgrammeGradeRemarkListFail = createAction(
  '[ProgrammeGradeRemark/API] Get List Fail',
  props<{ error: string }>()
);

// Get By Id
export const getProgrammeGradeRemarkById = createAction(
  '[ProgrammeGradeRemark] Get By Id',
  props<{ programmeGradeRemarkId: string }>()
);

export const getProgrammeGradeRemarkByIdSuccess = createAction(
  '[ProgrammeGradeRemark/API] Get By Id Success',
  props<{
    payload: GenericResponseInterface<ProgrammeGradeRemarkListInterface>;
  }>()
);

export const getProgrammeGradeRemarkByIdFail = createAction(
  '[ProgrammeGradeRemark/API] Get By Id Fail',
  props<{ error: string }>()
);

// Get By Properties
export const getProgrammeGradeRemarkByProperties = createAction(
  '[ProgrammeGradeRemark] Get By Properties',
  props<{ properties: Partial<ProgrammeGradeRemarkFormInterface> }>()
);

export const getProgrammeGradeRemarkByPropertiesSuccess = createAction(
  '[ProgrammeGradeRemark/API] Get By Properties Success',
  props<{
    payload: GenericResponseInterface<ProgrammeGradeRemarkListInterface[]>;
  }>()
);

export const getProgrammeGradeRemarkByPropertiesFail = createAction(
  '[ProgrammeGradeRemark/API] Get By Properties Fail',
  props<{ error: string }>()
);

// Exists
export const programmeGradeRemarkExists = createAction(
  '[ProgrammeGradeRemark] Exists',
  props<{ properties: Partial<ProgrammeGradeRemarkFormInterface> }>()
);

export const programmeGradeRemarkExistsSuccess = createAction(
  '[ProgrammeGradeRemark/API] Exists Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const programmeGradeRemarkExistsFail = createAction(
  '[ProgrammeGradeRemark/API] Exists Fail',
  props<{ error: string }>()
);

// Count
export const programmeGradeRemarkCount = createAction('[ProgrammeGradeRemark] Count');

export const programmeGradeRemarkCountSuccess = createAction(
  '[ProgrammeGradeRemark/API] Count Success',
  props<{
    payload: GenericResponseInterface<number>;
  }>()
);

export const programmeGradeRemarkCountFail = createAction(
  '[ProgrammeGradeRemark/API] Count Fail',
  props<{ error: string }>()
);

// Create
export const createProgrammeGradeRemark = createAction(
  '[ProgrammeGradeRemark] Create',
  props<{ payload: ProgrammeGradeRemarkFormInterface }>()
);

export const createProgrammeGradeRemarkSuccess = createAction(
  '[ProgrammeGradeRemark/API] Create Success',
  props<{
    payload: GenericResponseInterface<ProgrammeGradeRemarkListInterface>;
  }>()
);

export const createProgrammeGradeRemarkFail = createAction(
  '[ProgrammeGradeRemark/API] Create Fail',
  props<{ error: string }>()
);

// Update
export const updateProgrammeGradeRemark = createAction(
  '[ProgrammeGradeRemark] Update',
  props<{ payload: ProgrammeGradeRemarkFormInterface }>()
);

export const updateProgrammeGradeRemarkSuccess = createAction(
  '[ProgrammeGradeRemark/API] Update Success',
  props<{
    payload: GenericResponseInterface<ProgrammeGradeRemarkListInterface>;
  }>()
);

export const updateProgrammeGradeRemarkFail = createAction(
  '[ProgrammeGradeRemark/API] Update Fail',
  props<{ error: string }>()
);

// Delete
export const deleteProgrammeGradeRemark = createAction(
  '[ProgrammeGradeRemark] Delete',
  props<{ programmeGradeRemarkId: string }>()
);

export const deleteProgrammeGradeRemarkSuccess = createAction(
  '[ProgrammeGradeRemark/API] Delete Success',
  props<{
    payload: GenericResponseInterface<boolean>;
    programmeGradeRemarkId: string;
  }>()
);

export const deleteProgrammeGradeRemarkFail = createAction(
  '[ProgrammeGradeRemark/API] Delete Fail',
  props<{ error: string }>()
);

// Create Many
export const createManyProgrammeGradeRemarks = createAction(
  '[ProgrammeGradeRemark] Create Many',
  props<{ payload: ProgrammeGradeRemarkFormInterface[] }>()
);

export const createManyProgrammeGradeRemarksSuccess = createAction(
  '[ProgrammeGradeRemark/API] Create Many Success',
  props<{
    payload: GenericResponseInterface<ProgrammeGradeRemarkListInterface[]>;
  }>()
);

export const createManyProgrammeGradeRemarksFail = createAction(
  '[ProgrammeGradeRemark/API] Create Many Fail',
  props<{ error: string }>()
);

// Update Many
export const updateManyProgrammeGradeRemarks = createAction(
  '[ProgrammeGradeRemark] Update Many',
  props<{ payload: ProgrammeGradeRemarkFormInterface[] }>()
);

export const updateManyProgrammeGradeRemarksSuccess = createAction(
  '[ProgrammeGradeRemark/API] Update Many Success',
  props<{
    payload: GenericResponseInterface<ProgrammeGradeRemarkListInterface[]>;
  }>()
);

export const updateManyProgrammeGradeRemarksFail = createAction(
  '[ProgrammeGradeRemark/API] Update Many Fail',
  props<{ error: string }>()
);

// Delete Many
export const deleteManyProgrammeGradeRemarks = createAction(
  '[ProgrammeGradeRemark] Delete Many',
  props<{ programmeGradeRemarkIds: string[] }>()
);

export const deleteManyProgrammeGradeRemarksSuccess = createAction(
  '[ProgrammeGradeRemark/API] Delete Many Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteManyProgrammeGradeRemarksFail = createAction(
  '[ProgrammeGradeRemark/API] Delete Many Fail',
  props<{ error: string }>()
);
