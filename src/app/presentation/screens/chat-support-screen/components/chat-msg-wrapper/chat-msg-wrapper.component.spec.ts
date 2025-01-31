import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMsgWrapperComponent } from './chat-msg-wrapper.component';

describe('ChatMsgWrapperComponent', () => {
  let component: ChatMsgWrapperComponent;
  let fixture: ComponentFixture<ChatMsgWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatMsgWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatMsgWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
