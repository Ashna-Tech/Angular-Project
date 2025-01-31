import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamGroupMasterSeoDataComponent } from './exam-group-master-seo-data.component';

describe('ExamGroupMasterSeoDataComponent', () => {
  let component: ExamGroupMasterSeoDataComponent;
  let fixture: ComponentFixture<ExamGroupMasterSeoDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamGroupMasterSeoDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamGroupMasterSeoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
