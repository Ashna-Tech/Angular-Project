import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageMasterComponent } from './landing-page-master.component';

describe('LandingPageMasterComponent', () => {
  let component: LandingPageMasterComponent;
  let fixture: ComponentFixture<LandingPageMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingPageMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
