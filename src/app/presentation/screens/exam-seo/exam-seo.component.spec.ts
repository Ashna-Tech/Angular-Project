import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamSeoComponent } from './exam-seo.component';

describe('ExamSeoComponent', () => {
  let component: ExamSeoComponent;
  let fixture: ComponentFixture<ExamSeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamSeoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamSeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
