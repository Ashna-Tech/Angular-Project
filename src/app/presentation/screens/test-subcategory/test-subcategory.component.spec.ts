import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSubcategoryComponent } from './test-subcategory.component';

describe('TestSubcategoryComponent', () => {
  let component: TestSubcategoryComponent;
  let fixture: ComponentFixture<TestSubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestSubcategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
