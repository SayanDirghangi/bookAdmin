import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAdminWizardComponent } from './book-admin-wizard.component';

describe('BookAdminWizardComponent', () => {
  let component: BookAdminWizardComponent;
  let fixture: ComponentFixture<BookAdminWizardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookAdminWizardComponent]
    });
    fixture = TestBed.createComponent(BookAdminWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
