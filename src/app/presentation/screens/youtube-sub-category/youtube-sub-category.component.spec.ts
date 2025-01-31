import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeSubCategoryComponent } from './youtube-sub-category.component';

describe('YoutubeSubCategoryComponent', () => {
  let component: YoutubeSubCategoryComponent;
  let fixture: ComponentFixture<YoutubeSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YoutubeSubCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YoutubeSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
