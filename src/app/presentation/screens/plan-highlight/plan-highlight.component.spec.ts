import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanHighlightComponent } from './plan-highlight.component';

describe('PlanHighlightComponent', () => {
  let component: PlanHighlightComponent;
  let fixture: ComponentFixture<PlanHighlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanHighlightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
