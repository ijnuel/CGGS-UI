import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  StateListInterface,
  StateFormInterface,
} from '../../types';

// Get All (non-paginated)
export const getStateAll = createAction('[State] Get All');

export const getStateAllSuccess = createAction(
  '[State/API] Get All Success',
  props<{
    payload: GenericResponseInterface<StateListInterface[]>;
  }>()
);

export const getStateAllFail = createAction(
  '[State/API] Get All Fail',
  props<{ error: string }>()
);

// Get All Paginated
export const getStateList = createAction(
  '[State] Get List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getStateListSuccess = createAction(
  '[State/API] Get List Success',
  props<{
    payload: GenericResponseInterface<PaginatedResponseInterface<StateListInterface[]>>;
  }>()
);

export const getStateListFail = createAction(
  '[State/API] Get List Fail',
  props<{ error: string }>()
);

// Get By Id
export const getStateById = createAction(
  '[State] Get By Id',
  props<{ stateId: string }>()
);

export const getStateByIdSuccess = createAction(
  '[State/API] Get By Id Success',
  props<{
    payload: GenericResponseInterface<StateListInterface>;
  }>()
);

export const getStateByIdFail = createAction(
  '[State/API] Get By Id Fail',
  props<{ error: string }>()
);

// Get By Properties
export const getStateByProperties = createAction(
  '[State] Get By Properties',
  props<{ properties: Partial<StateFormInterface> }>()
);

export const getStateByPropertiesSuccess = createAction(
  '[State/API] Get By Properties Success',
  props<{
    payload: GenericResponseInterface<StateListInterface[]>;
  }>()
);

export const getStateByPropertiesFail = createAction(
  '[State/API] Get By Properties Fail',
  props<{ error: string }>()
);

// Exists
export const stateExists = createAction(
  '[State] Exists',
  props<{ properties: Partial<StateFormInterface> }>()
);

export const stateExistsSuccess = createAction(
  '[State/API] Exists Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const stateExistsFail = createAction(
  '[State/API] Exists Fail',
  props<{ error: string }>()
);

// Count
export const stateCount = createAction('[State] Count');

export const stateCountSuccess = createAction(
  '[State/API] Count Success',
  props<{
    payload: GenericResponseInterface<number>;
  }>()
);

export const stateCountFail = createAction(
  '[State/API] Count Fail',
  props<{ error: string }>()
);

// Create
export const createState = createAction(
  '[State] Create',
  props<{ payload: StateFormInterface }>()
);

export const createStateSuccess = createAction(
  '[State/API] Create Success',
  props<{
    payload: GenericResponseInterface<StateListInterface>;
  }>()
);

export const createStateFail = createAction(
  '[State/API] Create Fail',
  props<{ error: string }>()
);

// Update
export const updateState = createAction(
  '[State] Update',
  props<{ payload: StateFormInterface }>()
);

export const updateStateSuccess = createAction(
  '[State/API] Update Success',
  props<{
    payload: GenericResponseInterface<StateListInterface>;
  }>()
);

export const updateStateFail = createAction(
  '[State/API] Update Fail',
  props<{ error: string }>()
);

// Delete
export const deleteState = createAction(
  '[State] Delete',
  props<{ stateId: string }>()
);

export const deleteStateSuccess = createAction(
  '[State/API] Delete Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteStateFail = createAction(
  '[State/API] Delete Fail',
  props<{ error: string }>()
);

// Create Many
export const createManyStates = createAction(
  '[State] Create Many',
  props<{ payload: StateFormInterface[] }>()
);

export const createManyStatesSuccess = createAction(
  '[State/API] Create Many Success',
  props<{
    payload: GenericResponseInterface<StateListInterface[]>;
  }>()
);

export const createManyStatesFail = createAction(
  '[State/API] Create Many Fail',
  props<{ error: string }>()
);

// Update Many
export const updateManyStates = createAction(
  '[State] Update Many',
  props<{ payload: StateFormInterface[] }>()
);

export const updateManyStatesSuccess = createAction(
  '[State/API] Update Many Success',
  props<{
    payload: GenericResponseInterface<StateListInterface[]>;
  }>()
);

export const updateManyStatesFail = createAction(
  '[State/API] Update Many Fail',
  props<{ error: string }>()
);

// Delete Many
export const deleteManyStates = createAction(
  '[State] Delete Many',
  props<{ stateIds: string[] }>()
);

export const deleteManyStatesSuccess = createAction(
  '[State/API] Delete Many Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteManyStatesFail = createAction(
  '[State/API] Delete Many Fail',
  props<{ error: string }>()
);
