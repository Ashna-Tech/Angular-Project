import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPaperFilesComponent } from './test-paper-files.component';

describe('TestPaperFilesComponent', () => {
  let component: TestPaperFilesComponent;
  let fixture: ComponentFixture<TestPaperFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPaperFilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestPaperFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
