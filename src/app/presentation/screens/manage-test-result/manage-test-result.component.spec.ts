import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTestResultComponent } from './manage-test-result.component';

describe('ManageTestResultComponent', () => {
  let component: ManageTestResultComponent;
  let fixture: ComponentFixture<ManageTestResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTestResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageTestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
