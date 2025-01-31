import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawExMagazineComponent } from './law-ex-magazine.component';

describe('LawExMagazineComponent', () => {
  let component: LawExMagazineComponent;
  let fixture: ComponentFixture<LawExMagazineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LawExMagazineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LawExMagazineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
