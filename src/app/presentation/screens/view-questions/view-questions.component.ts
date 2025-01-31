import { Component, DestroyRef, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionMasterService } from '../../../services/question-master.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../services/category.service';
import { Detailszservice } from '../../../services/Details.service';
import { examMasterService } from '../../../services/exam-master.service';
import { ExamtypeService } from '../../../services/exam-type.service';
import { FormsUtilsService } from '../../../services/formsUtils.service';
import { KeywordService } from '../../../services/keyword.service';
import { subCategoryService } from '../../../services/subCategory.service';
import { chapterService } from '../../../services/chapter.service';
import { examCategoryService } from '../../../services/exam-category.service';
import { catchError, combineLatest, debounceTime, Observable, of, shareReplay, startWith, switchMap, withLatestFrom } from 'rxjs';
import { CommonListItemModel } from '../../../core/domain/common model';
import { KeywordListModel } from '../../../core/domain/Keyword/keyword-list-item-model';
import { AsyncPipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { QuestionLevel } from '../../../core/enums/question-level.enum';
import { IdExamTypeListModel } from '../../../core/domain/Exam type/id-ExamtypeList.model';
import { examMasterListIdnameModel } from '../../../core/domain/exam-master-category/exam-masterList-Id-name.model';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { AddQuestionService } from '../../../services/add-question.service';
import { ViewAllQuestionDTO } from '../add-test-question/view-all-question-dto.model';
import { QuestionListItemModel } from '../add-test-question/question-list-item.model';
import { QuestionTypeEnum } from '../../../core/enums/question-type.enum';
import { QuestionViewDailogComponent } from '../../components/question-view-dailog/question-view-dailog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SelectExamDailogComponent } from './components/select-exam-dailog/select-exam-dailog.component';

@Component({
  selector: 'app-view-questions',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, MatListModule, DataTableComponent, MatDialogModule, MatCheckboxModule, MatDialogModule],
  templateUrl: './view-questions.component.html',
  styleUrl: './view-questions.component.scss',
})
export class ViewQuestionsComponent implements OnInit {
  viewQuestionForm: FormGroup = new FormGroup({
    searchType: new FormControl(QuestionTypeEnum.Multiple),
    Search: new FormControl(''),
    StartDate: new FormControl(''),
    EndDate: new FormControl(''),
    catId: new FormControl('', []),
    sCatId: new FormControl('', []),
    chapId: new FormControl('', []),
    questionType: new FormControl(QuestionTypeEnum.Single),
    keywords: new FormControl([], []),
    level: new FormControl(QuestionLevel.None),
    type: new FormControl(''),
    MasterCategory: new FormControl(''),
    ExamCategory: new FormControl(''),
    exams: new FormControl([]),
  });

  categoryListDropdown$: Observable<CommonListItemModel[]> | undefined;
  subaCategoryListDropdown$: Observable<CommonListItemModel[]> | undefined;
  chapterListDropdown$: Observable<CommonListItemModel[]> | undefined;
  keywordListDropdown$: Observable<KeywordListModel[]> | undefined;
  masterCategoryDropdown$: Observable<examMasterListIdnameModel[]> | undefined;
  examCategoryDropdown$: Observable<CommonListItemModel[]> | undefined;
  examDropdownList$: Observable<IdExamTypeListModel[]> | undefined;

  QuestionLevel = QuestionLevel;
  QuestionTypeEnum = QuestionTypeEnum;

  dataObs: Observable<any> | undefined = of([]);

  tableCols: TableColType[] = [];
  selectedExams = signal<({id:string; name:string} | undefined)[]> ([]);
  selectedExams$ = toObservable(this.selectedExams);

  selectedRow:{[questionId:string]:boolean} = {};

  @ViewChild('actions', { static: true }) actions: TemplateRef<any> | undefined;
  @ViewChild('checkBox', { static: true }) checkBox: TemplateRef<any> | undefined;
  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  constructor(
    private QuestionMasterService: QuestionMasterService,
    private toastrService: ToastrService,
    private categoryService: CategoryService,
    private SubCatService: subCategoryService,
    private chapterService: chapterService,
    private formsUtils: FormsUtilsService,
    private keywordService: KeywordService,
    private masterCategoryService: examMasterService,
    private examCategoryService: examCategoryService,
    private examTypeService: ExamtypeService,
    private questionDetailsService: Detailszservice,
    private addQuestionService: AddQuestionService,
    private dailog:MatDialog,
    private destroyRef:DestroyRef
  ) {}

