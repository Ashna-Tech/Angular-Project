import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamTestCategoryComponent } from './exam-test-category.component';

describe('ExamTestCategoryComponent', () => {
  let component: ExamTestCategoryComponent;
  let fixture: ComponentFixture<ExamTestCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamTestCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamTestCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
