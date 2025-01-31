import { Component, DestroyRef, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionLevel } from '../../../core/enums/question-level.enum';
import { combineLatest, debounceTime, Observable,of, startWith} from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatListModule} from '@angular/material/list';
import { CategoryService } from '../../../services/category.service';
import { CommonListItemModel } from '../../../core/domain/common model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogModule } from '@angular/material/dialog';
import { examMasterService } from '../../../services/exam-master.service';
import { examCategoryService } from '../../../services/exam-category.service';
import { examMasterListIdnameModel } from '../../../core/domain/exam-master-category/exam-masterList-Id-name.model';
import { ExamtypeService } from '../../../services/exam-type.service';
import { IdExamTypeListModel } from '../../../core/domain/Exam type/id-ExamtypeList.model';
import { chapterService } from '../../../services/chapter.service';
import { subCategoryService } from '../../../services/subCategory.service';
import { MatIcon } from '@angular/material/icon';
import { AddQuestionService } from '../../../services/add-question.service';
import { getNewQuestionListDTO } from '../add-test-question/get-new-question-list-dto.model';
import { QuestionTypeEnum } from '../../../core/enums/question-type.enum';
import { QuestionListItemModel } from '../add-test-question/question-list-item.model';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { SaveInTestDTO } from '../add-test-question/save-in-test-dto.model';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KeywordService } from '../../../services/keyword.service';
import { QuestionViewDailogComponent } from '../../components/question-view-dailog/question-view-dailog.component';

@Component({
  selector: 'app-add-question-to-test',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, MatListModule,CommonModule,MatIcon, FormsModule,MatListModule, MatDialogClose, DataTableComponent, MatDialogModule],
  templateUrl: './add-question-to-test.component.html',
  styleUrl: './add-question-to-test.component.scss'
})
export class AddQuestionToTestComponent implements OnInit {

  AddQuestTestForm: FormGroup = new FormGroup({
    questionType: new FormControl(QuestionTypeEnum.Single,[]),
    levels: new FormControl(QuestionLevel.None, []),
    keywords: new FormControl([], []),
    mainCategory: new FormControl('', []),
    examCategory: new FormControl('', []),
    examType: new FormControl([]),
  });


  QuestionLevel = QuestionLevel;
  QuestionTypeEnum = QuestionTypeEnum;

  dataObs: Observable<any> | undefined = of([]);

  tableCols: TableColType[] = [];

  @ViewChild('actions', { static:true }) actions:TemplateRef<any> | undefined;

  @ViewChild('dttable')dttable : DataTableComponent | undefined



  constructor(
    private chapterService : chapterService,
    private examMasterService: examMasterService,
    private examCategoryService: examCategoryService,
    private examTypeService: ExamtypeService,
    private categoryService : CategoryService,
    private subcategoryService: subCategoryService,
    private keywordService:KeywordService,
    private addQuestionService: AddQuestionService,
    private toastrService:ToastrService,
    private destroyRef:DestroyRef,
    private dailog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { category:string, subcategory:string, chapterId:string, examId:string, testId:number}, 
  ) { }

  CategoryListDropdown$ : Observable <any[]> | undefined ;
  SubCategoryListDropdown$ : Observable <any[]> | undefined ;
  KeywordsListDropdown$: Observable<any[]> | undefined;
  MainCategoryListDropdown$: Observable<examMasterListIdnameModel[]> | undefined;

  ExamCategoryListDropdown$: Observable<CommonListItemModel[]> | undefined;

  ExamTypeListDropdown$: Observable<IdExamTypeListModel[]> | undefined;

  selectedExamTypes$ : Observable <CommonListItemModel[]> | undefined;

  questionList$: Observable<QuestionListItemModel[]> | undefined;

  get QuestionType() {
    return this.AddQuestTestForm.get('questionType');
  }

  get QuestionLevels() {
    return this.AddQuestTestForm.get('levels');
  }

  get Keywords() {
    return this.AddQuestTestForm.get('keywords');
  }

  get MainCategory() {
    return this.AddQuestTestForm.get('mainCategory');
  }

  get ExamCatgory() {
    return this.AddQuestTestForm.get('examCategory')
  }

  get ExamType() {
    return this.AddQuestTestForm.get('examType')
  }

