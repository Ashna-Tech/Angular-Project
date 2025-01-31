import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawExFaqComponent } from './law-ex-faq.component';

describe('LawExFaqComponent', () => {
  let component: LawExFaqComponent;
  let fixture: ComponentFixture<LawExFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LawExFaqComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LawExFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
