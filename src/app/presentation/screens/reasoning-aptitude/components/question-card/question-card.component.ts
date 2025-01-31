import { AsyncPipe, NgClass } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SafeHtmlPipe } from '../../../../../pipes/safe-html.pipe';
import { RightOption } from '../../../../../core/enums/RightOption.enum';
import { ViewAddedQuestionModel } from '../../../../../core/domain/Add-Test-Question/view-added-question.model';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [MatIconModule, SafeHtmlPipe, AsyncPipe, NgClass],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.scss'
})
export class QuestionCardComponent {
  question = input<ViewAddedQuestionModel> ();
  // @Output() editQuestionEmt = new EventEmitter<void> ();
  // @Output() removeQuestionEmt = new EventEmitter<void> ();

  OptionType = RightOption;

}
