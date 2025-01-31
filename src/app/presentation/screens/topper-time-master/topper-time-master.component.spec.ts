import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopperTimeMasterComponent } from './topper-time-master.component';

describe('TopperTimeMasterComponent', () => {
  let component: TopperTimeMasterComponent;
  let fixture: ComponentFixture<TopperTimeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopperTimeMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopperTimeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
