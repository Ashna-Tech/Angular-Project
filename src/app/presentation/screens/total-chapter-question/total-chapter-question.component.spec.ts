import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalChapterQuestionComponent } from './total-chapter-question.component';

describe('TotalChapterQuestionComponent', () => {
  let component: TotalChapterQuestionComponent;
  let fixture: ComponentFixture<TotalChapterQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalChapterQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalChapterQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
