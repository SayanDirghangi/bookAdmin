import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookadminService {

  constructor(private http: HttpClient) { }

  setTask(task: any) {
   
  //  return this.http.post(environment.setTask, task) as Observable<any>;
    return this.http.get('/assets/json/createTask.json') as Observable<any>;
  }


  getTaskDetails(){
    return this.http.get('/assets/json/taskDetails.json') as Observable<any>;
  }
}
