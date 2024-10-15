import { createAction, props } from '@ngrx/store';

export const globalLoadingShow = createAction(
  '[GlobalLoading] Global Loading Show',
  props<{ message?: string; actionType: string }>()
);

export const globalLoadingHide = createAction(
  '[GlobalLoading] Global Loading Hide'
);
