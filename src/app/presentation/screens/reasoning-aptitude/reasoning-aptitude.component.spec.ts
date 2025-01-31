import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasoningAptitudeComponent } from './reasoning-aptitude.component';

describe('ReasoningAptitudeComponent', () => {
  let component: ReasoningAptitudeComponent;
  let fixture: ComponentFixture<ReasoningAptitudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReasoningAptitudeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReasoningAptitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
