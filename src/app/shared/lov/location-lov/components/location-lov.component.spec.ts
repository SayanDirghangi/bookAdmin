import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LocationLovComponent } from './location-lov.component';

describe('LocationLovComponent', () => {
  let component: LocationLovComponent;
  let fixture: ComponentFixture<LocationLovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationLovComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationLovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
