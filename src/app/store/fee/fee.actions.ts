import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  QueryInterface,
} from '../../types';
import {
  FeeListInterface,
  GenerateFeesByTermSessionRequest,
  GenerateFeesBySessionAndTermRequest,
  GenerateFeesByTermSessionForStudentRequest,
  GenerateFeesBySessionAndTermForStudentRequest,
} from '../../types/fee';

// Get All (non-paginated)
export const getFeeAll = createAction('[Fee] Get All', props<{ query?: QueryInterface }>());
export const getFeeAllSuccess = createAction('[Fee/API] Get All Success', props<{ payload: GenericResponseInterface<FeeListInterface[]> }>());
export const getFeeAllFail = createAction('[Fee/API] Get All Fail', props<{ error: string }>());

// Get All Paginated
export const getFeeList = createAction('[Fee] Get List', props<{ pageQuery: PageQueryInterface }>());
export const getFeeListSuccess = createAction('[Fee/API] Get List Success', props<{ payload: GenericResponseInterface<PaginatedResponseInterface<FeeListInterface[]>> }>());
export const getFeeListFail = createAction('[Fee/API] Get List Fail', props<{ error: string }>());

// Get By Properties (used for student fees)
export const getFeeByProperties = createAction('[Fee] Get By Properties', props<{ query: QueryInterface }>());
export const getFeeByPropertiesSuccess = createAction('[Fee/API] Get By Properties Success', props<{ payload: GenericResponseInterface<FeeListInterface[]> }>());
export const getFeeByPropertiesFail = createAction('[Fee/API] Get By Properties Fail', props<{ error: string }>());

// Generate Fees by Term Session (admin - all students in class)
export const generateFeesByTermSession = createAction('[Fee] Generate By Term Session', props<{ payload: GenerateFeesByTermSessionRequest }>());
export const generateFeesByTermSessionSuccess = createAction('[Fee/API] Generate By Term Session Success');
export const generateFeesByTermSessionFail = createAction('[Fee/API] Generate By Term Session Fail', props<{ error: string }>());

// Generate Fees by Session and Term (admin - all students in class)
export const generateFeesBySessionAndTerm = createAction('[Fee] Generate By Session And Term', props<{ payload: GenerateFeesBySessionAndTermRequest }>());
export const generateFeesBySessionAndTermSuccess = createAction('[Fee/API] Generate By Session And Term Success');
export const generateFeesBySessionAndTermFail = createAction('[Fee/API] Generate By Session And Term Fail', props<{ error: string }>());

// Generate Fees by Term Session For Student
export const generateFeesByTermSessionForStudent = createAction('[Fee] Generate By Term Session For Student', props<{ payload: GenerateFeesByTermSessionForStudentRequest }>());
export const generateFeesByTermSessionForStudentSuccess = createAction('[Fee/API] Generate By Term Session For Student Success');
export const generateFeesByTermSessionForStudentFail = createAction('[Fee/API] Generate By Term Session For Student Fail', props<{ error: string }>());

// Generate Fees by Session And Term For Student
export const generateFeesBySessionAndTermForStudent = createAction('[Fee] Generate By Session And Term For Student', props<{ payload: GenerateFeesBySessionAndTermForStudentRequest }>());
export const generateFeesBySessionAndTermForStudentSuccess = createAction('[Fee/API] Generate By Session And Term For Student Success');
export const generateFeesBySessionAndTermForStudentFail = createAction('[Fee/API] Generate By Session And Term For Student Fail', props<{ error: string }>());
