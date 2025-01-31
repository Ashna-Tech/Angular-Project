import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamFaqComponent } from './exam-faq.component';

describe('ExamFaqComponent', () => {
  let component: ExamFaqComponent;
  let fixture: ComponentFixture<ExamFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamFaqComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
