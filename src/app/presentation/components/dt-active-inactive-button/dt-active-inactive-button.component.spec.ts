import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtActiveInactiveButtonComponent } from './dt-active-inactive-button.component';

describe('DtActiveInactiveButtonComponent', () => {
  let component: DtActiveInactiveButtonComponent;
  let fixture: ComponentFixture<DtActiveInactiveButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtActiveInactiveButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DtActiveInactiveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
