import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeCategoryComponent } from './youtube-category.component';

describe('YoutubeCategoryComponent', () => {
  let component: YoutubeCategoryComponent;
  let fixture: ComponentFixture<YoutubeCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YoutubeCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YoutubeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
