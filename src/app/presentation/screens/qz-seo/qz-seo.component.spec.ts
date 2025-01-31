import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QzSeoComponent } from './qz-seo.component';

describe('QzSeoComponent', () => {
  let component: QzSeoComponent;
  let fixture: ComponentFixture<QzSeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QzSeoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QzSeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
