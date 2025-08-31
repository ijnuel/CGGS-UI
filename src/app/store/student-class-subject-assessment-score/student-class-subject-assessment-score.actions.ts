import { createAction, props } from '@ngrx/store';
import { 
  StudentClassSubjectAssessmentScoreListInterface, 
  StudentClassSubjectAssessmentScoreFormInterface 
} from '../../types/student-class-subject-assessment-score';
import { GenericResponseInterface, PaginatedResponseInterface, PageQueryInterface } from '../../types';

// Get All
export const getStudentClassSubjectAssessmentScoreAll = createAction(
  '[StudentClassSubjectAssessmentScore] Get All'
);

export const getStudentClassSubjectAssessmentScoreAllSuccess = createAction(
  '[StudentClassSubjectAssessmentScore/API] Get All Success',
  props<{ payload: GenericResponseInterface<StudentClassSubjectAssessmentScoreListInterface[]> }>()
);

export const getStudentClassSubjectAssessmentScoreAllFail = createAction(
  '[StudentClassSubjectAssessmentScore/API] Get All Fail',
  props<{ error: string }>()
);

// Get List (Paginated)
export const getStudentClassSubjectAssessmentScoreList = createAction(
  '[StudentClassSubjectAssessmentScore] Get List',
  props<{ pageQuery: PageQueryInterface }>()
);

export const getStudentClassSubjectAssessmentScoreListSuccess = createAction(
  '[StudentClassSubjectAssessmentScore/API] Get List Success',
  props<{ payload: GenericResponseInterface<PaginatedResponseInterface<StudentClassSubjectAssessmentScoreListInterface[]>> }>()
);

export const getStudentClassSubjectAssessmentScoreListFail = createAction(
  '[StudentClassSubjectAssessmentScore/API] Get List Fail',
  props<{ error: string }>()
);

// Get By Id
export const getStudentClassSubjectAssessmentScoreById = createAction(
  '[StudentClassSubjectAssessmentScore] Get By Id',
  props<{ id: string }>()
);

export const getStudentClassSubjectAssessmentScoreByIdSuccess = createAction(
  '[StudentClassSubjectAssessmentScore/API] Get By Id Success',
  props<{ payload: GenericResponseInterface<StudentClassSubjectAssessmentScoreListInterface> }>()
);

export const getStudentClassSubjectAssessmentScoreByIdFail = createAction(
  '[StudentClassSubjectAssessmentScore/API] Get By Id Fail',
  props<{ error: string }>()
);

// Get By Properties
export const getStudentClassSubjectAssessmentScoreByProperties = createAction(
  '[StudentClassSubjectAssessmentScore] Get By Properties',
  props<{ properties: Partial<StudentClassSubjectAssessmentScoreFormInterface> }>()
);

export const getStudentClassSubjectAssessmentScoreByPropertiesSuccess = createAction(
  '[StudentClassSubjectAssessmentScore/API] Get By Properties Success',
  props<{ payload: GenericResponseInterface<StudentClassSubjectAssessmentScoreListInterface[]> }>()
);

export const getStudentClassSubjectAssessmentScoreByPropertiesFail = createAction(
  '[StudentClassSubjectAssessmentScore/API] Get By Properties Fail',
  props<{ error: string }>()
);

// Exists
export const studentClassSubjectAssessmentScoreExists = createAction(
  '[StudentClassSubjectAssessmentScore] Exists',
  props<{ properties: Partial<StudentClassSubjectAssessmentScoreFormInterface> }>()
);

export const studentClassSubjectAssessmentScoreExistsSuccess = createAction(
  '[StudentClassSubjectAssessmentScore/API] Exists Success',
  props<{ payload: GenericResponseInterface<boolean> }>()
);

export const studentClassSubjectAssessmentScoreExistsFail = createAction(
  '[StudentClassSubjectAssessmentScore/API] Exists Fail',
  props<{ error: string }>()
);

// Count
export const studentClassSubjectAssessmentScoreCount = createAction(
  '[StudentClassSubjectAssessmentScore] Count',
  props<{ properties: Partial<StudentClassSubjectAssessmentScoreFormInterface> }>()
);

export const studentClassSubjectAssessmentScoreCountSuccess = createAction(
  '[StudentClassSubjectAssessmentScore/API] Count Success',
  props<{ payload: GenericResponseInterface<number> }>()
);

