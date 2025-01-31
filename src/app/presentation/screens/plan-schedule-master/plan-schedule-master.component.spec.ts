import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanScheduleMasterComponent } from './plan-schedule-master.component';

describe('PlanScheduleMasterComponent', () => {
  let component: PlanScheduleMasterComponent;
  let fixture: ComponentFixture<PlanScheduleMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanScheduleMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanScheduleMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
