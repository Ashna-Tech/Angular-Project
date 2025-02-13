import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageKeywordComponent } from './manage-keyword.component';

describe('ManageKeywordComponent', () => {
  let component: ManageKeywordComponent;
  let fixture: ComponentFixture<ManageKeywordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageKeywordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageKeywordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
