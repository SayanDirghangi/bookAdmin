import { Action, ActionReducerMap } from '@ngrx/store';

import { ICodeMaster } from '../models/code-master/code-master.model';
import { AppState, initialState } from './app-state.store';

function codeMasterReducer(
  state: ICodeMaster[] = initialState.codeMaster,
  _action: Action
): ICodeMaster[] {
  return state;
}

function lovReducer(
  state: string[] = initialState.lov,
  _action: Action
): string[] {
  return state;
}

export const reducers: ActionReducerMap<AppState> = {
  codeMaster: codeMasterReducer,
  lov: lovReducer
};
