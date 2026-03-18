import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ErrorPopupComponent } from './error-popup.component';

describe('ErrorPopupComponent', () => {
  let component: ErrorPopupComponent;
  let fixture: ComponentFixture<ErrorPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ErrorPopupComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { errorData: null } },
        { provide: MatDialogRef, useValue: { close: () => {} } }
      ]
    });
    fixture = TestBed.createComponent(ErrorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
