import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionBulkUploadComponent } from './question-bulk-upload.component';

describe('QuestionBulkUploadComponent', () => {
  let component: QuestionBulkUploadComponent;
  let fixture: ComponentFixture<QuestionBulkUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionBulkUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionBulkUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
