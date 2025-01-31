import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProfileCardComponent {
  isOpened = input<boolean> (false);
}
