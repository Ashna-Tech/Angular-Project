import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionActionFooterComponent } from './question-action-footer.component';

describe('QuestionActionFooterComponent', () => {
  let component: QuestionActionFooterComponent;
  let fixture: ComponentFixture<QuestionActionFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionActionFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionActionFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
