import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanHighlightDetailComponent } from './plan-highlight-detail.component';

describe('PlanHighlightDetailComponent', () => {
  let component: PlanHighlightDetailComponent;
  let fixture: ComponentFixture<PlanHighlightDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanHighlightDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanHighlightDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
