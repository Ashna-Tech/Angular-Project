import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludedPlanComponent } from './included-plan.component';

describe('IncludedPlanComponent', () => {
  let component: IncludedPlanComponent;
  let fixture: ComponentFixture<IncludedPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncludedPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncludedPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
