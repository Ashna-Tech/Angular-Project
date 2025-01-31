import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarQuestionComponent } from './similar-question.component';

describe('SimilarQuestionComponent', () => {
  let component: SimilarQuestionComponent;
  let fixture: ComponentFixture<SimilarQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimilarQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimilarQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