  ngOnInit(): void {
    this.categoryListDropdown$ =
      this.categoryService.getCategoryListIDwithName();
    this.masterCategoryDropdown$ =
      this.masterCategoryService.getexamMasterListIdwithName();

    this.tableCols = [
      {
        title: 'Select',
        data: '',
        type: 'custom',
        width: '50px',
        ref: this.checkBox,
        context: {
          isRowSelected: this.isRowSelected.bind(this),
          onRowSelect: this.onRowSelect.bind(this)
          // editMethod: this.customEdit.bind(this),
          // saveMethod: this.customSave.bind(this),
          // viewMethod: this.customView.bind(this),
          // deleteMethod: this.deleteMethod.bind(this),
        },
      },
      {
        title: 'Type',
        data: 'ques',
        type: 'renderF',
        width: '120px',
        renderF: function (data: any, type: any, row: QuestionListItemModel) {
          return `${row.type} <br> qmId: ${row.quesMasterOldId} <br> quesId: ${row.quesOldId}`;
        },
      },
      {
        title: 'Test Ids',
        data: 'ques',
        type: 'renderF',
        width: '120px',
        renderF: function (data: any, type: any, row: QuestionListItemModel) {
      
          const str = (row.used && row.used.length > 0) ? row.used.map((ques) => {
            if(ques.isUsed){
              return `<spna style="color:red;"> Used </span>: ${ques.oldId}`;
            }else{
              return `<spna style="color:green;">Free</span>`;
            }
          }).reverse().join('<br>') : '<spna style="color:green;">Free</span>';
          
          return str;
        },
      },
      { title: 'Path', data: 'path', type: 'text', width: '200px' },
      {
        title: 'Direction & Summary',
        data: 'ques',
        type: 'renderF',
        width: '200px',
        renderF: function (data: any, type: any, row: QuestionListItemModel) {
          return `${row.summary} <br> ${row.direction}`;
        },
      },
      {
        title: 'Keyword',
        data: 'keywords',
        type: 'renderF',
        renderF: function (data: any, type: any, row: QuestionListItemModel) {
          return row.keywords.join(', ');
        },
      },
      { title: 'Questions', data: 'ques', type: 'text' },
      { title: 'Enter By', data: 'createBy', type: 'text', width: '150px' },
      // { title: 'Status', data:'createBy', type:'text' },
      {
        title: 'Actions',
        data: '',
        type: 'custom',
        width: '150px',
        ref: this.actions,
        context: {
          editMethod: this.customEdit.bind(this),
          saveMethod: this.customSave.bind(this),
          viewMethod: this.customView.bind(this),
          deleteMethod: this.deleteMethod.bind(this),
        },
      },
      // { title: 'Layers', data: 'layers', type: 'text' },
    ];

    // {
    //   type:'Userd'
    // }
    // on exam category
    this.examDropdownList$ = this.ExamCategory?.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(() => {
        const category = this.ExamCategory?.value;

        if(category){
          return this.examTypeService.getExamTypeIdwithName(category).pipe(catchError(() => []));
        }

        return of([]);
      }),
      shareReplay(1)
    )

