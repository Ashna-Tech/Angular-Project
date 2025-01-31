import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopperTimeExamLevelMasterComponent } from './topper-time-exam-level-master.component';

describe('TopperTimeExamLevelMasterComponent', () => {
  let component: TopperTimeExamLevelMasterComponent;
  let fixture: ComponentFixture<TopperTimeExamLevelMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopperTimeExamLevelMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopperTimeExamLevelMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
