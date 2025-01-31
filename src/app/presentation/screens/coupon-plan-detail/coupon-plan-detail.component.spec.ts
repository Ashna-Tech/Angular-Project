import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponPlanDetailComponent } from './coupon-plan-detail.component';

describe('CouponPlanDetailComponent', () => {
  let component: CouponPlanDetailComponent;
  let fixture: ComponentFixture<CouponPlanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponPlanDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CouponPlanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