  ngOnInit(): void {
    this.CategoryListDropdown$ = this.categoryService.getCategoryListIDwithName();
    this.KeywordsListDropdown$ = this.keywordService.getKeywordList(this.data.chapterId);
    this.MainCategoryListDropdown$ = this.examMasterService.getexamMasterListIdwithName();    

    this.tableCols = [
      { 
        title:'Type', 
        data:'ques', 
        type:'renderF', 
        width:'120px',
        renderF:function (data: any, type: any, row: QuestionListItemModel) {
          return `${row.type === QuestionTypeEnum.Single ? 'Direct' : 'Summary'} <br> QmId: ${row.quesMasterOldId} <br> QuesId: ${row.quesOldId}`;
        },
      },
      { title: 'Path', data:'path', type:'text', width:'200px'},
      { title:'Direction & Summary', data:'ques', type:'renderF', width:'200px',
        renderF:function (data: any, type: any, row: QuestionListItemModel) {

          return `${row.summary} <br> ${row.direction}`;
        },
      },
      { title: 'Keyword', data:'keywords', type:'renderF', width:'150px', 
        renderF:function (data: any, type: any, row: QuestionListItemModel) {

          return row.keywords.join(', ');
        }, 
      },
      { title: 'Questions', data:'ques', type:'text' },
      { title: 'Enter By', data:'createBy', type:'text', width:'150px'},
      // { title: 'Status', data:'createBy', type:'text' },
      { title: 'Actions', data: '', type: 'custom',  width:'180px' ,ref:this.actions, context: {
        editMethod:this.customEdit.bind(this),
        saveMethod:this.customSave.bind(this),
        viewMethod:this.customView.bind(this)
      }},
      // { title: 'Layers', data: 'layers', type: 'text' },
    ];

    this.ExamType?.setValue([this.data.examId]);

    const questionType = this.QuestionType?.valueChanges.pipe(startWith(''));;
    const questionLevel = this.QuestionLevels?.valueChanges.pipe(startWith(''));;
    const keywords = this.Keywords?.valueChanges.pipe(startWith([]));
    const ExamType = this.ExamType?.valueChanges.pipe(startWith([]));;

    if(questionType && questionLevel && keywords && ExamType){
      combineLatest([questionType, questionLevel, keywords, ExamType]).pipe(debounceTime(200),takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
        // console.log(data);
        this.search();
      });
    }
  }

  onKeywordSelect() {
    
  }

  onSelectMainCategory() {
    const MainCatId = this.AddQuestTestForm.get('mainCategory')?.value;
    this.ExamCategoryListDropdown$ = this.examCategoryService.getExamCategoryListIdwithname(MainCatId)
  }

  onExamCategorySelect() {
    const ExamCatId = this.AddQuestTestForm.get('examCategory')?.value;
    this.ExamTypeListDropdown$ = this.examTypeService.getExamTypeIdwithName(ExamCatId);
  }

  search() {
    const params:getNewQuestionListDTO = {
      "catId": this.data.category,
      "subCatId": this.data.subcategory,
      "chapId": this.data.chapterId,
      "type": this.QuestionType?.value,
      "pageNo": 0,
      "key": this.Keywords?.value,
      "exams": this.ExamType?.value,
      "level": this.QuestionLevels?.value
    }

    console.log({params});
    // this.questionList$ = 
    this.dataObs = this.addQuestionService.getNewQuestionsList(params);
    setTimeout(() => {
      if(this.dttable){
        this.dttable.reloadTable();
      }
    });
  }

  

  customEdit(data:any){
    console.log("customEdit", data);
  }

  customSave(data:any){
    // console.log("customSave", data);

    const params:SaveInTestDTO = {
      "testId": this.data.testId, 
      "categoryId": this.data.category,
      "subCategoryId": this.data.subcategory,
      "chapterId": this.data.chapterId,
      "quesMasterId": data.quesMasterId,
      "quesDetailId": data.quesId,
    }

    this.addQuestionService.saveInTest(params).subscribe({
      next:(response => {
        this.toastrService.success('Save Question', 'Question saved in test successfully.' );
        setTimeout(() => {
          if(this.dttable){
            this.dttable.reloadTable();
          }
        });
      }),
      error:(error => {
        console.log(error);
        this.toastrService.error(error.message)
      })
    })
  }

  customView(data:any){
    console.log(data);
    this.dailog.open(QuestionViewDailogComponent, {
      data:{
        questionId: data.quesId, 
        oldId: data.quesOldId
      },
      width: '90vw',
      height: '90vh',
      maxWidth: '90vw',
      maxHeight: '90vh',
    });
  }
}