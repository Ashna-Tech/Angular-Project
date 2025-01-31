import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component,  EventEmitter,  input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-chat-msg-wrapper',
  standalone: true,
  imports: [NgClass],
  templateUrl: './chat-msg-wrapper.component.html',
  styleUrl: './chat-msg-wrapper.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class ChatMsgWrapperComponent {
  message = input<string> ('');
  isRight = input<boolean> (false);

  @Output() onEdit = new EventEmitter<void> ();

}
