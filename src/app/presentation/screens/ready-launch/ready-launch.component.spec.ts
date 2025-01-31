import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyLaunchComponent } from './ready-launch.component';

describe('ReadyLaunchComponent', () => {
  let component: ReadyLaunchComponent;
  let fixture: ComponentFixture<ReadyLaunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadyLaunchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadyLaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
