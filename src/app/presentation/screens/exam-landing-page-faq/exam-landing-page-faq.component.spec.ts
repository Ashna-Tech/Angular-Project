import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamLandingPageFaqComponent } from './exam-landing-page-faq.component';

describe('ExamLandingPageFaqComponent', () => {
  let component: ExamLandingPageFaqComponent;
  let fixture: ComponentFixture<ExamLandingPageFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamLandingPageFaqComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamLandingPageFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
