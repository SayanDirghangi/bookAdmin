/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICodeMaster } from '../../../models/code-master/code-master.model';
import { environment } from './../../../../enviroments/enviorment.dev';

// const baseURL = 'http://localhost:5151/api/v1/codevalues';

@Injectable({
  providedIn: 'root'
})
export class CodeMasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }),
    params: {}
  };

  constructor(private http: HttpClient) {}

  getCodes(newcodes: string[]): Observable<ICodeMaster[]> {

    // const masterCodes = codeMasterData; // Todo - API call to get all the codes for the screen
    // let codesList: ICodeMaster[] = [];

    // newcodes.forEach((element: string) => {
    //   masterCodes.forEach((item) => {
    //     if (item.key === element) {
    //       codesList.push(item);
    //     }
    //   });
    // });

    // console.log(codesList);
    // return of(codesList).pipe();

    let params = new HttpParams();
    params = params.append('keys', newcodes.join(','));

    this.httpOptions.params = params;

    const masterCodes$ = this.http.get(
      'assets/json/code-master-data.json'
    ) as Observable<ICodeMaster[]>;
    // const masterCodes$ = this.http.get(
    //   environment.baseUrl,
    //   this.httpOptions
    // ) as Observable<any>;

    return masterCodes$;
  }
}
