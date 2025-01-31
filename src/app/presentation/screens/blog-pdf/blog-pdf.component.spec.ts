import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPdfComponent } from './blog-pdf.component';

describe('BlogPdfComponent', () => {
  let component: BlogPdfComponent;
  let fixture: ComponentFixture<BlogPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
