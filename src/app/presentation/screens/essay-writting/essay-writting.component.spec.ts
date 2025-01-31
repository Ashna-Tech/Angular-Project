import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssayWrittingComponent } from './essay-writting.component';

describe('EssayWrittingComponent', () => {
  let component: EssayWrittingComponent;
  let fixture: ComponentFixture<EssayWrittingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EssayWrittingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EssayWrittingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
