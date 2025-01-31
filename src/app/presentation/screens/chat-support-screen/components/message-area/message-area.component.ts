import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { ChatImageWrapperComponent } from '../chat-image-wrapper/chat-image-wrapper.component';
import { ChatMsgWrapperComponent } from '../chat-msg-wrapper/chat-msg-wrapper.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-message-area',
  standalone: true,
  imports: [ChatImageWrapperComponent, ChatMsgWrapperComponent, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './message-area.component.html',
  styleUrl: './message-area.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MessageAreaComponent {

  readonly dailog = inject(MatDialog);

  @Output() onEditMessage = new EventEmitter<string> ();

  editMessage(message:string){
    console.log("Edit");
    this.onEditMessage.emit(message);
  }
}
