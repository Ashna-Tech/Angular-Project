import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMessageDailogComponent } from './edit-message-dailog.component';

describe('EditMessageDailogComponent', () => {
  let component: EditMessageDailogComponent;
  let fixture: ComponentFixture<EditMessageDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMessageDailogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditMessageDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
