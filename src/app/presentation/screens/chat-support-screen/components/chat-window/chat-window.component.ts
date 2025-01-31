import { ChangeDetectionStrategy, Component, EventEmitter, model, Output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MessageAreaComponent } from '../message-area/message-area.component';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import {afterNextRender, inject, Injector, ViewChild} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [MatButtonModule, MessageAreaComponent, MatFormFieldModule, MatSelectModule, MatInputModule, TextFieldModule],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent {
  @Output() onBack = new EventEmitter<void> ();
  private _injector = inject(Injector);

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  isEditMode = signal<boolean> (false);
  message = signal<string> ('');

  triggerResize() {
    // Wait for content to render, then trigger textarea resize.
    afterNextRender(
      () => {
        this.autosize.resizeToFitContent(true);
      },
      {
        injector: this._injector,
      },
    );
  }

  onEditMessage(message:string){
    this.isEditMode.set(true);
    this.message.set(message);
  }

  cancelEdit(){
    this.isEditMode.set(false);
    this.message.set('');
  }
}
