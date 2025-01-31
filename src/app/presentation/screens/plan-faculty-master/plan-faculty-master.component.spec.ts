import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanFacultyMasterComponent } from './plan-faculty-master.component';

describe('PlanFacultyMasterComponent', () => {
  let component: PlanFacultyMasterComponent;
  let fixture: ComponentFixture<PlanFacultyMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanFacultyMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanFacultyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
