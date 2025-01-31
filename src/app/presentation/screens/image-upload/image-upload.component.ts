import { Component,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadService } from '../../../services/imageUpload.service';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule , FormGroup,FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';



@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, DataTableComponent],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss'
})
export class ImageUploadComponent {

  imageForm!: FormGroup ;
  dataObs: Observable<any> | undefined = of([]);
  tableCols: TableColType[] = [];

  @ViewChild('dttable') DtTable : DataTableComponent | undefined;

  constructor(
    private fb: FormBuilder, 
    private mainService:ImageUploadService,
    private toastrService: ToastrService
    ){}
  
  ngOnInit(): void {
    this.imageForm = this.fb.group({
      images: this.fb.array([]),
      imageInput: new FormControl('') 
    });

    this.tableCols = [
      { title: 'Name', data: 'name', type: 'text' },
      { title: 'Url', data: 'url', type: 'text' },
    ]
  }

  uploadImages(){
    const formdata = this.prepareFormData();

    this.mainService.uploadImages(formdata).subscribe({
      next : (response =>{
        if(this.DtTable){
          this.DtTable.reloadTable();
        }
        this.toastrService.success('Image Upload Successfully','Image Upload');
      }),
      error : (error =>{
        this.toastrService.error(error.message);
      })
    })

  }
  

  get imageArray(): FormArray {
    return this.imageForm.get('images') as FormArray;
  }

  onFileChange(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.imageArray.push(this.fb.group({ file: files[i] }));
    }
  }

  prepareFormData(): FormData {
    const formData = new FormData();
    const images = this.imageArray.controls;

    for (let i = 0; i < images.length; i++) {
      const file = images[i].get('file')?.value;
      if(file){
        formData.append('images', file);
      }
    }

    return formData;
  }

  removeImage(index: number) {
    this.imageArray.removeAt(index);
  }










}























  

