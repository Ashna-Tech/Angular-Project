import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogFAQComponent } from './blog-faq.component';

describe('BlogFAQComponent', () => {
  let component: BlogFAQComponent;
  let fixture: ComponentFixture<BlogFAQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogFAQComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogFAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
