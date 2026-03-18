import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { AuthorisedPopComponent } from './authorised-pop.component';

describe('AuthorisedPopComponent', () => {
  let component: AuthorisedPopComponent;
  let fixture: ComponentFixture<AuthorisedPopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthorisedPopComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { msg: 'You are not authorised to access this page. Please login first.' }
        }
      ]
    });
    fixture = TestBed.createComponent(AuthorisedPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
