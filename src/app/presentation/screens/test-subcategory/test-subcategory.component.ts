import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { AsyncPipe } from '@angular/common';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable } from 'rxjs';
import { TestsubCategoryService } from '../../../services/testsubcategory.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'jquery';
import { CategoryService } from '../../../services/category.service';
import { CommonListItemModel } from '../../../core/domain/common model';

@Component({
  selector: 'app-test-subcategory',
  standalone: true,
  imports: [ReactiveFormsModule, DataTableComponent, AsyncPipe],
  templateUrl: './test-subcategory.component.html',
  styleUrl: './test-subcategory.component.scss',
})
export class TestSubcategoryComponent implements OnInit {

  isUpdateMode: boolean = false;
  testSubcategoryForm: FormGroup = new FormGroup({
    categoryid: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    flag: new FormControl('', [Validators.required]),
  });

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];
  editTestsubcategoryId: string = '';

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  CategoryListDropdown$: Observable<CommonListItemModel[]> | undefined;

  constructor(
    private testsubcateservice: TestsubCategoryService,
    private toastrservice: ToastrService,
    private categoryservice : CategoryService
  ) {}

  ngOnInit(): void {

    this.CategoryListDropdown$ = this.categoryservice.getCategoryListIDwithName();

    this.dataObs = this.testsubcateservice.GetTestsubCategoryList();

    this.tableCols = [
      { title: 'Name', data: 'name', type: 'text' },
      { title: 'Flag', data: 'flag', type: 'text' },
    ];
  }

  get CategoryID() {
    return this.testSubcategoryForm.get('categoryid');
  }

  get Name() {
    return this.testSubcategoryForm.get('name');
  }

  get Flag() {
    return this.testSubcategoryForm.get('flag');
  }

  createTestsubcategory() {
    const categoryid = this.CategoryID?.value;
    const name = this.Name?.value;
    const flag = this.Flag?.value;

    this.testsubcateservice
      .CreateTestsubCategory(categoryid, name, flag)
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }

          this.toastrservice.success(
            'Test Subcategory Created Successfully',
            'Create Test Subcategory'
          );
        },
        error: (error) => {
          this.toastrservice.error(error.message);
        },
      });
  }

  updateTestsubcategory(TestsubcatID: string) {
    const id = TestsubcatID;
    const categoryid = this.CategoryID?.value;
    const name = this.Name?.value;
    const flag = this.Flag?.value;

    this.testsubcateservice
      .UpdateTestsubCategory(id, categoryid, name, flag)
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrservice.success(
            'Test SubCategory Update Successfully',
            'Test Subcategory Updated'
          );
        },
        error: (error) => {
          this.toastrservice.error(error.message);
        },
      });
  }

  deleteTestsubcategory(data: any) {
    const id = data.id;

    this.testsubcateservice.DeleteTestsubCategory(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrservice.success(
          'Test Subcategory Deleted Successfully',
          'Test Subcategory Deleted'
        );
      },
      error: (error) => {
        this.toastrservice.error(error.message);
      },
    });
  }

  editTestsubcategory(data: any) {
    const id = data.id;

    this.testsubcateservice.GetTestsubCategory(id).subscribe({
      next: (response) => {
        this.editTestsubcategoryId = id;
        this.isUpdateMode = true;

        this.testSubcategoryForm.patchValue({
          id: response.id,
          categoryid: response.catId,
          name: response.name,
          flag: response.flag,
        });
      },
      error: (error) => {
        this.toastrservice.error(error.message);
      },
    });
  }
  clearForm() {
    this.editTestsubcategoryId = '';
    this.isUpdateMode = false;
    this.testSubcategoryForm.reset();
  }
}
