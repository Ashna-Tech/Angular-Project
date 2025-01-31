import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { combineLatest, Observable, of, startWith, switchMap } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { CategoryService } from '../../../services/category.service';
import { subCategoryService } from '../../../services/subCategory.service';
import { examMasterService } from '../../../services/exam-master.service';
import { examCategoryService } from '../../../services/exam-category.service';
import { ExamtypeService } from '../../../services/exam-type.service';
import { chapterService } from '../../../services/chapter.service';
import { examMasterListIdnameModel } from '../../../core/domain/exam-master-category/exam-masterList-Id-name.model';
import { CommonListItemModel } from '../../../core/domain/common model';
import { IdExamTypeListModel } from '../../../core/domain/Exam type/id-ExamtypeList.model';
import { ToastrService } from 'ngx-toastr';
import { TotalChapterQuestionService } from '../../../services/total-chapter-Ques-service';
import { TotalChapterQuesModel } from '../../../core/domain/Total-Chapter-Question/total-chapter-qest-model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsUtilsService } from '../../../services/formsUtils.service';

@Component({
  selector: 'app-total-chapter-question',
  standalone: true,
  imports: [ReactiveFormsModule, DataTableComponent, AsyncPipe],
  templateUrl: './total-chapter-question.component.html',
  styleUrl: './total-chapter-question.component.scss',
})

export class TotalChapterQuestionComponent implements OnInit {
  isUpdateMode: boolean = false;

  totalChapterQuesForm: FormGroup = new FormGroup({
    mainCatid: new FormControl('', [Validators.required]),
    examCatid: new FormControl('', [Validators.required]),
    examid: new FormControl('', [Validators.required]),
    categoryid: new FormControl('', [Validators.required]),
    subCategoryid: new FormControl('', [Validators.required]),
    chapterid: new FormControl('', [Validators.required]),
    noOfQuestion: new FormControl(0, []),
    trending: new FormControl(0, []),
  });

  dataObs: Observable<any> = of([]);
  tableCols: TableColType[] = [];
  editTotalChapterQuestionId: string = '';

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  MainCategoryListDropdown$: Observable<examMasterListIdnameModel[]> | undefined;

  ExamCategoryListDropdown$: Observable<CommonListItemModel[]> | undefined;

  ExamListDropdown$: Observable<IdExamTypeListModel[]> | undefined;

  CategoryListDropdown$: Observable<CommonListItemModel[]> | undefined;

  SubCategoryListDropdown$: Observable<CommonListItemModel[]> | undefined;

  ChapterListDropdown$: Observable<CommonListItemModel[]> | undefined;

  constructor(
    private examMasterService: examMasterService,
    private examCategoryService: examCategoryService,
    private examtypeService: ExamtypeService,
    private categoryService: CategoryService,
    private subCategoryService: subCategoryService,
    private chapterService: chapterService,
    private toastrService: ToastrService,
    private totalChapterQuesService: TotalChapterQuestionService,
    private destroyRef:DestroyRef,
    private formUtilsService:FormsUtilsService
  ) {}

  ngOnInit(): void {
    this.tableCols = [
      { title: 'Exam', data: 'exam', type: 'text' },
      { title: 'Category', data: 'category', type: 'text' },
      { title: 'Subcategory', data: 'subCategory', type: 'text' },
      { title: 'Chapter', data: 'chapter', type: 'text' },
      { title: 'No of Question', data: 'noofQues', type: 'text' },
      { title: 'Trending', data: 'trending', type: 'text' },
    ];

    this.MainCategoryListDropdown$ = this.examMasterService.getexamMasterListIdwithName();

    this.CategoryListDropdown$ = this.categoryService.getCategoryListIDwithName();

    this.ExamCategoryListDropdown$ = this.MainCategoryID?.valueChanges.pipe(switchMap(() => {
      const mainCatid = this.MainCategoryID?.value;
      if(mainCatid){
        return this.examCategoryService.getExamCategoryListIdwithname(mainCatid)
      }

      return of([]);
    }));

    this.ExamListDropdown$ = this.ExamCategoryID?.valueChanges.pipe(switchMap(() => {
      const examCatid = this.ExamCategoryID?.value;
      if(examCatid){
        return this.examtypeService.getExamTypeIdwithName(examCatid);
      }

      return of([]);
    }));
    
    this.SubCategoryListDropdown$ = this.CategoryID?.valueChanges.pipe(switchMap(() => {
      const categoryid = this.CategoryID?.value;
      if(categoryid){
        return this.subCategoryService.getSubcategoryIdWithName(categoryid);
      }

      return of([]);
    }));

    this.ChapterListDropdown$ = this.SubcategoryID?.valueChanges.pipe(switchMap(() => {
      const subCategoryid = this.SubcategoryID?.value;
      if(subCategoryid){
        return this.chapterService.getChapterIdwithname(subCategoryid);;
      }

      return of([]);
    }));

    const examInput = this.totalChapterQuesForm.get('examid')?.valueChanges.pipe(startWith(''));
    const subCategoryInput = this.totalChapterQuesForm.get('subCategoryid')?.valueChanges.pipe(startWith(''));
    const chapterInput = this.totalChapterQuesForm.get('chapterid')?.valueChanges.pipe(startWith(''));
    
    if(examInput && subCategoryInput){
      combineLatest([examInput, subCategoryInput]).pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(() => {
          const examId = this.totalChapterQuesForm.get('examid')?.value;
          const categoryId = this.totalChapterQuesForm.get('categoryid')?.value;
          const subCategoryId = this.totalChapterQuesForm.get('subCategoryid')?.value;

          if(examId && categoryId && subCategoryId){
            return  this.totalChapterQuesService.GetTotalChapterQuesList(examId, categoryId, subCategoryId)
          }

          return of([]);
        })
      ).subscribe((totalChapterList) => {
        this.dataObs = of(totalChapterList);

        setTimeout(() => {
          this.dttable?.reloadTable();
        });
      });
    }

