import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssayWrittingDetailComponent } from './essay-writting-detail.component';

describe('EssayWrittingDetailComponent', () => {
  let component: EssayWrittingDetailComponent;
  let fixture: ComponentFixture<EssayWrittingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EssayWrittingDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EssayWrittingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
