import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponAffiliateDetailComponent } from './coupon-affiliate-detail.component';

describe('CouponAffiliateDetailComponent', () => {
  let component: CouponAffiliateDetailComponent;
  let fixture: ComponentFixture<CouponAffiliateDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponAffiliateDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CouponAffiliateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
