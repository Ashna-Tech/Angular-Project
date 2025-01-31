import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeFeedComponent } from './youtube-feed.component';

describe('YoutubeFeedComponent', () => {
  let component: YoutubeFeedComponent;
  let fixture: ComponentFixture<YoutubeFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YoutubeFeedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YoutubeFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
