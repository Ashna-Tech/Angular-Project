import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestQuestionComponent } from './add-test-question.component';

describe('AddTestQuestionComponent', () => {
  let component: AddTestQuestionComponent;
  let fixture: ComponentFixture<AddTestQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTestQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTestQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
