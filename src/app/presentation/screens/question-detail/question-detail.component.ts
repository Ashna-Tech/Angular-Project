import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CkeditorComponent } from '../../components/ckeditor/ckeditor.component';
import { FormsUtilsService } from '../../../services/formsUtils.service';
import { QuestDoubtQueryService } from '../../../services/question-doubtQuery.service';
import { AddQuestionService } from '../../../services/add-question.service';
import { SelectQuestionModel } from '../../../core/domain/Add-Test-Question/select-question.model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { combineLatest, map, Observable, of, startWith, Subject, switchMap } from 'rxjs';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { QuestDoubtQueryListModel } from '../../../core/domain/Question-Doubt-Query/questdoubt-query-list.model';

@Component({
  selector: 'app-question-detail',
  standalone: true,
  imports: [ReactiveFormsModule, CkeditorComponent, CommonModule, SafeHtmlPipe],
  templateUrl: './question-detail.component.html',
  styleUrl: './question-detail.component.scss'
})

export class QuestionDetailComponent implements OnInit {

  isUpdateMode: boolean = false;
  QuestionDetailForm: FormGroup = new FormGroup({
    question: new FormControl('', []),
    answer: new FormControl('', []),
  });

  questionData$: Observable<SelectQuestionModel | null> | undefined;

  questionAnswerData$ : Observable <QuestDoubtQueryListModel[] | null > | undefined ;

  editQuestDoubtQueryId: string = "";

  QuestionId = signal<number>(0);

  reloadQueryList$ = new Subject<void> ();

  @ViewChild('question') questionCom: CkeditorComponent | undefined;

  @ViewChild('answer') answerCom: CkeditorComponent | undefined;

  constructor(private formUtilsService: FormsUtilsService,
    private route: ActivatedRoute,
    private addQuestionService: AddQuestionService,
    private questionDoubtQueryService: QuestDoubtQueryService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.questionAnswerData$ = combineLatest([this.route.queryParams, this.reloadQueryList$.pipe(startWith(''))]).pipe(
      map(([params, _]) => params['QuestionId']),
      switchMap((QuestionId) => {
        if (QuestionId) {
          // Call API with QuestionId
          return this.questionDoubtQueryService.GetQuesDoubtQueryList(QuestionId.toString());
        }
        // Return an empty observable if QuestionId is not found
        return of(null);
      })
    );


    this.questionData$ = this.route.queryParams.pipe(
      map(params => params['QuestionId']),
      switchMap((QuestionId) => {
        if (QuestionId) {
          this.QuestionId.set(QuestionId);
          return this.addQuestionService.selectQuestion('', QuestionId);
        }

        return of(null);
      })
    );
  }

  get QuestionDetailID() {
    return this.QuestionDetailForm.get('questionDetailId');
  }

  get Question() {
    return this.QuestionDetailForm.get('question');
  }

  get Answer() {
    return this.QuestionDetailForm.get('answer');
  }

  setDataToFormFromCkeditor() {
    const ckInputs = [
      { comp: this.questionCom, FormControlName: 'question' },
      { comp: this.answerCom, FormControlName: 'answer' }
    ];

    this.formUtilsService.setDataFormCkEditorToForm(ckInputs, this.QuestionDetailForm);
  }


  createQuestDoubtQuery() {
    this.setDataToFormFromCkeditor();
    if (this.formUtilsService.checkValidationErrors(this.QuestionDetailForm)) {
      return
    }
    const questionDetailId = this.QuestionId();
    const question = this.Question?.value;
    const answer = this.Answer?.value;

    this.questionDoubtQueryService.CreateQuesDoubtQuery(questionDetailId, question, answer).subscribe({
      next: (response => {
        this.reloadQueryList$.next();
        this.toastrService.success('Create Question Doubt Query Complete Successfully !', 'Question Doubt Query Created');
        this.clearForm();
      }),
      error: ((error) => {
        this.toastrService.error(error.message);
      })
    })
  }

  updatQuestDoubtQuery(UpdateQuesDoubtQueryID: string) {
    this.setDataToFormFromCkeditor();
    const id = UpdateQuesDoubtQueryID;
    const question = this.Question?.value;
    const answer = this.Answer?.value;

    this.questionDoubtQueryService.UpdateQuesDoubtQuery(id, question, answer).subscribe({
      next: (response => {
        this.reloadQueryList$.next();
        this.toastrService.success('Question Doubt Query Update Successfully !', "Question Doubt Query Updated");
        this.clearForm();
      }),
      error: ((error) => {
        this.toastrService.error(error.message);
      })
    })
  }

  editQuestDoubtQuery(id:string) {
    this.questionDoubtQueryService.GetQuesDoubtQuery(id).subscribe({
      next: (response => {
        this.editQuestDoubtQueryId = id;
        this.isUpdateMode = true;

        this.QuestionDetailForm.patchValue({
          id: response.id,
          question: response.question,
          answer: response.answer
        });
      }),
      error: ((error) => {
        this.toastrService.error(error.message);
      })
    })
  }

  deleteQuestDoubtQuery(id:string) {
    this.questionDoubtQueryService.DeleteQuesDoubtQuery(id).subscribe({
      next: (response => {
        this.reloadQueryList$.next();
        this.toastrService.success('Question Doubt Query Delete Successfully', 'Delete Question Doubt Query');
      }),
      error: ((error) => {
        this.toastrService.error(error.message);
      })
    })

  }

  clearForm(){
    this.isUpdateMode = false ;
    this.editQuestDoubtQueryId = "" ;
    this.QuestionDetailForm.reset();
  }
}
