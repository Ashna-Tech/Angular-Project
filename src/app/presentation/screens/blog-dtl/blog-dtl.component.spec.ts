import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDtlComponent } from './blog-dtl.component';

describe('BlogDtlComponent', () => {
  let component: BlogDtlComponent;
  let fixture: ComponentFixture<BlogDtlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogDtlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogDtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
