import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-chat-image-wrapper',
  standalone: true,
  imports: [NgClass],
  templateUrl: './chat-image-wrapper.component.html',
  styleUrl: './chat-image-wrapper.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ChatImageWrapperComponent {
  imageSrc = input<string> ('');
  isOpendInFullScreen = signal<boolean> (false);
}
