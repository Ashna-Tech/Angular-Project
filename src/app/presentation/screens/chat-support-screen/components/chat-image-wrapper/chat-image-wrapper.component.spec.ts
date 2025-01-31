import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatImageWrapperComponent } from './chat-image-wrapper.component';

describe('ChatImageWrapperComponent', () => {
  let component: ChatImageWrapperComponent;
  let fixture: ComponentFixture<ChatImageWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatImageWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatImageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