    // on exams change
    if(this.examDropdownList$){
      this.exams?.valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef),
        withLatestFrom(this.examDropdownList$)
      ).subscribe(([_, examList]) => {
        const exams:string[] = this.exams?.value;
        const newlySelectedExamList = exams.map(examId => examList.find((exam) => exam.id === examId))
        const combineSelectedExams = [...newlySelectedExamList, ...this.selectedExams()];
        const ids = new Set([...combineSelectedExams.map(exam => exam ? exam.id : '').filter(exam => !!exam)]);
        const combineListUndefined = [...ids].map((examId) => combineSelectedExams.find((exam => (exam && exam.id === examId))))
        this.selectedExams.set([...combineListUndefined]);
      });
    }

    const searchType = this.viewQuestionForm.get('searchType')?.valueChanges.pipe(startWith(''));
    const startDate = this.viewQuestionForm.get('StartDate')?.valueChanges.pipe(startWith(''));
    const endDate = this.viewQuestionForm.get('EndDate')?.valueChanges.pipe(startWith(''));
    const chapId = this.viewQuestionForm.get('chapId')?.valueChanges.pipe(startWith(''));
    const questionType = this.viewQuestionForm.get('questionType')?.valueChanges.pipe(startWith(QuestionTypeEnum.Single));
    const keywords = this.viewQuestionForm.get('keywords')?.valueChanges.pipe(startWith([]));
    const level = this.viewQuestionForm.get('level')?.valueChanges.pipe(startWith(QuestionLevel.None));
    const type = this.viewQuestionForm.get('type')?.valueChanges.pipe(startWith(QuestionTypeEnum.Single));

    if(searchType && startDate && endDate && chapId && questionType && keywords && level && type && this.selectedExams$){
      combineLatest([searchType, startDate, endDate, chapId, questionType, keywords, level, type, this.selectedExams$])
      .pipe(debounceTime(200),takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.onSearch();
      });
    }
  }

  get SearchType(): 'Summary' | 'Question' {
    return this.viewQuestionForm.get('searchType')?.value;
  }

  get catId() {
    return this.viewQuestionForm.get('catId');
  }
  get sCatId() {
    return this.viewQuestionForm.get('sCatId');
  }
  get chapId() {
    return this.viewQuestionForm.get('chapId');
  }

  get questionType(): 'Direct' | 'SummaryBased' {
    return this.viewQuestionForm.get('questionType')?.value;
  }

  get exams(){
    return this.viewQuestionForm.get('exams');
  }

  get ExamCategory(){
    return this.viewQuestionForm.get('ExamCategory');
  }

  onSelectCatId() {
    const categoryId = this.catId?.value;
    if(categoryId){
      this.subaCategoryListDropdown$ = this.SubCatService.getSubcategoryIdWithName(categoryId);
    }
  }

  onSelectSubCat() {
    const subcategoryId = this.sCatId?.value;
    if(subcategoryId){
      this.chapterListDropdown$ = this.chapterService.getChapterIdwithname(subcategoryId);
    }
  }

  onChapterSelect() {
    const chapterId = this.chapId?.value;
    if(chapterId){
      this.keywordListDropdown$ = this.keywordService.getKeywordList(chapterId);
    }
  }

  onExamCategorySelect() {
    const ExamCategory = this.viewQuestionForm.get('ExamCategory')?.value;

    if(ExamCategory){
      this.examDropdownList$ = this.examTypeService.getExamTypeIdwithName(ExamCategory);
    }
  }

  onMasterCategoryChange() {
    const MasterCategory = this.viewQuestionForm.get('MasterCategory')?.value;
    if(MasterCategory){
      this.examCategoryDropdown$ = this.examCategoryService.getExamCategoryListIdwithname(MasterCategory);
    }
  }

  removeSelectedExam(examId:string){
    this.selectedExams.update((exams) => exams.filter((exam) => (exam && exam.id !== examId)));
    const examsList:string[] = this.exams?.value;
    const newExamList = examsList.filter(examId => examId !== examId);
    this.exams?.patchValue(newExamList);
  }
  
  isRowSelected(data:QuestionListItemModel){
    return this.selectedRow[data.quesId];
  }

  onRowSelect(data:QuestionListItemModel, value:any){
    this.selectedRow[data.quesId] = value.checked;
  }

  getSelectedRowsNo(){
    return Object.keys(this.selectedRow).filter(row => this.selectedRow[row]).length;
  }

  onSearch() {
    
    const params: ViewAllQuestionDTO = {
      serachBy: this.viewQuestionForm.get('searchType')?.value,
      search: this.viewQuestionForm.get('Search')?.value,
      catId: this.viewQuestionForm.get('catId')?.value,
      subCatId: this.viewQuestionForm.get('sCatId')?.value,
      chapId: this.viewQuestionForm.get('chapId')?.value,
      type: this.viewQuestionForm.get('questionType')?.value,
      pageNo: 0,
      key: this.viewQuestionForm.get('keywords')?.value,
      exams: this.viewQuestionForm.get('exams')?.value,
      level: this.viewQuestionForm.get('level')?.value,
      dateFrom: this.viewQuestionForm.get('StartDate')?.value,
      dateTo: this.viewQuestionForm.get('EndDate')?.value,
    };

    this.dataObs = this.addQuestionService.viewAllQuestions(params).pipe(
      catchError((error) => {
        this.toastrService.error(error.message);
        return of([]);
      })
    );

    setTimeout(() => {
      if (this.dttable) {
        this.dttable.reloadTable();
      }
    });
  }

  customEdit(data: any) {
    console.log('customEdit', data);
  }

  customSave(data: any) {
    console.log('customSave', data);
  }

  customView(data: any) {
    console.log(data);
    this.dailog.open(QuestionViewDailogComponent, {
      data:{
        questionId: data.quesId, 
        oldId: data.quesOldId
      }
    });
  }

  deleteMethod(data: any) {
    console.log('deleteMethod', data);
  }

  saveAsNew(){
    const dailogRef = this.dailog.open(SelectExamDailogComponent, {
      data:{
        title:'Save as new',
        noOfQuestions: this.getSelectedRowsNo()
      }
    });

    dailogRef.afterClosed().subscribe((exams) =>{
      if(exams && exams.length > 0){
        console.log({exams});
      }
    })
  }


}
