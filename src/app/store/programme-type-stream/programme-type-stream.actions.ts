import { createAction, props } from '@ngrx/store';
import { ProgrammeTypeStreamFormInterface, ProgrammeTypeStreamListInterface } from '../../types';
import { GenericResponseInterface, PageQueryInterface, PaginatedResponseInterface, QueryInterface } from '../../types';

// Get All
export const getProgrammeTypeStreamAll = createAction('[ProgrammeTypeStream] Get All', props<{ query?: QueryInterface }>());
export const getProgrammeTypeStreamAllSuccess = createAction('[ProgrammeTypeStream/API] Get All Success', props<{ payload: GenericResponseInterface<ProgrammeTypeStreamListInterface[]> }>());
export const getProgrammeTypeStreamAllFail = createAction('[ProgrammeTypeStream/API] Get All Fail', props<{ error: any }>());

// Get List (paginated)
export const getProgrammeTypeStreamList = createAction('[ProgrammeTypeStream] Get List', props<{ pageQuery: PageQueryInterface }>());
export const getProgrammeTypeStreamListSuccess = createAction('[ProgrammeTypeStream/API] Get List Success', props<{ payload: GenericResponseInterface<PaginatedResponseInterface<ProgrammeTypeStreamListInterface[]>> }>());
export const getProgrammeTypeStreamListFail = createAction('[ProgrammeTypeStream/API] Get List Fail', props<{ error: any }>());

// Get By Id
export const getProgrammeTypeStreamById = createAction('[ProgrammeTypeStream] Get By Id', props<{ id: string }>());
export const getProgrammeTypeStreamByIdSuccess = createAction('[ProgrammeTypeStream/API] Get By Id Success', props<{ payload: GenericResponseInterface<ProgrammeTypeStreamListInterface> }>());
export const getProgrammeTypeStreamByIdFail = createAction('[ProgrammeTypeStream/API] Get By Id Fail', props<{ error: any }>());

// Create
export const createProgrammeTypeStream = createAction('[ProgrammeTypeStream] Create', props<{ payload: ProgrammeTypeStreamFormInterface }>());
export const createProgrammeTypeStreamSuccess = createAction('[ProgrammeTypeStream/API] Create Success', props<{ payload: GenericResponseInterface<string> }>());
export const createProgrammeTypeStreamFail = createAction('[ProgrammeTypeStream/API] Create Fail', props<{ error: any }>());

// Update
export const updateProgrammeTypeStream = createAction('[ProgrammeTypeStream] Update', props<{ payload: ProgrammeTypeStreamFormInterface }>());
export const updateProgrammeTypeStreamSuccess = createAction('[ProgrammeTypeStream/API] Update Success', props<{ payload: GenericResponseInterface<string> }>());
export const updateProgrammeTypeStreamFail = createAction('[ProgrammeTypeStream/API] Update Fail', props<{ error: any }>());

// Delete
export const deleteProgrammeTypeStream = createAction('[ProgrammeTypeStream] Delete', props<{ id: string }>());
export const deleteProgrammeTypeStreamSuccess = createAction('[ProgrammeTypeStream/API] Delete Success', props<{ payload: GenericResponseInterface<string> }>());
export const deleteProgrammeTypeStreamFail = createAction('[ProgrammeTypeStream/API] Delete Fail', props<{ error: any }>());
