import { Component, DestroyRef, OnInit, ViewChild } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { chapterService } from '../../../services/chapter.service';
import { AsyncPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { subCategoryService } from '../../../services/subCategory.service';
import { CategoryService } from '../../../services/category.service';
import { CommonListItemModel } from '../../../core/domain/common model';
import { examCategoryService } from '../../../services/exam-category.service';
import { ExamtypeService } from '../../../services/exam-type.service';
import { IdExamTypeListModel } from '../../../core/domain/Exam type/id-ExamtypeList.model';
import { FormsUtilsService } from '../../../services/formsUtils.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-manage-chapter',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, DataTableComponent, AsyncPipe],
  templateUrl: './manage-chapter.component.html',
  styleUrl: './manage-chapter.component.scss',
})
export class ManageChapterComponent implements OnInit {
  isUpdateMode: boolean = false;

  chapterForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    subCatid: new FormControl('', [Validators.required]),
    catid: new FormControl('', [Validators.required]),
    examCat: new FormControl('', [Validators.required]),
    examid: new FormControl('', [Validators.required]),
  });

  editChapterId: string = '';
  dataObs: Observable<any> = of([]);
  tableCols: TableColType[] = [];

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  categoryListDropdown$: Observable<CommonListItemModel[]> | undefined;

  subCategoryListDropDown$: Observable<CommonListItemModel[]> | undefined;

  ExamCatListDropdown$: Observable<CommonListItemModel[]> | undefined;

  ExamListDropdown$: Observable<IdExamTypeListModel[]> | undefined;

  constructor(
    private chapterService: chapterService,
    private CategoryService: CategoryService,
    private toastrService: ToastrService,
    private subCategoryService: subCategoryService,
    private examtypeService: ExamtypeService,
    private examCategoryService: examCategoryService,
    private formsUtilService: FormsUtilsService,
    private destroyRef:DestroyRef
  ) {}

  ngOnInit(): void {
    this.categoryListDropdown$ = this.CategoryService.getCategoryListIDwithName();

    this.tableCols = [
      { title: 'Name', data: 'name', type: 'text' },
      { title: 'Sub Category', data: 'subCatName', type: 'text' },
      { title: 'Category', data: 'catName', type: 'text' },
    ];

    const MainCatId = '67347bc005603bccd5b859dd';
    this.ExamCatListDropdown$ = this.examCategoryService.getExamCategoryListIdwithname(MainCatId);

    this.subCategoryListDropDown$ = this.CategoryID?.valueChanges.pipe(switchMap(() => {
      const categoryId = this.CategoryID?.value;
      if(categoryId){
        return this.subCategoryService.getSubcategoryIdWithName(categoryId);
      }

      return of([]);
    }), catchError(() => of([])));

    this.SubCatID?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.dataObs = this.chapterService.getChapterList(this.SubCatID?.value);

      setTimeout(() => {
        this.dttable?.reloadTable();
      });
    });

    this.ExamListDropdown$ = this.ExamCategory?.valueChanges.pipe(switchMap(() => {
      const ExamCategoryId = this.ExamCategory?.value;
      if(ExamCategoryId){
        return this.examtypeService.getExamTypeIdwithName(this.ExamCategory?.value);
      }

      return of([]);
    }), catchError(() => of([])))
  }

  get Name() {
    return this.chapterForm.get('name');
  }

  get CategoryID() {
    return this.chapterForm.get('catid');
  }

  get SubCatID() {
    return this.chapterForm.get('subCatid');
  }

  get ExamCategory() {
    return this.chapterForm.get('examCat');
  }

  get ExamID() {
    return this.chapterForm.get('examid');
  }

  createChapter() {
    if(this.formsUtilService.checkValidationErrors(this.chapterForm, {
      name: 'Name',
      subCatid: 'Sub Category',
      catid: 'Category',
      examCat: 'Exam Cat',
      examid: 'Exam',
    })){
      return;
    }

    const Name = this.Name?.value;
    const SubCat = this.SubCatID?.value;
    const CatId = this.CategoryID?.value;
    const ExamId = this.ExamID?.value;

    this.chapterService.createChapter(Name, SubCat, CatId, ExamId).subscribe({
      next: (response) => {
        if (this.dttable) this.dttable.reloadTable();
        this.toastrService.success('Category Created Succesfully!!','Create Category');
        this.clearForm();
      },
      error: (error) => {
        this.toastrService.error(error.message);
      }
    });
  }

  updateChapter(_chapterID: string) {
    if(this.formsUtilService.checkValidationErrors(this.chapterForm, {
      name: 'Name',
      subCatid: 'Sub Category',
      catid: 'Category',
      examCat: 'Exam Cat',
      examid: 'Exam',
    })){
      return;
    }

    const id = _chapterID;
    const name = this.Name?.value;
    const sCatId = this.SubCatID?.value;
    const catId = this.CategoryID?.value;
    const examId = this.ExamID?.value;

    this.chapterService.updateChapter(id, name, sCatId, catId, examId)
      .subscribe({
        next: (response) => {
          if (this.dttable) this.dttable.reloadTable();
          this.toastrService.success( 'Category Updated Succesfully !!', 'Update Category');
          this.clearForm();
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  clearForm() {
    this.editChapterId = '';
    this.isUpdateMode = false;
    
    this.chapterForm.patchValue({
      name: '',
      examCat: '',
      examid: ''
    });
  }

  editChapter(data: any) {
    const id = data.id;

    this.chapterService.getChapterSingle(id).subscribe({
      next: (response) => {
        this.editChapterId = id;
        this.isUpdateMode = true;

        this.chapterForm.patchValue({
          name: response.name,
          subCatid : response.sCatId,
          catid : response.catId,
          examid : response.examId
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  deleteChapter(data: any) {
    const id = data.id;

    this.chapterService.removeChapter(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
          this.toastrService.success('Category Deleted Succesfully', 'create Category');
        }
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }
}
