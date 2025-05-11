import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  SessionListInterface,
  SessionFormInterface,
} from '../../types';

export const getSessionList = createAction(
  '[Session] Get Session List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getSessionListSuccess = createAction(
  '[Session/API] Get Session List Success',
  props<{
    payload: GenericResponseInterface<
      PaginatedResponseInterface<SessionListInterface[]>
    >;
  }>()
);

export const getSessionListFail = createAction(
  '[Session/API] Get Session List Fail',
  props<{ error: string }>()
);

export const getSessionById = createAction(
  '[Session] Get Session By Id',
  props<{ sessionId: string }>()
);

export const getSessionByIdSuccess = createAction(
  '[Session/API] Get Session By Id Success',
  props<{
    payload: GenericResponseInterface<SessionListInterface>;
  }>()
);

export const getSessionByIdFail = createAction(
  '[Session/API] Get Session By Id Fail',
  props<{ error: string }>()
);

export const createSession = createAction(
  '[Session] Create Session',
  props<{ payload: SessionFormInterface }>()
);

export const createSessionSuccess = createAction(
  '[Session/API] Create Session Success',
  props<{ message: string; session: SessionListInterface }>()
);

export const createSessionFail = createAction(
  '[Session/API] Create Session Fail',
  props<{ error: string }>()
);

export const editSession = createAction(
  '[Session] Edit Session',
  props<{ payload: SessionFormInterface }>()
);

export const editSessionSuccess = createAction(
  '[Session/API] Edit Session Success',
  props<{ message: string; session: SessionListInterface }>()
);

export const editSessionFail = createAction(
  '[Session/API] Edit Session Fail',
  props<{ error: string }>()
);
