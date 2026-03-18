import { Injectable } from '@angular/core';
import { AuthorisedPopComponent } from '../popup/authorised-popup/authorised-pop.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class CookieShareService {

  constructor(private dialog: MatDialog) { }

  getDetails():any{
    let userDetails = localStorage.getItem('userDetails');
    if(!userDetails) {
      this.dialog.open(AuthorisedPopComponent, {
        width: '500px',
        height: '170px',
        data: {
          msg: 'You are not authorised to access this page. Please login first.'
        }
      }); 
    }
    return userDetails;
  }
}
