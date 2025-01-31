import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { Observable } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { CategoryService } from '../../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { FormsUtilsService } from '../../../services/formsUtils.service';

@Component({
  selector: 'app-manage-category',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, DataTableComponent],
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.scss',
})

export class ManageCategoryComponent implements OnInit {
  isUpdateMode: boolean = false;
  categoryForm: FormGroup = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    ImageIcon: new FormControl('', []),
    ImageIconSource: new FormControl('', []),
    IconBackColor: new FormControl('#000000', [Validators.required]),
    ShortName: new FormControl('', [Validators.required]),
  });

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];
  editCategoryId: string = '';

  previewImageIcon: string = '';

  @ViewChild('dttable') dttable: DataTableComponent | undefined;
  id: any;

  constructor(
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private formUtilService:FormsUtilsService
  ) {}

  ngOnInit(): void {
    this.dataObs = this.categoryService.getCategoryList();
    this.tableCols = [
      { title: 'Name', data: 'name', type: 'text'},
      { title: 'Image Icon', data: 'imageIcon', type: 'text', width:'150px'},
      { title: 'Icon Back Color', data: 'iconBackColor',  type: 'renderF', width: '120px',
        renderF: function (data: any, type: any, row: any) {
          return `<p style="margin-bottom:0;">${row.iconBackColor}</p><span style="display:block;background-color:${row.iconBackColor};width:100%;height:10px;"></span>`;
        }, 
      },
      { title: 'Short Name', data: 'shortName', type: 'text', width:'120px' },
    ];
  }

  get CategoryName() {
    return this.categoryForm.get('Name');
  }

  get ImageIcon() {
    return this.categoryForm.get('ImageIcon');
  }
  get ImageIconSource() {
    return this.categoryForm.get('ImageIconSource');
  }

  get IconBackColor() {
    return this.categoryForm.get('IconBackColor');
  }
  get ShortName() {
    return this.categoryForm.get('ShortName');
  }

  createCategory() {
    if(this.formUtilService.checkValidationErrors(this.categoryForm, {
      Name: 'Name',
      ImageIcon: 'Image Icon',
      ImageIconSource: 'Image Icon Source',
      IconBackColor: 'Icon Background Color',
      ShortName: 'Short Name',
    })) return;

    const Name = this.CategoryName?.value;
    const ImageIcon = this.ImageIconSource?.value;
    const IconBackColor = this.IconBackColor?.value;
    const ShortName = this.ShortName?.value;

    this.categoryService
      .createCategory(Name, ImageIcon, IconBackColor, ShortName)
      .subscribe({
        next: (response) => {
          this.clearForm();
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success('Category Created successfully!!','Create Category');
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  onImageIcon(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.categoryForm.patchValue({
        ImageIconSource: file,
      });
      const reader = new FileReader();
      reader.onload = (e) => (this.previewImageIcon = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  updateCategory(_categoryID: string) {
    if(this.formUtilService.checkValidationErrors(this.categoryForm, {
      Name: 'Name',
      ImageIcon: 'Image Icon',
      ImageIconSource: 'Image Icon Source',
      IconBackColor: 'Icon Background Color',
      ShortName: 'Short Name',
    })) return;

    const id = _categoryID;
    const name = this.CategoryName?.value;
    const imageIcon = this.ImageIconSource?.value;
    const iconBackColor = this.IconBackColor?.value;
    const shortName = this.ShortName?.value;

    this.categoryService
      .updateCategory(id, name, imageIcon, iconBackColor, shortName)
      .subscribe({
        next: (response) => {
          this.clearForm();
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Category Updated Successfully!!',
            'Update Category'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  clearForm() {
    this.editCategoryId = '';
    this.isUpdateMode = false;
    this.previewImageIcon = '';
    this.categoryForm.reset();
  }

  editCategory(data: any) {
    const id = data.id;

    this.categoryService.getCategoryDetails(id).subscribe({
      next: (response) => {
        this.editCategoryId = id;
        this.isUpdateMode = true;
        this.previewImageIcon = '';

        this.categoryForm.patchValue({
          id: response.id,
          Name: response.name,
          ImageIcon: '',
          ImageIconSource: null,
          IconBackColor: response.iconBackColor,
          ShortName: response.shortName,
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  deleteCategory(data: any) {
    const id = data.id;

    this.categoryService.removeCategory(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success('Category Deleted Successfully !!','Delete Category');
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }
}
