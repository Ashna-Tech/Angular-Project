import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuetBlogComponent } from './cuet-blog.component';

describe('CuetBlogComponent', () => {
  let component: CuetBlogComponent;
  let fixture: ComponentFixture<CuetBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuetBlogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuetBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
