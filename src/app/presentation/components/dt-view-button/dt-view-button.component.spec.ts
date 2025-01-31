import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtViewButtonComponent } from './dt-view-button.component';

describe('DtViewButtonComponent', () => {
  let component: DtViewButtonComponent;
  let fixture: ComponentFixture<DtViewButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtViewButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DtViewButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
