import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanWiseFaqComponent } from './plan-wise-faq.component';

describe('PlanWiseFaqComponent', () => {
  let component: PlanWiseFaqComponent;
  let fixture: ComponentFixture<PlanWiseFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanWiseFaqComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanWiseFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
