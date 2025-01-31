import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SafeHtmlPipe } from '../../../../../pipes/safe-html.pipe';
import { CkeditorComponent } from '../../../../components/ckeditor/ckeditor.component';
import { QuestionLevel } from '../../../../../core/enums/question-level.enum';
import { RightOption } from '../../../../../core/enums/RightOption.enum';

interface LTChapterModel{
  id:string;
  name:string;
  subjectId:string;
  isActive:boolean;
  isLiveDrillChapter:boolean;
}

interface VocabDropdownListItemModel{
  id: string,
  name: string; 
}

@Component({
  selector: 'app-preview-question',
  standalone: true,
  imports: [SafeHtmlPipe, NgClass, FormsModule, ReactiveFormsModule, CkeditorComponent],
  templateUrl: './preview-question.component.html',
  styleUrl: './preview-question.component.scss'
})

export class PreviewQuestionComponent{
  @Input() FullQuestion : {
    name:string,
    summary:string,
    chapter:string,
    questions:[
      {  
        questionLevel: string;
        questionExplanation: string;
        question: string;
        optionA: string;
        optionB: string;
        optionC: string;
        optionD: string;
        optionE: string;
      } 
    ]
  } | undefined;

  isSummaryEditMode:boolean = false;
  // summary:string = '';
  direction:string = '';
  chapter:string = '';

  isQuestionEditMode:boolean = false;
  editQuestionIndex:number = -1;

  QuestionLevels = QuestionLevel;
  rightOptions = RightOption;

  @Input() chapterList:VocabDropdownListItemModel[]|undefined;

  @Input() ltChapterList:LTChapterModel[] = [];

  @Input() questionIndex:number = 0;

  @Output() editQuestionEmt = new EventEmitter<{ subquestionIndex:number, question:any }> ();

  @Output() editSummaryEmt = new EventEmitter<{ name:string, summary:string, chapId:string }> ();

  @Output() deleteSubQuestionEmt = new EventEmitter<number> ();

  @Output() deleteMQuestionEmt = new EventEmitter<void> ();

  summaryForm:FormGroup = new FormGroup({
    name: new FormControl(''),
    summary: new FormControl(''),
    chapter: new FormControl(''),
  })

  updateQuestionForm = new FormGroup({
    questionLevel: new FormControl('', [Validators.required]),
    questionExplanation: new FormControl('', []),
    question: new FormControl('', []),
    optionA: new FormControl('', []),
    optionB: new FormControl('', []),
    optionC: new FormControl('', []),
    optionD: new FormControl('', []),
    optionE: new FormControl('', []),
  });

  @ViewChild('summary') summary : CkeditorComponent | undefined;
  @ViewChild('Explanation') questionExplanation : CkeditorComponent | undefined;
  @ViewChild('question') question : CkeditorComponent | undefined;
  @ViewChild('optionA') optionA : CkeditorComponent | undefined;
  @ViewChild('optionB') optionB : CkeditorComponent | undefined;
  @ViewChild('optionC') optionC : CkeditorComponent | undefined;
  @ViewChild('optionD') optionD : CkeditorComponent | undefined;
  @ViewChild('optionE') optionE : CkeditorComponent | undefined;


  constructor(){}

  onEditSummary(){
    if(this.FullQuestion && !this.isSummaryEditMode){
      this.summaryForm.patchValue({
        name: this.FullQuestion.name,
        summary: this.FullQuestion.summary,
        chapter: this.FullQuestion.chapter
      });
      this.isSummaryEditMode = true;
    }else{
      this.isSummaryEditMode = false
    }
  }

  onQuestionEdit(questionIndex:number){
    this.editQuestionIndex = questionIndex;
    this.isQuestionEditMode = true;

    const question = this.FullQuestion?.questions.at(questionIndex);

    if(question){
      this.updateQuestionForm.patchValue({
        questionLevel: question.questionLevel,
        questionExplanation: question.questionExplanation,
        question: question.question,
        optionA: question.optionA,
        optionB: question.optionB,
        optionC: question.optionC,
        optionD: question.optionD,
        optionE: question.optionE,
        // rightAns: question.rightAns
      })
    }
  }

  getChapterName(){
    return this.ltChapterList.find(chapter => chapter.id === this.FullQuestion?.chapter)?.name;
  }

  updateSummary(){
    const name = this.summaryForm.get('name')?.value;
    const chapter = this.summaryForm.get('chapter')?.value;
    const summary = this.summary?.getData();
    this.editSummaryEmt.emit({name:name, summary:summary, chapId:chapter});
    this.isSummaryEditMode = false;
  }

  updateQuestion(questionIndex:number){
    const questionLevel = this.updateQuestionForm.get('questionLevel')?.value;
    const questionExplanation = this.questionExplanation?.getData();
    const question = this.question?.getData();
    const optionA = this.optionA?.getData();
    const optionB = this.optionB?.getData();
    const optionC = this.optionC?.getData();
    const optionD = this.optionD?.getData();
    const optionE = this.optionE?.getData();

    const questionModel = {
      questionLevel, questionExplanation, question, optionA, optionB, optionC, optionD, optionE, 
    };

    this.editQuestionEmt.emit({ subquestionIndex: questionIndex, question: questionModel})
    this.isQuestionEditMode = false;
  }

  removeMainQuestion(){
    this.deleteMQuestionEmt.emit();
  }

  removeSubQuestion(sIndex:number){
    console.log(sIndex);
    this.deleteSubQuestionEmt.emit(sIndex);
  }

  getChapterValue(chaptId:string){
    const chapter = this.chapterList?.find(chap => chap.id === chaptId);
    if(chapter){
      return chapter.name;
    }

    return 'Not Matched';
  }
}
