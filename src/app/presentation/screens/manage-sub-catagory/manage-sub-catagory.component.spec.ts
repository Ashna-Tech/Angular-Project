import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubCatagoryComponent } from './manage-sub-catagory.component';

describe('ManageSubCatagoryComponent', () => {
  let component: ManageSubCatagoryComponent;
  let fixture: ComponentFixture<ManageSubCatagoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSubCatagoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageSubCatagoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
