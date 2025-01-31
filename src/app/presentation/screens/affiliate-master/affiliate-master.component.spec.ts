import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateMasterComponent } from './affiliate-master.component';

describe('AffiliateMasterComponent', () => {
  let component: AffiliateMasterComponent;
  let fixture: ComponentFixture<AffiliateMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffiliateMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffiliateMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
