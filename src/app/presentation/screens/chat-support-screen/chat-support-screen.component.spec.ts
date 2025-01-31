import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSupportScreenComponent } from './chat-support-screen.component';

describe('ChatSupportScreenComponent', () => {
  let component: ChatSupportScreenComponent;
  let fixture: ComponentFixture<ChatSupportScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatSupportScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatSupportScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
