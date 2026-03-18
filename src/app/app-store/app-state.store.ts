import {ICodeMaster} from '../models/code-master/code-master.model';

export interface AppState {
  codeMaster: ICodeMaster[],
  lov: string[]
}


export const initialState: AppState = {
  codeMaster: [],
  lov: []
};