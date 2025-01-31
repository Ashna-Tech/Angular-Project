import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamMasterCategoryComponent } from './exam-master-category.component';

describe('ExamMasterCategoryComponent', () => {
  let component: ExamMasterCategoryComponent;
  let fixture: ComponentFixture<ExamMasterCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamMasterCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamMasterCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
