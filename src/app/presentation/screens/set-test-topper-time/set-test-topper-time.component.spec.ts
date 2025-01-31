import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetTestTopperTimeComponent } from './set-test-topper-time.component';

describe('SetTestTopperTimeComponent', () => {
  let component: SetTestTopperTimeComponent;
  let fixture: ComponentFixture<SetTestTopperTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetTestTopperTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetTestTopperTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
