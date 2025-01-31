import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { Observable } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { TestCategoryService } from '../../../services/testcategory.sevice';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test-category',
  standalone: true,
  imports: [ReactiveFormsModule,DataTableComponent,],
  templateUrl: './test-category.component.html',
  styleUrl: './test-category.component.scss'
})

export class TestCategoryComponent implements OnInit {

  isUpdateMode: boolean = false ; 
  testCategoryForm : FormGroup = new FormGroup({
    name : new FormControl('',[Validators.required]), 
    flag : new FormControl('',[Validators.required]),
  });

dataObs: Observable<any>|undefined;
tableCols: TableColType [] = [] ;
editTestCategoryId: string = '';

@ViewChild('dttable') dttable : DataTableComponent | undefined

constructor( private TestCategoryservice : TestCategoryService,
  private toastrService :ToastrService
){}

ngOnInit(): void {
  
  this.dataObs = this.TestCategoryservice.GetTestCategoryList();

  this.tableCols = [
    {title :'Name', data : 'name', type :'text'},
    {title : 'Flag', data : 'flag', type : 'text'}
  ];

}

get Name(){
  return this.testCategoryForm.get('name')
}

get Flag(){
  return this.testCategoryForm.get('flag')
}

createTestCategory() {

const name = this.Name?.value;
const flag = this.Flag?.value;

this.TestCategoryservice.CreateTestCategory(name, flag).subscribe({
  next : (response =>{
    if(this.dttable){
      this.dttable.reloadTable();
    }
    this.toastrService.success('Test Category Created Successfully', 'Create Test Category');

  }),
  error : (error =>{
    this.toastrService.error(error.message);
  })
})

  }
  
  updateTestCategory(testCatUpdateID: string) {
   
    const id = testCatUpdateID ;
    const name = this.Name?.value;
    const flag = this.Flag?.value;

    this.TestCategoryservice.UpdateTestCategory(id,name,flag).subscribe({
      next : (response =>{
        if(this.dttable){
          this.dttable.reloadTable();
        }
        this.toastrService.success('Test Category Updated Successfully', 'Update Test Category')
      }),
      error : (error =>{
        this.toastrService.error(error.message);
      })
    })


    }
    
deleteTestCategory(data : any) {

  const id = data.id ;

  this.TestCategoryservice.DeleteTestCategory(id).subscribe({
    next : (response =>{
      if (this.dttable){
        this.dttable.reloadTable();
      }
      this.toastrService.success('Test Category Deleted Successfully','Delete Test Category');
    }),
    error : (error =>{
      this.toastrService.error(error.message);
    })
  })


}


editTestCategory(data : any) {

  const id = data.id ;

  this.TestCategoryservice.GetTestCategory(id).subscribe({
    next : (response =>{

this.editTestCategoryId = id ;
this.isUpdateMode = true ;


this.testCategoryForm.patchValue({
  id : response.id ,
  name : response.name,
  flag : response.flag
})

    }),
    error : (error =>{
      this.toastrService.error(error.message);
    })
  })
  
}
clearForm() {

  this.editTestCategoryId = '',
  this.isUpdateMode = false ,
  this.testCategoryForm.reset();

}
}
