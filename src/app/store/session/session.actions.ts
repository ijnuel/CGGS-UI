import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  SessionListInterface,
  SessionFormInterface,
} from '../../types';

// Get All (non-paginated)
export const getSessionAll = createAction('[Session] Get All');

export const getSessionAllSuccess = createAction(
  '[Session/API] Get All Success',
  props<{
    payload: GenericResponseInterface<SessionListInterface[]>;
  }>()
);

export const getSessionAllFail = createAction(
  '[Session/API] Get All Fail',
  props<{ error: string }>()
);

// Get All Paginated
export const getSessionList = createAction(
  '[Session] Get List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getSessionListSuccess = createAction(
  '[Session/API] Get List Success',
  props<{
    payload: GenericResponseInterface<PaginatedResponseInterface<SessionListInterface[]>>;
  }>()
);

export const getSessionListFail = createAction(
  '[Session/API] Get List Fail',
  props<{ error: string }>()
);

// Get By Id
export const getSessionById = createAction(
  '[Session] Get By Id',
  props<{ sessionId: string }>()
);

export const getSessionByIdSuccess = createAction(
  '[Session/API] Get By Id Success',
  props<{
    payload: GenericResponseInterface<SessionListInterface>;
  }>()
);

export const getSessionByIdFail = createAction(
  '[Session/API] Get By Id Fail',
  props<{ error: string }>()
);

// Get By Properties
export const getSessionByProperties = createAction(
  '[Session] Get By Properties',
  props<{ properties: Partial<SessionFormInterface> }>()
);

export const getSessionByPropertiesSuccess = createAction(
  '[Session/API] Get By Properties Success',
  props<{
    payload: GenericResponseInterface<SessionListInterface[]>;
  }>()
);

export const getSessionByPropertiesFail = createAction(
  '[Session/API] Get By Properties Fail',
  props<{ error: string }>()
);

// Exists
export const sessionExists = createAction(
  '[Session] Exists',
  props<{ properties: Partial<SessionFormInterface> }>()
);

export const sessionExistsSuccess = createAction(
  '[Session/API] Exists Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const sessionExistsFail = createAction(
  '[Session/API] Exists Fail',
  props<{ error: string }>()
);

// Count
export const sessionCount = createAction('[Session] Count');

export const sessionCountSuccess = createAction(
  '[Session/API] Count Success',
  props<{
    payload: GenericResponseInterface<number>;
  }>()
);

export const sessionCountFail = createAction(
  '[Session/API] Count Fail',
  props<{ error: string }>()
);

// Create
export const createSession = createAction(
  '[Session] Create',
  props<{ payload: SessionFormInterface }>()
);

export const createSessionSuccess = createAction(
  '[Session/API] Create Success',
  props<{
    payload: GenericResponseInterface<SessionListInterface>;
  }>()
);

export const createSessionFail = createAction(
  '[Session/API] Create Fail',
  props<{ error: string }>()
);

// Update
export const updateSession = createAction(
  '[Session] Update',
  props<{ payload: SessionFormInterface }>()
);

export const updateSessionSuccess = createAction(
  '[Session/API] Update Success',
  props<{
    payload: GenericResponseInterface<SessionListInterface>;
  }>()
);

export const updateSessionFail = createAction(
  '[Session/API] Update Fail',
  props<{ error: string }>()
);

// Delete
export const deleteSession = createAction(
  '[Session] Delete',
  props<{ sessionId: string }>()
);

export const deleteSessionSuccess = createAction(
  '[Session/API] Delete Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteSessionFail = createAction(
  '[Session/API] Delete Fail',
  props<{ error: string }>()
);

// Create Many
export const createManySessions = createAction(
  '[Session] Create Many',
  props<{ payload: SessionFormInterface[] }>()
);

export const createManySessionsSuccess = createAction(
  '[Session/API] Create Many Success',
  props<{
    payload: GenericResponseInterface<SessionListInterface[]>;
  }>()
);

export const createManySessionsFail = createAction(
  '[Session/API] Create Many Fail',
  props<{ error: string }>()
);

// Update Many
export const updateManySessions = createAction(
  '[Session] Update Many',
  props<{ payload: SessionFormInterface[] }>()
);

export const updateManySessionsSuccess = createAction(
  '[Session/API] Update Many Success',
  props<{
    payload: GenericResponseInterface<SessionListInterface[]>;
  }>()
);

export const updateManySessionsFail = createAction(
  '[Session/API] Update Many Fail',
  props<{ error: string }>()
);

// Delete Many
export const deleteManySessions = createAction(
  '[Session] Delete Many',
  props<{ sessionIds: string[] }>()
);

export const deleteManySessionsSuccess = createAction(
  '[Session/API] Delete Many Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteManySessionsFail = createAction(
  '[Session/API] Delete Many Fail',
  props<{ error: string }>()
);
