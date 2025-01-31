import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogLeftImageComponent } from './blog-left-image.component';

describe('BlogLeftImageComponent', () => {
  let component: BlogLeftImageComponent;
  let fixture: ComponentFixture<BlogLeftImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogLeftImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogLeftImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