    if(examInput && subCategoryInput && chapterInput){
      combineLatest([examInput, subCategoryInput, chapterInput]).pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(() => {
          const examId = this.totalChapterQuesForm.get('examid')?.value;
          const categoryId = this.totalChapterQuesForm.get('categoryid')?.value;
          const subCategoryId = this.totalChapterQuesForm.get('subCategoryid')?.value;  
          const chapterId = this.totalChapterQuesForm.get('chapterid')?.value;

          if(examId && categoryId && subCategoryId && chapterId){
            return this.totalChapterQuesService.getSingleTotalChapterQuest(examId,categoryId,subCategoryId,chapterId);
          }

          return of(null);
        })
      ).subscribe({
        next:(totalChapterQuestion) => {
          if(totalChapterQuestion){
            this.setUpdateMode(true, totalChapterQuestion.id, totalChapterQuestion.noofQues, totalChapterQuestion.trending);
          }else{
            this.setUpdateMode(false, '', 0, 0);
          }
        },
        error:err => {
          this.toastrService.error(err.message);
          this.setUpdateMode(false, '', 0, 0);
        }
      })  
    }    
  }

  get MainCategoryID() {
    return this.totalChapterQuesForm.get('mainCatid');
  }

  get ExamCategoryID() {
    return this.totalChapterQuesForm.get('examCatid');
  }

  get ExamID() {
    return this.totalChapterQuesForm.get('examid');
  }

  get CategoryID() {
    return this.totalChapterQuesForm.get('categoryid');
  }

  get SubcategoryID() {
    return this.totalChapterQuesForm.get('subCategoryid');
  }

  get ChapterID() {
    return this.totalChapterQuesForm.get('chapterid');
  }

  get NoofQestion() {
    return this.totalChapterQuesForm.get('noOfQuestion');
  }

  get Trending() {
    return this.totalChapterQuesForm.get('trending');
  }

  setUpdateMode(isUpdateMode:boolean, id:string, noOfQuestion:number, trending:number){
    this.isUpdateMode = isUpdateMode;
    this.editTotalChapterQuestionId = id;
    this.totalChapterQuesForm.patchValue({
      noOfQuestion,
      trending,
    });
  }

  createTotalChapterQuestion() {
    if(this.formUtilsService.checkValidationErrors(this.totalChapterQuesForm, {
      mainCatid: 'Main Category',
      examCatid: 'Exam Category',
      examid: 'Exam Id',
      categoryid: 'Category',
      subCategoryid: 'Sub Category',
      chapterid: 'Chapter',
      noOfQuestion: 'No Of Question',
      trending: 'Trending',
    })) return;

    const examid = this.ExamID?.value;
    const category = this.CategoryID?.value;
    const subcategory = this.SubcategoryID?.value;
    const chapterid = this.ChapterID?.value;
    const noOfquestion = this.NoofQestion?.value;
    const trending = this.Trending?.value;

    this.totalChapterQuesService.CreateTotalChapterQues(examid, category, subcategory, chapterid, noOfquestion, trending)
    .subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        
        this.toastrService.success('Total Chapter Question Created Successfully','Total Chapter Question Created');
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  updateTotalChapterQuestion(id:string) {
    if(this.formUtilsService.checkValidationErrors(this.totalChapterQuesForm, {
      mainCatid: 'Main Category',
      examCatid: 'Exam Category',
      examid: 'Exam Id',
      categoryid: 'Category',
      subCategoryid: 'Sub Category',
      chapterid: 'Chapter',
      noOfQuestion: 'No Of Question',
      trending: 'Trending',
    })) return;

    const examid = this.ExamID?.value;
    const category = this.CategoryID?.value;
    const subcategory = this.SubcategoryID?.value;
    const chapter = this.ChapterID?.value;
    const noofquestion = this.NoofQestion?.value;
    const trending = this.Trending?.value;

    this.totalChapterQuesService.UpdateTotalChapterQues(examid, category, subcategory, chapter, noofquestion, trending)
    .subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success('Total Chapter Question Update Successfully','Total Chapter Question Updated');
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  deleteTotalChapterQuestion(data: any) {
    const id = data.id;

    this.totalChapterQuesService.DeleteTotalChapterQues(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }

        this.toastrService.success('Total Chapter Question Delete Successfully','Total Chapter Question Deleted');
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  editTotalChapterQuestion(data: any) {
    const {id, examId, categoryId, subCategoryId, chapterId} = data; 
    
    this.totalChapterQuesService.getSingleTotalChapterQuest(examId,categoryId, subCategoryId,chapterId)
    .subscribe({
      next: (response:TotalChapterQuesModel) => {
        this.editTotalChapterQuestionId = id;

        this.totalChapterQuesForm.patchValue({
          chapterid: response.chapterId,
          noOfQuestion: response.noofQues,
          trending: response.trending,
        });
          
        this.isUpdateMode = true;
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  clearForm() {
    this.editTotalChapterQuestionId = '';
    this.isUpdateMode = false;

    this.totalChapterQuesForm.patchValue({
      chapterid: '',
      noOfQuestion: 0,
      trending: 0,
    });
  }
}
