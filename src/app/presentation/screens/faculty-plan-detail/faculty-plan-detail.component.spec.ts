import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyPlanDetailComponent } from './faculty-plan-detail.component';

describe('FacultyPlanDetailComponent', () => {
  let component: FacultyPlanDetailComponent;
  let fixture: ComponentFixture<FacultyPlanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyPlanDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacultyPlanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
