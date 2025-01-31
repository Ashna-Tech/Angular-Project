import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionViewDailogComponent } from './question-view-dailog.component';

describe('QuestionViewDailogComponent', () => {
  let component: QuestionViewDailogComponent;
  let fixture: ComponentFixture<QuestionViewDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionViewDailogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionViewDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
