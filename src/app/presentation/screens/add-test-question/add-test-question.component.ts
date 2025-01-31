import { AsyncPipe } from '@angular/common';
import { Component, input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, shareReplay } from 'rxjs';
import { CommonListItemModel } from '../../../core/domain/common model';
import { AddQuestionService } from '../../../services/add-question.service';
import { AddQuestionListModel } from '../../../core/domain/Add-Test-Question/add-question-list.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionToTestComponent } from '../add-question-to-test/add-question-to-test.component';
import { CategoryTotalQuestion } from '../../../core/domain/Add-Test-Question/category-total-question.model';

@Component({
  selector: 'app-add-test-question',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, FormsModule],
  templateUrl: './add-test-question.component.html',
  styleUrl: './add-test-question.component.scss',
})

export class AddTestQuestionComponent implements OnInit {

  addTestForm: FormGroup = new FormGroup({
    catId: new FormControl('', []),
    subcategory: new FormControl('', []), 
    name: new FormControl('', []),
    noOfQuestion: new FormControl('', []),
    noOfAddQues: new FormControl('', []),
  });

  ExamId = input<string> ('67611f734368bd1e542b77d2');
  Exam = input<string> ();
  TestId = input<string> ('2');

  constructor(private AddQuestService: AddQuestionService,
    private tosterService : ToastrService,
     private dialog : MatDialog 
    ) {}
 
  @ViewChild('DialogContentTemplate') DialogContentTemplate : TemplateRef<any> |  undefined;

  categoryDropdown$: Observable<CommonListItemModel[]> | undefined;

  SubcategoryDropdown$: Observable<CommonListItemModel[]> | undefined;

  AddQuestionListDropdown$: Observable<AddQuestionListModel[]> | undefined;

  categoryTotalQuestion$:Observable<CategoryTotalQuestion> |undefined;

  get Category() {
    return this.addTestForm.get('catId');
  }

  get Subcategory() {
    return this.addTestForm.get('subcategory');
  }

  get Name() {
    return this.addTestForm.get('name')
  }

  get NoofQuestion() {
    return this.addTestForm.get('noOfQuestion');
  }

  get NoOfQuestion() {
    return this.addTestForm.get('noOfAddQues')
  }

  ngOnInit(): void {
    this.categoryDropdown$ = this.AddQuestService.GetAddQuestionCategory(this.TestId());
    console.log({ExamId:this.ExamId(), Exam:this.Exam(), TestId: this.TestId()});
  }

  onCategorySelect() {
    const CatId = this.addTestForm.get('catId')?.value;
    this.SubcategoryDropdown$ = this.AddQuestService.GetAddQuestionSubCategory(this.TestId(), CatId);
    this.categoryTotalQuestion$ = this.AddQuestService.getCategoryTotalQues(this.TestId(), CatId).pipe(shareReplay(1));
  }

  onSelectSubCategory() {
    const CatId = this.addTestForm.get('catId')?.value;
    const SubCatId = this.addTestForm.get('subcategory')?.value;
    const ExamId = this.ExamId();
    const TestId = this.TestId();
    this.AddQuestionListDropdown$ = this.AddQuestService.GetAddQuestionList(CatId, SubCatId, ExamId, TestId)
  }


  // Method to Dialog box open on Add Test Question  
  openAddQuestionToTest(chapterId:string) : void {
    const selectedData =  {
      category: this.addTestForm.get('catId')?.value,
      subcategory: this.addTestForm.get('subcategory')?.value,
      chapterId: chapterId,
      examId: this.ExamId(),
      testId: this.TestId()
   };

   this.dialog.open(AddQuestionToTestComponent,{
    width: '90vw',
    height: '90vh',
    maxWidth: '90vw',
    maxHeight: '90vh',
    data: selectedData,
   });

   console.log(selectedData);


  }

  UpdateAddQuestion(noOfQuestionDetailId:string, value:string){
    const testid = 2 
    const noofQuest = Number(value);

    this.AddQuestService.UpdateAddQuestion(testid,noofQuest,noOfQuestionDetailId).subscribe({
      next : (response =>{
        this.tosterService.success('Update Add Questions');
        this.onSelectSubCategory();
      }),
        error :((error) =>{
          this.tosterService.error(error.message);
        })
    })

    
  }

}
