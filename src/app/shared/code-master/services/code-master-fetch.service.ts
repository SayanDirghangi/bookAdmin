import { Injectable } from '@angular/core';
import {
  ICodeMaster,
  ICodeMasterVal
} from '../../../models/code-master/code-master.model';
import { Observable, map, shareReplay } from 'rxjs';
import { CodeMasterService } from './code-master.service';

@Injectable({
  providedIn: 'root'
})
export class CodeMasterFetchService {

  // service for fetching the code-master –
  // inject the class in the component constructor and call the service in the SELECT

  private readonly codeMaster$ = this.codeMasterService
    .getCodes(['TASK_STATUS', 'TASK_PRIORITY'])
    .pipe(shareReplay(1));

  constructor(private codeMasterService: CodeMasterService) {}

  getCodeOptions(reqCode: string): Observable<ICodeMasterVal[]> {
    return this.codeMaster$.pipe(
      map(
        (codes: ICodeMaster[]) =>
          codes.find((code) => code.key === reqCode)?.values ?? []
      )
    );
  }
}
