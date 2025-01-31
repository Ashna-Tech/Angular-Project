import { Component, effect, inject, input, OnInit, signal, untracked } from '@angular/core';
import { QuestionCardComponent } from './components/question-card/question-card.component';
import { RightOption } from '../../../core/enums/RightOption.enum';
import { QuestionActionFooterComponent } from './components/question-action-footer/question-action-footer.component';
import { AddQuestionService } from '../../../services/add-question.service';
import { finalize, Observable } from 'rxjs';
import { ViewAddedQuestionListModel, ViewAddedQuestionModel } from '../../../core/domain/Add-Test-Question/view-added-question.model';
import { AsyncPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reasoning-aptitude',
  standalone: true,
  imports: [QuestionCardComponent, QuestionActionFooterComponent, AsyncPipe],
  templateUrl: './reasoning-aptitude.component.html',
  styleUrl: './reasoning-aptitude.component.scss'
})
export class ReasoningAptitudeComponent implements OnInit {

  TestId = input<string> ('');
  CategoryId = input<string> ('');
  
  readonly AddQuestService = inject(AddQuestionService);
  readonly toasterService = inject(ToastrService);
  readonly isLoading = signal(false);
  
  sectionQuestionData$:Observable<ViewAddedQuestionListModel> | undefined;
  

  constructor(){
    const loadData = effect(() => { 
      const testId = this.TestId();
      const categoryId = this.CategoryId();

      untracked(() =>{
        console.log({TestId:testId, CategoryId:categoryId});
        if(testId && categoryId){
          this.isLoading.set(true);
          this.sectionQuestionData$ = this.AddQuestService.getViewAddedQuestionsByCategoryId(testId, categoryId).pipe(finalize(() => {this.isLoading.set(false);}));
        }
      })
    })
  }

  ngOnInit(): void {
    console.log({TestId:this.TestId(), CategoryId:this.CategoryId()});
  }

   updateQuestion(question:ViewAddedQuestionModel, testId:string, marks:number, topperTime:number, order:number, status:string){ 
      const params = { 
        testId: testId,
        quesMasterId: question.quesMasterId,
        quesDetailId: question.quesId,
        optAns: status,
        optRight: question.optRight,
        spendTime: topperTime * 1000,
        orderNo: order,
        testQuesId: question.testQuesId,
        marks: marks
       }

       console.log(params);
       
      this.AddQuestService.updateToperTime(params).subscribe({
        next: (response) => {
          console.log(response);
          this.toasterService.success('Question updated successfully', 'Success');
        },
        error: (error) => {
          console.log(error);
          this.toasterService.error(error.message,'Error');
        }
      });
    }

  removeQuestionFromTest(testId:string, questionId:string){
    this.AddQuestService.removeQuestionFromTest(testId, questionId).subscribe({
      next: (response) => {
        console.log(response);
        this.toasterService.success('Question removed successfully', 'Success');
      },
      error: (error) => {
        console.log(error);
        this.toasterService.error(error.message,'Error');
      }
    });
  }
}
