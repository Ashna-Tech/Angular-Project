import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoScheduleComponent } from './video-schedule.component';

describe('VideoScheduleComponent', () => {
  let component: VideoScheduleComponent;
  let fixture: ComponentFixture<VideoScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
