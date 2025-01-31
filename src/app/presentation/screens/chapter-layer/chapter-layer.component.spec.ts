import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterLayerComponent } from './chapter-layer.component';

describe('ChapterLayerComponent', () => {
  let component: ChapterLayerComponent;
  let fixture: ComponentFixture<ChapterLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterLayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChapterLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
