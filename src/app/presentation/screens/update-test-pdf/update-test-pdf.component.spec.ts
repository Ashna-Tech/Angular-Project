import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTestPdfComponent } from './update-test-pdf.component';

describe('UpdateTestPdfComponent', () => {
  let component: UpdateTestPdfComponent;
  let fixture: ComponentFixture<UpdateTestPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTestPdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateTestPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
