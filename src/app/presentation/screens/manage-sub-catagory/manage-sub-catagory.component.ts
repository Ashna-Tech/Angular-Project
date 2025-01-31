import { Component, DestroyRef, OnInit, ViewChild } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { Observable, of } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { subCategoryService } from '../../../services/subCategory.service';
import { AsyncPipe } from '@angular/common';
import { CategoryService } from '../../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { CommonListItemModel } from '../../../core/domain/common model';
import { FormsUtilsService } from '../../../services/formsUtils.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-manage-sub-catagory',
  standalone: true,
  templateUrl: './manage-sub-catagory.component.html',
  styleUrl: './manage-sub-catagory.component.scss',
  imports: [FormsModule, ReactiveFormsModule, DataTableComponent, AsyncPipe],
})
export class ManageSubCatagoryComponent implements OnInit {
  isUpdateMode: boolean = false;

  subCategoryForm: FormGroup = new FormGroup({
    Catid: new FormControl('', [Validators.required]),
    Name: new FormControl('', [Validators.required]),
  });

  dataObs: Observable<any> = of([]);
  tableCols: TableColType[] = [];
  editSubCatagoryId: string = '';

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  categoryDropDown$: Observable<CommonListItemModel[]> | undefined;

  subcatTypeListDropDown$: Observable<any> | undefined;

  constructor(
    private subCategoryService: subCategoryService,
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private formUtilService: FormsUtilsService,
    private destroyRef:DestroyRef
  ) {}

  ngOnInit(): void {
    this.tableCols = [
      { title: 'Name', data: 'name', type: 'text' },
      { title: 'Category Name', data: 'catName', type: 'text' },
      { title: 'Active Status', data: 'isActive', type: 'toggle' },
    ];

    this.categoryDropDown$ = this.categoryService.getCategoryListIDwithName();
    this.catId?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.dataObs = this.subCategoryService.getSubCategoryList(this.catId?.value);
      setTimeout(() => {
        this.dttable?.reloadTable();
      });
    });
  }

  get catId() {
    return this.subCategoryForm.get('Catid');
  }

  get name() {
    return this.subCategoryForm.get('Name');
  }

  createSubCategory() {
    if(this.formUtilService.checkValidationErrors(this.subCategoryForm, {
      Catid: 'Category',
      Name: 'Name',
    })) return;

    const CategoryId = this.catId?.value;
    const Name = this.name?.value;

    this.subCategoryService.createSubCategory(CategoryId, Name).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success('Manage Sub Category Created Successfully','Created Manage SubCategory');
        this.clearForm();
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  updateSubCategory(_subCategoryId: string) {
    if(this.formUtilService.checkValidationErrors(this.subCategoryForm, {
      Catid: 'Category',
      Name: 'Name',
    })) return;

    const id = _subCategoryId;
    const categoryid = this.catId?.value;
    const name = this.name?.value;

    this.subCategoryService.updateSubCategory(id, categoryid, name).subscribe({
      next: (response) => {
        if (this.dttable) this.dttable.reloadTable();
        this.toastrService.success('Update Subcategory Successfully !!','Update Subcategory');
        this.clearForm();
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  deleteSubCategory(data: any) {
    const id = data.id;

    this.subCategoryService.removeSubCategory(id).subscribe({
      next: (response) => {
        if (this.dttable) this.dttable.reloadTable();
        this.toastrService.success(
          'Delete Subcategory Succesfully!!',
          'Delete subcategory'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }
  
  clearForm() {
    this.editSubCatagoryId = '';
    this.isUpdateMode = false;
    this.subCategoryForm.patchValue({
      Name:''
    });
  }

  editSubCategory(data: any) {
    const id = data.id;

    this.subCategoryService.getSubcategorySingle(id).subscribe({
      next: (response) => {
        this.isUpdateMode = true;
        this.editSubCatagoryId = id;

        this.subCategoryForm.patchValue({
          id: response.id,
          Catid: response.catId,
          Name: response.name,
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }
}
