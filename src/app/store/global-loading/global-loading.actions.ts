import { createAction, props } from '@ngrx/store';

export const globalLoadingShow = createAction(
  '[GlobalLoading] Global Loading Show',
  props<{ message?: string; actionType: string }>()
);

export const globalLoadingHide = createAction(
  '[GlobalLoading] Global Loading Hide'
);

export const globalErrorShow = createAction(
  '[GlobalError] Global Error',
  props<{ message: string; messageDuration: number }>()
);
