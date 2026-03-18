import { createSelector } from '@ngrx/store';
import { AppState } from './app-state.store';

export const selectState = (state: AppState) => state;

export const selectCodeMaster = createSelector(
  selectState,
  (state) => state.codeMaster
);