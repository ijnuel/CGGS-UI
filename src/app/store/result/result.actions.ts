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