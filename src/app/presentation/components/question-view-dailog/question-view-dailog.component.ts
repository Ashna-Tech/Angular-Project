import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AddQuestionService } from '../../../services/add-question.service';
import { Observable } from 'rxjs';
import { SelectQuestionModel } from '../../../core/domain/Add-Test-Question/select-question.model';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { AsyncPipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';


@Component({
  selector: 'app-question-view-dailog',
  standalone: true,
  imports: [MatIconModule, SafeHtmlPipe, AsyncPipe, MatDialogClose],
  templateUrl: './question-view-dailog.component.html',
  styleUrl: './question-view-dailog.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class QuestionViewDailogComponent implements OnInit {
  readonly questionService = inject(AddQuestionService);

  question$: Observable<SelectQuestionModel> | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {questionId: string, oldId:number}) { }

  ngOnInit(): void {
    this.question$ = this.questionService.selectQuestion(this.data.questionId, this.data.oldId);
  }
}
