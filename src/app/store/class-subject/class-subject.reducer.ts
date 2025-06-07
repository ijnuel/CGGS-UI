import { createReducer, on } from '@ngrx/store';
import * as ClassSubjectActions from './class-subject.actions';
import { ClassSubjectInterface } from '../../types/class-subject';

export interface ClassSubjectState {
  entities: ClassSubjectInterface[];
  selected: ClassSubjectInterface | null;
  loading: boolean;
  error: string | null;
  count: number;
}

export const initialState: ClassSubjectState = {
  entities: [],
  selected: null,
  loading: false,
  error: null,
  count: 0,
};

export const classSubjectReducer = createReducer(
  initialState,
  on(
    ClassSubjectActions.loadClassSubjects,
    ClassSubjectActions.loadClassSubjectsPaginated,
    ClassSubjectActions.getClassSubjectById,
    ClassSubjectActions.getClassSubjectByProperties,
    ClassSubjectActions.createClassSubject,
    ClassSubjectActions.updateClassSubject,
    ClassSubjectActions.deleteClassSubject,
    ClassSubjectActions.createManyClassSubjects,
    ClassSubjectActions.updateManyClassSubjects,
    ClassSubjectActions.deleteManyClassSubjects,
    (state) => ({ ...state, loading: true, error: null })
  ),
  on(ClassSubjectActions.loadClassSubjectsSuccess, (state, { payload }) => ({
    ...state,
    entities: payload.entity,
    loading: false,
    error: null,
  })),
  on(ClassSubjectActions.loadClassSubjectsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ClassSubjectActions.loadClassSubjectsPaginatedSuccess, (state, { payload }) => ({
    ...state,
    entities: payload.data,
    loading: false,
    error: null,
  })),
  on(ClassSubjectActions.loadClassSubjectsPaginatedFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ClassSubjectActions.getClassSubjectByIdSuccess, (state, { payload }) => ({
    ...state,
    selected: payload.entity,
    loading: false,
    error: null,
  })),
  on(ClassSubjectActions.getClassSubjectByIdFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ClassSubjectActions.getClassSubjectByPropertiesSuccess, (state, { payload }) => ({
    ...state,
    entities: payload.entity,
    loading: false,
    error: null,
  })),
  on(ClassSubjectActions.getClassSubjectByPropertiesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ClassSubjectActions.createClassSubjectSuccess, (state, { payload }) => ({
    ...state,
    entities: [...state.entities, payload.entity],
    loading: false,
    error: null,
  })),
  on(ClassSubjectActions.createClassSubjectFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ClassSubjectActions.updateClassSubjectSuccess, (state, { payload }) => ({
    ...state,
    entities: state.entities.map(e => e.id === payload.entity.id ? payload.entity : e),
    loading: false,
    error: null,
  })),
  on(ClassSubjectActions.updateClassSubjectFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ClassSubjectActions.deleteClassSubjectSuccess, (state, { payload }) => ({
    ...state,
    entities: state.entities.filter(e => e.id !== payload.entity?.id),
    loading: false,
    error: null,
  })),
  on(ClassSubjectActions.deleteClassSubjectFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ClassSubjectActions.createManyClassSubjectsSuccess, (state, { payload }) => ({
    ...state,
    entities: [...state.entities, ...(payload.entity || [])],
    loading: false,
    error: null,
  })),
  on(ClassSubjectActions.createManyClassSubjectsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ClassSubjectActions.updateManyClassSubjectsSuccess, (state, { payload }) => ({
    ...state,
    entities: state.entities.map(e => {
      const updated = (payload.entity || []).find(u => u.id === e.id);
      return updated ? updated : e;
    }),
    loading: false,
    error: null,
  })),
  on(ClassSubjectActions.updateManyClassSubjectsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ClassSubjectActions.deleteManyClassSubjectsSuccess, (state, { payload }) => ({
    ...state,
    entities: state.entities.filter(e => !(payload.entity || []).includes(e.id)),
    loading: false,
    error: null,
  })),
  on(ClassSubjectActions.deleteManyClassSubjectsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ClassSubjectActions.classSubjectCountSuccess, (state, { payload }) => ({
    ...state,
    count: payload.entity,
    loading: false,
    error: null,
  })),
  on(ClassSubjectActions.classSubjectCountFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ClassSubjectActions.classSubjectExistsSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(ClassSubjectActions.classSubjectExistsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
); 