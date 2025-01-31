import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferPeriodComponent } from './offer-period.component';

describe('OfferPeriodComponent', () => {
  let component: OfferPeriodComponent;
  let fixture: ComponentFixture<OfferPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferPeriodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfferPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
