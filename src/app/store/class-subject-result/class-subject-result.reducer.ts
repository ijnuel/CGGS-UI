import { createReducer, on } from '@ngrx/store';
import * as ClassSubjectResultActions from './class-subject-result.actions';
import { ClassSubjectResultInterface } from '../../types/class-subject-result';

export interface ClassSubjectResultState {
  entities: ClassSubjectResultInterface[];
  selected: ClassSubjectResultInterface | null;
  loading: boolean;
  error: string | null;
  count: number;
}

export const initialState: ClassSubjectResultState = {
  entities: [],
  selected: null,
  loading: false,
  error: null,
  count: 0,
};

export const classSubjectResultReducer = createReducer(
  initialState,
  on(
    ClassSubjectResultActions.loadClassSubjectResults,
    ClassSubjectResultActions.loadClassSubjectResultsPaginated,
    ClassSubjectResultActions.getClassSubjectResultById,
    ClassSubjectResultActions.getClassSubjectResultByProperties,
    ClassSubjectResultActions.createClassSubjectResult,
    ClassSubjectResultActions.updateClassSubjectResult,
    ClassSubjectResultActions.deleteClassSubjectResult,
    ClassSubjectResultActions.createManyClassSubjectResults,
    ClassSubjectResultActions.updateManyClassSubjectResults,
    ClassSubjectResultActions.deleteManyClassSubjectResults,
    (state) => ({ ...state, loading: true, error: null })
  ),
  on(ClassSubjectResultActions.loadClassSubjectResultsSuccess, (state, { payload }) => ({
    ...state,
    entities: payload.entity,
    loading: false,
    error: null,
  })),
  on(ClassSubjectResultActions.loadClassSubjectResultsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ClassSubjectResultActions.loadClassSubjectResultsPaginatedSuccess, (state, { payload }) => ({
    ...state,
    entities: payload.data,
    loading: false,
    error: null,
  })),
  on(ClassSubjectResultActions.loadClassSubjectResultsPaginatedFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ClassSubjectResultActions.getClassSubjectResultByIdSuccess, (state, { payload }) => ({
    ...state,
    selected: payload.entity,
    loading: false,
    error: null,
  })),
  on(ClassSubjectResultActions.getClassSubjectResultByIdFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ClassSubjectResultActions.getClassSubjectResultByPropertiesSuccess, (state, { payload }) => ({
    ...state,
    entities: payload.entity,
    loading: false,
    error: null,
  })),
  on(ClassSubjectResultActions.getClassSubjectResultByPropertiesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ClassSubjectResultActions.createClassSubjectResultSuccess, (state, { payload }) => ({
    ...state,
    entities: [...state.entities, payload.entity],
    loading: false,
    error: null,
  })),
  on(ClassSubjectResultActions.createClassSubjectResultFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ClassSubjectResultActions.updateClassSubjectResultSuccess, (state, { payload }) => ({
    ...state,
    entities: state.entities.map(e => e.id === payload.entity.id ? payload.entity : e),
    loading: false,
    error: null,
  })),
  on(ClassSubjectResultActions.updateClassSubjectResultFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ClassSubjectResultActions.deleteClassSubjectResultSuccess, (state, { payload }) => ({
    ...state,
    entities: state.entities.filter(e => e.id !== payload.entity?.id),
    loading: false,
    error: null,
  })),
  on(ClassSubjectResultActions.deleteClassSubjectResultFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ClassSubjectResultActions.createManyClassSubjectResultsSuccess, (state, { payload }) => ({
    ...state,
    entities: [...state.entities, ...(payload.entity || [])],
    loading: false,
    error: null,
  })),
  on(ClassSubjectResultActions.createManyClassSubjectResultsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ClassSubjectResultActions.updateManyClassSubjectResultsSuccess, (state, { payload }) => ({
    ...state,
    entities: state.entities.map(e => {
      const updated = (payload.entity || []).find(u => u.id === e.id);
      return updated ? updated : e;
    }),
    loading: false,
    error: null,
  })),
  on(ClassSubjectResultActions.updateManyClassSubjectResultsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ClassSubjectResultActions.deleteManyClassSubjectResultsSuccess, (state, { payload }) => ({
    ...state,
    entities: state.entities.filter(e => !(payload.entity || []).includes(e.id)),
    loading: false,
    error: null,
  })),
  on(ClassSubjectResultActions.deleteManyClassSubjectResultsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ClassSubjectResultActions.classSubjectResultCountSuccess, (state, { payload }) => ({
    ...state,
    count: payload.entity,
    loading: false,
    error: null,
  })),
  on(ClassSubjectResultActions.classSubjectResultCountFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ClassSubjectResultActions.classSubjectResultExistsSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(ClassSubjectResultActions.classSubjectResultExistsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
); 