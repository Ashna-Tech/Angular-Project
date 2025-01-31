import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { examMasterListIdnameModel } from '../../../core/domain/exam-master-category/exam-masterList-Id-name.model';
import { examMasterService } from '../../../services/exam-master.service';
import { ExamMasterCategoryModel } from '../../../core/domain/exam-master-category/exam-master-category.model';
import { DataTableEventType } from '../../../core/domain/datatable/DataTableEventType.model';
import { FormsUtilsService } from '../../../services/formsUtils.service';

@Component({
  selector: 'app-exam-master-category',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, DataTableComponent],
  templateUrl: './exam-master-category.component.html',
  styleUrl: './exam-master-category.component.scss',
})

export class ExamMasterCategoryComponent implements OnInit {
  isUpdateMode: boolean = false;
  examCategoryForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];
  editExamCategoryId: string = ' ';
  updateExamMasterCategory: ExamMasterCategoryModel | null = null;

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  mainCategoryListDropdown$: Observable<examMasterListIdnameModel[]> | undefined;

  constructor(
    private toastrService: ToastrService,
    private examMasterService: examMasterService,
    private formUtils:FormsUtilsService
  ) {}

  ngOnInit(): void {
    this.mainCategoryListDropdown$ = this.examMasterService.getexamMasterListIdwithName();

    this.tableCols = [
      { title: 'Name', data: 'name', type: 'text' },
      { title: 'Is ShowInApp', data: 'isShowInApp', type: 'toggle2', method:this.onIsShowInAppActive.bind(this)},
      { title: 'Is Active', data: 'isActive', type: 'toggle' },
    ];

    this.dataObs = this.examMasterService.getExamMasterCategoryList();
  }

  get Name() {
    return this.examCategoryForm.get('name');
  }

  createExamCategory() {
    if(this.formUtils.checkValidationErrors(this.examCategoryForm, {
      name:'Category Name'
    })){ return; }

    const Name = this.Name?.value;

    this.examMasterService.createExamMasterCategory(Name).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }

        this.toastrService.success('Create Exam Category Successfully !!', 'Create Exam Category');
        this.clearForm();
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  updateExamCategory() {
    if(this.formUtils.checkValidationErrors(this.examCategoryForm, {
      name:'Category Name'
    })){ return; }

    if (this.updateExamMasterCategory) {
      const Name = this.Name?.value;
      const category: ExamMasterCategoryModel = {
        ...this.updateExamMasterCategory,
        name: Name,
      };

      this.examMasterService.updateExamMasterCategory(category).subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success('Update Exam Category Successfully !!','Update Exam Category');
          this.clearForm();
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
    }else{
      this.toastrService.error('Invalid Form!');
    }
  }

  deleteCategory(data: any) {
    const id = data.id;

    this.examMasterService.deleteExamMasterCategory(id).subscribe({
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
    this.examCategoryForm.reset();
    this.updateExamMasterCategory = null;
  }

  editCategory(data: any) {
    const id = data.id;

    this.examMasterService.getExamMasterCategoryBYId(id).subscribe({
      next: (response) => {
        this.isUpdateMode = true;
        this.editExamCategoryId = id;
        this.updateExamMasterCategory = response;

        this.examCategoryForm.patchValue({
          name: response.name,
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  onToggleActive(data:ExamMasterCategoryModel){
    const category: ExamMasterCategoryModel = {
      ...data,
      isActive:!data.isActive
    };

    this.examMasterService.updateExamMasterCategory(category).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success('Upadte Exam Category Successfully !!','Update Exam Category');
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  
  onIsShowInAppActive(data:DataTableEventType){
    const examMasterCategory:ExamMasterCategoryModel = data.data;
    const category: ExamMasterCategoryModel = {
      ...examMasterCategory,
      isShowInApp:!examMasterCategory.isShowInApp
    };

    this.examMasterService.updateExamMasterCategory(category).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success('Upadte Exam Category Successfully !!','Update Exam Category');
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }
}
