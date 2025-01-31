import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectExamDailogComponent } from './select-exam-dailog.component';

describe('SelectExamDailogComponent', () => {
  let component: SelectExamDailogComponent;
  let fixture: ComponentFixture<SelectExamDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectExamDailogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectExamDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
