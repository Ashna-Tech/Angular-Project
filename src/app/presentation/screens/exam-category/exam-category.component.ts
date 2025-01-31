import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { Observable, of, switchMap } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { examCategoryService } from '../../../services/exam-category.service';
import { ToastrService } from 'ngx-toastr';
import { examMasterService } from '../../../services/exam-master.service';
import { examMasterListIdnameModel } from '../../../core/domain/exam-master-category/exam-masterList-Id-name.model';
import { FormsUtilsService } from '../../../services/formsUtils.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-exam-category',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AsyncPipe, DataTableComponent],
  templateUrl: './exam-category.component.html',
  styleUrl: './exam-category.component.scss',
})
export class ExamCategoryComponent implements OnInit {
  
  isUpdateMode: boolean = false;
  examCategoryForm: FormGroup = new FormGroup({
    mainCategory: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    webName: new FormControl('', [Validators.required]),
    order: new FormControl(0, [Validators.required]),
    categoryURL: new FormControl('', [Validators.required]),
    isShowinApp: new FormControl('Yes', [Validators.required]),
    isShowinWeb: new FormControl('Yes', [Validators.required]),
    isShowCatURL: new FormControl('Yes', [Validators.required]),
  });

  dataObs: Observable<any> = of([]);
  tableCols: TableColType[] = [];
  editExamCategoryId: string = '';

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  mainCategoryListDropdown$: Observable<examMasterListIdnameModel[]> | undefined;

  constructor(
    private examCategoryService: examCategoryService,
    private toastrService: ToastrService,
    private examMasterService: examMasterService,
    private formUtil:FormsUtilsService,
    private destroyRef:DestroyRef
  ) {}

  ngOnInit(): void {
    this.mainCategoryListDropdown$ = this.examMasterService.getexamMasterListIdwithName();

    this.tableCols = [
      { title: 'Name', data: 'name', type: 'text' },
      { title: 'Order No', data: 'ordering', type: 'text' },
    ];

    this.mainCategory?.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(() => {
        const mainCategory = this.examCategoryForm.get('mainCategory')?.value;
        if(mainCategory){
          return this.examCategoryService.getExamCategoryList(mainCategory);
        }

        return of([]);
      })).subscribe((examCategoryList) => {
        this.dataObs = of(examCategoryList);
        
        setTimeout(() => {
          this.dttable?.reloadTable();
        });
      })
  }

  get mainCategory() {
    return this.examCategoryForm.get('mainCategory');
  }
  get Name() {
    return this.examCategoryForm.get('name');
  }
  get ordering() {
    return this.examCategoryForm.get('order');
  }
  get isShowinApp() {
    return this.examCategoryForm.get('isShowinApp');
  }
  get isShowinWeb() {
    return this.examCategoryForm.get('isShowinWeb');
  }
  get isShowCatURL() {
    return this.examCategoryForm.get('isShowCatURL');
  }
  get categoryURL() {
    return this.examCategoryForm.get('categoryURL');
  }

  get webName() {
    return this.examCategoryForm.get('webName');
  }

  isFormValid(){
    if(this.formUtil.checkValidationErrors(this.examCategoryForm, {
      mainCategory:'Main Category',
      name:'Category Name',
      webName: 'Category Web Name',
      order:'Exam Order No',
      categoryURL:'Banner URL',
      isShowinApp: 'Is Show On App',
      isShowinWeb: 'Is Show On Web',
      isShowCatURL: 'Show Banner In App'
    })){
      return false;
    }

    return true;
  }

  createExamCategory() {
    if(!this.isFormValid()) return;

    const Maincategory = this.mainCategory?.value;
    const Name = this.Name?.value;
    const Ordering = this.ordering?.value;
    const IsshowinApp = this.isShowinApp?.value;
    const IsshowinWeb = this.isShowinWeb?.value;
    const IsshowCatUrl = this.isShowCatURL?.value;
    const CategoryUrl = this.categoryURL?.value;
    const webName = this.webName?.value;

    this.examCategoryService.createExamCategory(
        Maincategory,
        Name,
        Ordering,
        IsshowinApp,
        IsshowinWeb,
        IsshowCatUrl,
        CategoryUrl,
        webName
      ).subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success('Create Exam Category Successfully !!','Create Exam Category');
          this.clearForm();
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  updateExamCategory(UpdateExamcatID: string) {
    if(!this.isFormValid()) return;

    const id = UpdateExamcatID;
    const Maincategory = this.mainCategory?.value;
    const Name = this.Name?.value;
    const Ordering = this.ordering?.value;
    const IsshowinApp = this.isShowinApp?.value;
    const IsshowinWeb = this.isShowinWeb?.value;
    const IsshowCatUrl = this.isShowCatURL?.value;
    const CategoryUrl = this.categoryURL?.value;
    const webName = this.webName?.value;

    this.examCategoryService.updateExamCategory(
        id,
        Maincategory,
        Name,
        Ordering,
        IsshowinApp,
        IsshowinWeb,
        IsshowCatUrl,
        CategoryUrl,
        webName
      )
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success('Upadte Exam Category Successfully !!','Update Exam Category');
          this.clearForm();
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  deleteCategory(data: any) {
    const id = data.id;

    this.examCategoryService.deleteExamCategory(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }

        this.toastrService.success('Delete Exam Category Successfully !!','Delete Exam Category');
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  clearForm() {
    this.isUpdateMode = false;
    this.editExamCategoryId = '';
    
    this.examCategoryForm.patchValue({
      name: '',
      order: 0,
      isShowinApp: 'Yes',
      isShowinWeb: 'Yes',
      isShowCatURL: 'Yes',
      categoryURL: '',
      webName: ''
    });
  }

  editCategory(data: any) {
    const id = data.id;

    this.examCategoryService.getExamCategorySingle(id).subscribe({
      next: (response) => {
        this.isUpdateMode = true;
        this.editExamCategoryId = id;

        this.examCategoryForm.patchValue({
          name: response.name,
          order: response.ordering,
          isShowinApp: response.isShowInApp ? 'Yes' : 'No',
          isShowinWeb: response.isShowInWeb ? 'Yes' : 'No',
          isShowCatURL: response.isShowCatURL ? 'Yes' : 'No',
          categoryURL: response.catURL,
          webName: response.webName
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }
}
