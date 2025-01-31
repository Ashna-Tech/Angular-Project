import { AsyncPipe, NgStyle } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { CkeditorComponent } from '../../components/ckeditor/ckeditor.component';
import { PreviewQuestionComponent } from './components/preview-question/preview-question.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Observable, Subscription, take } from 'rxjs';
import { QuestionLevel } from '../../../core/enums/question-level.enum';

interface grammerChapterItemModel{
  id:string;
  name:string;
  logoText:string;
  isActive:boolean;
  launchDate:string;
  oldId:string;
}

interface DropdownTestListItemModel{
  id: string;
  name: string;
}

interface ExamNameListItemModel{
  id:string;
  chapterName:string;
}

interface VocabDropdownListItemModel{
  id: string,
  name: string; 
}

interface LTSubjectModel{
  id: string;
  name:string;
  isActive: boolean;
}

interface LTChapterModel{
  id:string;
  name:string;
  subjectId:string;
  isActive:boolean;
  isLiveDrillChapter:boolean;
}

@Component({
  selector: 'app-question-bulk-upload',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SafeHtmlPipe, AsyncPipe, NgStyle, RouterLink, MatExpansionModule, PreviewQuestionComponent, CkeditorComponent, MatChipsModule],
  templateUrl: './question-bulk-upload.component.html',
  styleUrl: './question-bulk-upload.component.scss'
})

export class QuestionBulkUploadComponent {
  
  chapterDropDown$:Observable<grammerChapterItemModel[]> | undefined;
  selectedChapter = '';

  selectedTestId:string = '';
  testDropdownList$: Observable<DropdownTestListItemModel[]> | undefined;

  selectedExamId:string = '';
  examNameList$:Observable<ExamNameListItemModel[]>|undefined;
  examIdSubscription:Subscription|undefined;

  selectedVocab:string = '';
  vocabList$:Observable<VocabDropdownListItemModel[]>|undefined;

  quesSubjectId:string = '';
  
  // textContent:string = '';
  textContentForm:FormGroup = new FormGroup({
    'textContent':new FormControl('')
  })

  QuestionLevel = QuestionLevel;

  error:string = '';

  dataToPreview:any[] = [];

  isUploadingAlready:boolean = false; 

  subjectList$:Observable<LTSubjectModel[]> | undefined;
  ltChapterList:LTChapterModel[] = [];
  
  @ViewChild('textContent') Summary : CkeditorComponent | undefined;


  constructor(
    // private toasterService:ToasterService,
    // private questionService:QuestionService,
    // private store:Store<AppState>,
    // private grammerChapterService:GrammerChapterService,
    // private testService:TestService,
    // private vocabService:VocabularyService,
    // private ltChapterService:LTChapterService,
    // private ltSubjectService:LTSubjectService
  ){}

  ngOnInit(): void {
    // this.subjectList$ = this.ltSubjectService.getAll();
    // this.examIdSubscription = this.store.select(getExamGroup).subscribe(examGroup => {
    //   const examGr = examGroup.list[examGroup.currnetExamGroup]
      
    //   if(examGr){
    //     this.selectedExamId = examGr.examGroupId;
    //     this.chapterDropDown$ = this.grammerChapterService.getAll(examGr.examGroupId);
    //   }
    // });
  }

  onChapterSelect(){
    // this.testDropdownList$ = this.testService.getTestDropdownList(this.selectedExamId, false, this.selectedChapter);
  }
  
  onTestSelect(){
    // this.vocabList$ = this.vocabService.getDropdownList(this.selectedTestId);
  }

  clearForm(){
    if(confirm('do you really want to clear form?')){

    }
  }

  onPreview(){
    this.error = '';
    this.dataToPreview = [];

    try{
      // console.log(this.Summary?.getData());
      const questionsData:any[] = this.prepareDataToSubmit();
      
      const questionDataToSubmit = questionsData.map((question:any) => {
        const questions = question.Questions.map((question:any) => {
          return {
            "questionLevel": question.QuestionLevel,
            "questionExplanation": question.QuestionExplanation,
            "question": question.Question,
            "optionA": question.OptionA,
            "optionB": question.OptionB,
            "optionC": question.OptionC,
            "optionD": question.OptionD,
            "optionE": question.OptionE,
            "rightAns": question.RightAns
          }
        })

         return {
            name: question.Name,
            summary:question.Summary,
            questions:questions,
            chapter:question.QuestionChapter
         }
      });
      console.log(questionDataToSubmit);
      this.dataToPreview = questionDataToSubmit;
    }catch(error:any){
      console.log(error);
      this.error = error.message;
    }   
  }


