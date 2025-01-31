import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeoKeywordPageComponent } from './seo-keyword-page.component';

describe('SeoKeywordPageComponent', () => {
  let component: SeoKeywordPageComponent;
  let fixture: ComponentFixture<SeoKeywordPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeoKeywordPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeoKeywordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
