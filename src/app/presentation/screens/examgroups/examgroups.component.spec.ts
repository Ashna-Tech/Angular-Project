import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamgroupsComponent } from './examgroups.component';

describe('ExamgroupsComponent', () => {
  let component: ExamgroupsComponent;
  let fixture: ComponentFixture<ExamgroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamgroupsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