  onSubmit(){
    if(this.isUploadingAlready) return;

    if(this.dataToPreview.length > 0 ){
      this.isUploadingAlready = true;

      const model = {
        examId:this.selectedExamId,
        chapterId:this.selectedChapter,
        drillId:this.selectedTestId,
        quesSubjectId: this.quesSubjectId,
        questionMasters:this.dataToPreview.map(mq => ({
          name:mq.name,
          summary:mq.summary,
          quesChapterId: mq.chapter,
          questions:mq.questions.map((q:any) => ({
          level: q.questionLevel,
          explaniation: q.questionExplanation, 
          ques: q.question,
          optA: q.optionA,
          optB: q.optionB,
          optC: q.optionC,
          optD: q.optionD,
          optE: q.optionE,
          }))
        }))
      }

      // this.questionService.CABulkUpload(model).pipe(take(1)).subscribe({
      //   next:(data => {
      //     this.toasterService.success('Question Uploaded Successfully!!');
      //     this.isUploadingAlready = true;
      //   }),
      //   error:(error => {
      //     this.toasterService.error('Question is not Uploaded, Error:'+ error.message);
      //     this.isUploadingAlready = false;
      //   })
      // })
    }
  }

  copyText(text:string){
    navigator.clipboard.writeText(text);
    // this.toasterService.success('Text copied');
  }

  
  onSubjectIdChange(){
    const subjectId = this.quesSubjectId;
    // this.ltChapterService.getAll(subjectId).pipe(take(1)).subscribe({
    //   next:(chapterList => {
    //     this.ltChapterList = chapterList;
    //   }),
    //   error:(error => {
    //     this.error = error.message;
    //   })
    // })
  }

  updateQuestion(questionIndex:number, subquestionIndex:number, question:any){
     console.log({questionIndex, subquestionIndex, question}); 

     this.dataToPreview = this.dataToPreview.map((mQuestion, mIndex) => {
        if(mIndex !== questionIndex) return mQuestion;

        const questions = mQuestion.questions.map((sQuestion:any, sIndex:number) => {
            if(sIndex !== subquestionIndex) return sQuestion;

            return question;
        });

        return { summary:mQuestion.summary, name: mQuestion.name , chapter:mQuestion.chapter, questions: questions};
     });

    //  this.toasterService.success('Question Updated!!');
  }

  updateSummary(questionIndex:number, name:string, summary:string, chapId:string){
    this.dataToPreview = this.dataToPreview.map((mQuestion, mIndex) => {
        if(mIndex !== questionIndex) return mQuestion;

        return {...mQuestion, summary: summary, chapter:chapId, name: name};
    })

    // this.toasterService.success('Summary Updated!!');
  }


  removeMQuestion(mIndex:number){
    this.dataToPreview = this.dataToPreview.filter((mQuestion, mQuestIndex) => mQuestIndex !== mIndex);
    // this.toasterService.success('Question removed!!');
  }

  removeSubQuestion(mIndex:number, sIndex:number){
    console.log({mIndex, sIndex});
    this.dataToPreview = this.dataToPreview.map((mQuestion, mQuestionIndex) => {
      if(mIndex !== mQuestionIndex) return mQuestion;

      const questions = mQuestion.questions.filter((sQuestion:any, sQuestionIndex:number) => sIndex !== sQuestionIndex); 
      return { summary:mQuestion.summary, chapter:mQuestion.chapId, questions: questions};
    });

    // this.toasterService.sucscess('Question removed!!');
  }

