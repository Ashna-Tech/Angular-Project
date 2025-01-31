import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPdfNewComponent } from './blog-pdf-new.component';

describe('BlogPdfNewComponent', () => {
  let component: BlogPdfNewComponent;
  let fixture: ComponentFixture<BlogPdfNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPdfNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogPdfNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
