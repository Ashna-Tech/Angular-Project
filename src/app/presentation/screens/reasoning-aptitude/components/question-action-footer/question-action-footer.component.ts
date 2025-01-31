import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, input, OnInit, Output } from '@angular/core';
import { ViewAddedQuestionModel } from '../../../../../core/domain/Add-Test-Question/view-added-question.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AddQuestionService } from '../../../../../services/add-question.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-question-action-footer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './question-action-footer.component.html',
  styleUrl: './question-action-footer.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class QuestionActionFooterComponent implements OnInit {
  question = input<ViewAddedQuestionModel | null> ();
  testId = input<string> ();

  form: FormGroup = new FormGroup({
    marks: new FormControl(0),
    topperTime: new FormControl(0),
    order: new FormControl(0),
    status: new FormControl(''),
  });

  @Output() updateQuestionEmt = new EventEmitter<{marks:number, topperTime:number, order:number, status:string}>();

  readonly destroyRef = inject(DestroyRef);
  readonly addQuestionService = inject(AddQuestionService);
  

  ngOnInit() {
    const question = this.question();
    if(question){
      this.form.patchValue({
        marks: question.marks,
        topperTime: Math.floor(question.topperTime/1000),
        order: question.order,
        status: question.optStatus,
      });
    }

    const status = this.form.get('status');
    if(status){
      status.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
        console.log(value);
        this.updateQuestion();
      });
    }
  }


  updateQuestion(){ 
    const marks = this.form.get('marks')?.value;
    const topperTime = this.form.get('topperTime')?.value;
    const order = this.form.get('order')?.value;
    const status = this.form.get('status')?.value;

    this.updateQuestionEmt.emit({marks, topperTime, order, status});
  }
}