export const studentClassSubjectAssessmentScoreCountFail = createAction(
  '[StudentClassSubjectAssessmentScore/API] Count Fail',
  props<{ error: string }>()
);

// Create
export const createStudentClassSubjectAssessmentScore = createAction(
  '[StudentClassSubjectAssessmentScore] Create',
  props<{ payload: StudentClassSubjectAssessmentScoreFormInterface }>()
);

export const createStudentClassSubjectAssessmentScoreSuccess = createAction(
  '[StudentClassSubjectAssessmentScore/API] Create Success',
  props<{ payload: GenericResponseInterface<StudentClassSubjectAssessmentScoreListInterface> }>()
);

export const createStudentClassSubjectAssessmentScoreFail = createAction(
  '[StudentClassSubjectAssessmentScore/API] Create Fail',
  props<{ error: string }>()
);

// Update
export const updateStudentClassSubjectAssessmentScore = createAction(
  '[StudentClassSubjectAssessmentScore] Update',
  props<{ payload: StudentClassSubjectAssessmentScoreFormInterface }>()
);

export const updateStudentClassSubjectAssessmentScoreSuccess = createAction(
  '[StudentClassSubjectAssessmentScore/API] Update Success',
  props<{ payload: GenericResponseInterface<StudentClassSubjectAssessmentScoreListInterface> }>()
);

export const updateStudentClassSubjectAssessmentScoreFail = createAction(
  '[StudentClassSubjectAssessmentScore/API] Update Fail',
  props<{ error: string }>()
);

// Delete
export const deleteStudentClassSubjectAssessmentScore = createAction(
  '[StudentClassSubjectAssessmentScore] Delete',
  props<{ id: string }>()
);

export const deleteStudentClassSubjectAssessmentScoreSuccess = createAction(
  '[StudentClassSubjectAssessmentScore/API] Delete Success',
  props<{ payload: GenericResponseInterface<boolean> }>()
);

export const deleteStudentClassSubjectAssessmentScoreFail = createAction(
  '[StudentClassSubjectAssessmentScore/API] Delete Fail',
  props<{ error: string }>()
);

// Create Many
export const createManyStudentClassSubjectAssessmentScores = createAction(
  '[StudentClassSubjectAssessmentScore] Create Many',
  props<{ payload: StudentClassSubjectAssessmentScoreFormInterface[] }>()
);

export const createManyStudentClassSubjectAssessmentScoresSuccess = createAction(
  '[StudentClassSubjectAssessmentScore/API] Create Many Success',
  props<{ payload: GenericResponseInterface<StudentClassSubjectAssessmentScoreListInterface[]> }>()
);

export const createManyStudentClassSubjectAssessmentScoresFail = createAction(
  '[StudentClassSubjectAssessmentScore/API] Create Many Fail',
  props<{ error: string }>()
);

// Update Many
export const updateManyStudentClassSubjectAssessmentScores = createAction(
  '[StudentClassSubjectAssessmentScore] Update Many',
  props<{ payload: StudentClassSubjectAssessmentScoreFormInterface[] }>()
);

export const updateManyStudentClassSubjectAssessmentScoresSuccess = createAction(
  '[StudentClassSubjectAssessmentScore/API] Update Many Success',
  props<{ payload: GenericResponseInterface<StudentClassSubjectAssessmentScoreListInterface[]> }>()
);

export const updateManyStudentClassSubjectAssessmentScoresFail = createAction(
  '[StudentClassSubjectAssessmentScore/API] Update Many Fail',
  props<{ error: string }>()
);

// Delete Many
export const deleteManyStudentClassSubjectAssessmentScores = createAction(
  '[StudentClassSubjectAssessmentScore] Delete Many',
  props<{ ids: string[] }>()
);

export const deleteManyStudentClassSubjectAssessmentScoresSuccess = createAction(
  '[StudentClassSubjectAssessmentScore/API] Delete Many Success',
  props<{ payload: GenericResponseInterface<boolean> }>()
);

export const deleteManyStudentClassSubjectAssessmentScoresFail = createAction(
  '[StudentClassSubjectAssessmentScore/API] Delete Many Fail',
  props<{ error: string }>()
);
