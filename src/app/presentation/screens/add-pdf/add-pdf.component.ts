import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable, of } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-add-pdf',
  standalone: true,
  imports: [ReactiveFormsModule,DataTableComponent,DataTableComponent,AsyncPipe,CommonModule,FormsModule],
  templateUrl: './add-pdf.component.html',
  styleUrl: './add-pdf.component.scss',
})
export class AddPdfComponent implements OnInit {

  isUpdateMode: boolean = false;

  AddPdfsForm: FormGroup;

  constructor(private fb: FormBuilder, private categoryservice : CategoryService) {
    this.AddPdfsForm = this.fb.group({
      category: this.fb.control('', []),
      title: this.fb.control('', [Validators.required]),
      pdf: this.fb.control('null', [Validators.required]),
      rows: this.fb.array([]),
    })
  }

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];
  editAddPDFsId: string = '';


  showpdfNameFile: string = "";


  rows: Array<{ title: string; pdf: File | null }> = [];

  CategoryListDropdown$: Observable<any[]> | undefined;


  get Category() {
    return this.AddPdfsForm.get('category');
  }

  get Title() {
    return this.AddPdfsForm.get('title');
  }

  get PDF() {
    return this.AddPdfsForm.get('pdf')
  }

  get Rows() {
    return this.AddPdfsForm.get('rows') as FormArray;
  }

  addRows(): void {
    this.rows.push({ title: '', pdf: null });
  }


  removeRow(index: number): void {
    this.rows.splice(index, 1);
  }


  onPdfFileUpload(event: Event, row: { title: string; pdf: File | null }): void {

    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      row.pdf = file;
      this.AddPdfsForm.patchValue({
        'pdf': file
      });

      const reader = new FileReader();
      reader.onload = () => {
        this.showpdfNameFile = reader.result as string;
      };

      reader.readAsDataURL(file);

    }

  }


  ngOnInit(): void {
    this.CategoryListDropdown$ = this.categoryservice.getCategoryListIDwithName(); 
    this.dataObs = of([]);
  }

  clearForm() {
    throw new Error('Method not implemented.');
  }
  updateAddPDFs(arg0: any) {
    throw new Error('Method not implemented.');
  }
  createAddPDFs() {
    throw new Error('Method not implemented.');
  }

  deleteAddPDFs($event: any) {
    throw new Error('Method not implemented.');
  }
  editAddPDFs($event: any) {
    throw new Error('Method not implemented.');
  }
}
