import { createAction, props } from '@ngrx/store';
import { StudentAssessmentScoreInterface, ResultMarkSheetFormInterface } from '../../types/result';
import { GenericResponseInterface } from '../../types';

// Get Result MarkSheet
export const getResultMarkSheet = createAction(
  '[Result] Get MarkSheet',
  props<{ 
    schoolTermSessionId: string;
    classId: string;
    subjectId: string;
  }>()
);

export const getResultMarkSheetSuccess = createAction(
  '[Result/API] Get MarkSheet Success',
  props<{ payload: GenericResponseInterface<StudentAssessmentScoreInterface[]> }>()
);

export const getResultMarkSheetFail = createAction(
  '[Result/API] Get MarkSheet Fail',
  props<{ error: string }>()
);

// Update Result MarkSheet
export const updateResultMarkSheet = createAction(
  '[Result] Update MarkSheet',
  props<{ payload: StudentAssessmentScoreInterface[] }>()
);

export const updateResultMarkSheetSuccess = createAction(
  '[Result/API] Update MarkSheet Success',
  props<{ payload: GenericResponseInterface<StudentAssessmentScoreInterface[]> }>()
);

export const updateResultMarkSheetFail = createAction(
  '[Result/API] Update MarkSheet Fail',
  props<{ error: string }>()
); 

// Generate Student Result
export const generateStudentResult = createAction(
  '[Result] Generate Student Result',
  props<{
    schoolTermSessionId: string;
    studentId: string;
    hideOverallPosition: boolean;
  }>()
);

export const generateStudentResultSuccess = createAction(
  '[Result/API] Generate Student Result Success',
  props<{ payload: Blob }>()
);

export const generateStudentResultFail = createAction(
  '[Result/API] Generate Student Result Fail',
  props<{ error: string }>()
);

export const clearGeneratedStudentResult = createAction(
  '[Result] Clear Generated Student Result'
);

// Generate Broad Sheet
export const generateBroadSheet = createAction(
  '[Result] Generate Broad Sheet',
  props<{
    schoolTermSessionId: string;
    classId: string;
  }>()
);

export const generateBroadSheetSuccess = createAction(
  '[Result/API] Generate Broad Sheet Success',
  props<{ payload: Blob }>()
);

export const generateBroadSheetFail = createAction(
  '[Result/API] Generate Broad Sheet Fail',
  props<{ error: string }>()
);

export const clearGeneratedBroadSheet = createAction(
  '[Result] Clear Generated Broad Sheet'
);

// Generate Class Result
export const generateClassResult = createAction(
  '[Result] Generate Class Result',
  props<{
    schoolTermSessionId: string;
    classId: string;
    hideOverallPosition: boolean;
  }>()
);

export const generateClassResultSuccess = createAction(
  '[Result/API] Generate Class Result Success',
  props<{ payload: Blob }>()
);

export const generateClassResultFail = createAction(
  '[Result/API] Generate Class Result Fail',
  props<{ error: string }>()
);

export const clearGeneratedClassResult = createAction(
  '[Result] Clear Generated Class Result'
);