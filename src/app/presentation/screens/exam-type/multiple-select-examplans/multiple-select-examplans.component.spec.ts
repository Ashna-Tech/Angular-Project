import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleSelectExamplansComponent } from './multiple-select-examplans.component';

describe('MultipleSelectExamplansComponent', () => {
  let component: MultipleSelectExamplansComponent;
  let fixture: ComponentFixture<MultipleSelectExamplansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleSelectExamplansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultipleSelectExamplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
