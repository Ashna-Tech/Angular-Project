import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTestLanguageComponent } from './update-test-language.component';

describe('UpdateTestLanguageComponent', () => {
  let component: UpdateTestLanguageComponent;
  let fixture: ComponentFixture<UpdateTestLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTestLanguageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateTestLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
