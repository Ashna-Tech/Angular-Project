import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { NgClass } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
import {FloatLabelType} from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-chat-support-screen',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, ProfileCardComponent, ChatWindowComponent, NgClass, MatRadioModule, ReactiveFormsModule],
  templateUrl: './chat-support-screen.component.html',
  styleUrl: './chat-support-screen.component.scss'
})
export class ChatSupportScreenComponent {
  openedPageIndex = signal<number> (0);
  isFilterOpended = signal<boolean> (false);
  readonly floatLabelControl = new FormControl('auto' as FloatLabelType);
}