  // ===================== Bulk upload ========================== //
  prepareDataToSubmit(){
    const masterQuestion = "@MQ@";
    const masterQuestionSumarry = "@MQS@";
    const masterQuestionName = "@MQN@";
    const masterQuestionSumarryEnd = "@MQSE@";
    const quesChapterId = "@MQC@";
    const masterQuestionSumarryQuestions = "@QQ@";
    const QuestionLevel = "@QL@";
    const QuestionExplanation = "@QE@";
    const Question = "@QT@";
    const OptionA = "@OA@";
    const OptionB = "@OB@";
    const OptionC = "@OC@";
    const OptionD = "@OD@";
    const OptionE = "@OE@";
    const OptionRight = "@OR@";

    const removeSpaceCharacters = (text:string) => {
      let cleanedString = text .replace(/\n/g, '').replace(/\r/g, '').replace(/^<br\s*\/?>/, '').replace(/<br\s*\/?>$/, '');
      return cleanedString;
    }

    const prepareElement = (elmentString:string, tag:string) => {
      return elmentString.replace(tag, '').trim();
    }

    const makeStrComparable = (str:string) => {
      return str.replace(/<br\s*\/?>/gi, '').replace(/&nbsp;/gi, '').replace(/\s+/g, '').toLowerCase();
    }


    const prepareSummaryQuestion = (QuestionText:string, questionNo:number) => {
      const Question:{ Questions:any[], Summary:string, Name:string, QuestionChapter:string } = { Questions: [], Summary:'', Name:'', QuestionChapter:''};

      if(isIncudesSummaryQuestionTags(QuestionText, questionNo)){

        const QuestionSplitArray = QuestionText.split(masterQuestionSumarryEnd);
        const QuestionTextWithoutSummary = removeSpaceCharacters(QuestionSplitArray[1]);
        const QuestionArray = QuestionTextWithoutSummary.split(masterQuestionSumarryQuestions).filter(questionText => questionText !== '');

        const summaryElementArray = splitSummaryElementsSummaryText(QuestionSplitArray[0]);

        summaryElementArray.forEach(elementString => {
          const element = removeSpaceCharacters(elementString).trim();
          const startString = element.substring(0,4).toUpperCase();

          switch (startString) {
            case "@MQS":
              Question.Summary = removeSpaceCharacters(prepareElement(element, masterQuestionSumarry));

              break;
            case "@MQN":
              Question.Name = removeSpaceCharacters(prepareElement(element, masterQuestionName));
  
              break;
            case "@MQC":
              const chapter = removeSpaceCharacters(prepareElement(element, quesChapterId));
              const chapterObj = this.ltChapterList.find(ch =>  makeStrComparable(ch.name) === makeStrComparable(chapter));
              if(chapterObj){
                Question.QuestionChapter = chapterObj.id;
              }else{
                throw new Error(`Question No ${questionNo}: Question Chapter is not exist in Question Chapter List`);
              }
  
              break;
          }
        });
  
        Question.Questions = QuestionArray
        .map((questionText:string) => removeSpaceCharacters(questionText).trim())
        .filter((question) => question !== '')
        .map((questionText:string, index) => {
          const question = removeSpaceCharacters(questionText).trim();

          if(isIncudesALlQuestionTags(question, true, questionNo, index + 1)){
            return returnQuestios(question);
          }
  
          return {};
        });
      }

      return Question;
    }
    
    const returnQuestios = (questionText:string) => {
      
      const prepareElement = (elmentString:string, tag:string) => {
        return elmentString.replace(tag, '').trim();
      }

      const questionElements = splitQuestionElementsFromQuestionText(questionText);
      const question = {
        QuestionLevel:'',
        QuestionExplanation:'',
        Question:'',
        OptionA:'',
        OptionB:'',
        OptionC:'',
        OptionD:'',
        OptionE:'',
        RightAns:''
      }

      questionElements.forEach(elementString => {
        const element = removeSpaceCharacters(elementString).trim();
        const startString = element.substring(0,4).toUpperCase();
        

        switch (startString) {
          case QuestionLevel:
            const levelString = removeSpaceCharacters(prepareElement(element, QuestionLevel)).replace(/(<br\s*\/?>|\s)+$/g, '').trim().toLowerCase()
            console.log({element, levelString});
            if(levelString === this.QuestionLevel.Easy.toLowerCase()){
              question.QuestionLevel = this.QuestionLevel.Easy;
            }else if(levelString === this.QuestionLevel.Moderate.toLowerCase()){
              question.QuestionLevel = this.QuestionLevel.Moderate;
            }else if(levelString === this.QuestionLevel.Difficult.toLowerCase()){
              question.QuestionLevel = this.QuestionLevel.Difficult;
            }else{
              throw new Error('Question Level can be only these values (Easy / Moderate / Difficult)!!');
            }

            break;

          case QuestionExplanation:
            question.QuestionExplanation = removeSpaceCharacters(prepareElement(element, QuestionExplanation));
            break;

          case Question:
            question.Question = removeSpaceCharacters(prepareElement(element, Question));
            break;

          case OptionA:
            question.OptionA = removeSpaceCharacters(prepareElement(element, OptionA));
            break;

          case OptionB:
            question.OptionB = removeSpaceCharacters(prepareElement(element, OptionB));
            break;
          
          case OptionC:
            question.OptionC = removeSpaceCharacters(prepareElement(element, OptionC));
            break;

          case OptionD:
            question.OptionD = removeSpaceCharacters(prepareElement(element, OptionD));
            break;

          case OptionE:
            question.OptionE = removeSpaceCharacters(prepareElement(element, OptionE));
            break;

          case OptionRight:
            const rightOption = removeSpaceCharacters(prepareElement(element, OptionRight)).trim().replaceAll('&nbsp;', '');  
            
            if(rightOption === "OptA" || rightOption === "OptB" || rightOption === "OptC" || rightOption === "OptD" || rightOption === "OptE"){
              question.RightAns = removeSpaceCharacters(prepareElement(rightOption, OptionRight));
            }else{
              throw new Error('Right Option can be only these values (OptA / OptB / OptC / OptD / OptE)!!');
            }
            break;
        
          default:
            break;
        }
      });

      return question;
    }

    const splitQuestionElementsFromQuestionText = (questionText:string) => {
      const firstsplit = "===@Split@===";

      return questionText
        .replace(QuestionLevel, firstsplit + QuestionLevel)
        .replace(QuestionExplanation, firstsplit + QuestionExplanation)
        .replace(Question, firstsplit + Question)
        .replace(OptionA, firstsplit + OptionA)
        .replace(OptionB, firstsplit + OptionB)
        .replace(OptionC, firstsplit + OptionC)
        .replace(OptionD, firstsplit + OptionD)
        .replace(OptionE, firstsplit + OptionE)
        .replace(OptionRight, firstsplit + OptionRight).split(firstsplit).filter(questionElement => questionElement !== '');
    }

    const splitSummaryElementsSummaryText = (summaryText:string)  => {
      const firstsplit = "===@Split@===";
    
      return summaryText
      .replace(masterQuestionName, firstsplit + masterQuestionName)
      .replace(masterQuestionSumarry, firstsplit + masterQuestionSumarry)
      .replace(quesChapterId, firstsplit + quesChapterId)
      .split(firstsplit).filter(questionElement => questionElement !== '');
    }

    const isIncudesALlQuestionTags = (questionText:string, isSummaryQuestion:boolean, questionNo:number, subquestionNo:number) => {
      let errors = '';

      if (!questionText.includes(QuestionLevel))
          errors += QuestionLevel + ' , ';

      if (!questionText.includes(QuestionExplanation))
          errors += QuestionExplanation + ' , ';

      if (!questionText.includes(Question))
          errors += Question + ' , ';

      if (!questionText.includes(OptionA))
          errors += OptionA + ' , ';

      if (!questionText.includes(OptionB))
          errors += OptionB + ' , ';

      // if (!questionText.includes(OptionC))
      //     errors += OptionC + ' , ';

      // if (!questionText.includes(OptionD))
      //     errors += OptionD + ' , ';

      if(errors === ''){
        return true;
      }
  
      throw new Error(`Question No ${questionNo}-${subquestionNo}: Not Contains ${errors} tags`);
    };

    const isIncudesSummaryQuestionTags = (questionText:string, questionNo:number) => {
      let errors = '';

      if(!questionText.includes(masterQuestionName))
        errors += masterQuestionName;

      if(!questionText.includes(masterQuestionSumarry))
        errors += masterQuestionSumarry;

      if(!questionText.includes(masterQuestionSumarryEnd))
        errors += masterQuestionSumarryEnd;

      if(!questionText.includes(quesChapterId))
        errors += quesChapterId;

      if(errors === ''){
        return true;
      }

      throw new Error(`Question No ${questionNo}: Not Contains ${errors} tags`);
    }

    const textFile = this.Summary ? this.Summary.getData() as string : '';

    const textQuestions = textFile.split(masterQuestion).filter(questionText => questionText !== '');

    const QuestionsList = textQuestions.map((questionText, index) => prepareSummaryQuestion(questionText, index + 1));

    // console.log({QuestionsList});

    return QuestionsList;
  }
}
