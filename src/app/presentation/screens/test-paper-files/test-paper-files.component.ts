import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TestPaperFilesService } from '../../../services/test-paper-fies-service';
import { ToastrService } from 'ngx-toastr';
import { TestCategoryService } from '../../../services/testcategory.sevice';
import { CommonListItemModel } from '../../../core/domain/common model';
import { TestsubCategoryService } from '../../../services/testsubcategory.service';


@Component({
  selector: 'app-test-paper-files',
  standalone: true,
  imports: [ReactiveFormsModule,DataTableComponent,AsyncPipe],
  templateUrl: './test-paper-files.component.html',
  styleUrl: './test-paper-files.component.scss'
})

export class TestPaperFilesComponent implements OnInit {

  isUpdateMode: boolean = false ;
  TestPaperFilesForm : FormGroup = new FormGroup({
    categoryid : new FormControl('',[Validators.required]),
    subCategoryid : new FormControl('',[Validators.required]),
    name : new FormControl('',[Validators.required]),
    testfile : new FormControl('',[Validators.required]),
    flag : new FormControl('',[Validators.required]),
    typename : new FormControl('',[Validators.required]),
    answerSheet : new FormControl('',[Validators.required]),
  });

tableCols: TableColType [] = [] ;
dataObs: Observable<any>|undefined;
editTestPaperFilesId : string = '' ; 

showTestFile : string = '' ;

@ViewChild('dttable') dttable : DataTableComponent | undefined 

CategoryListDropdown$ : Observable <CommonListItemModel[]> | undefined 

SubcategoryListDropdown$ : Observable <CommonListItemModel[]> | undefined 

constructor(private testPaperFilesService : TestPaperFilesService,
  private toasterService : ToastrService,
  private testcategoryservice : TestCategoryService,
  private testsubcategoryservice : TestsubCategoryService
){}

ngOnInit(): void {

  this.CategoryListDropdown$ = this.testcategoryservice.GetTestCategoryIdwithName() ;
  
  this.SubcategoryListDropdown$ = this.testsubcategoryservice.GetTestsubCategoryListIdwithName();

this.dataObs = this.testPaperFilesService.getTestPaperFilesList() ;

this.tableCols = [
  {title : 'Name', data : 'name', type :'text'},
  {title : 'Flag', data : 'flag', type :'text'},
  {title : 'Type Name', data:'typeName', type :'text'},
  {title :'Answer Sheet', data : 'ansSheet', type :'text'}
];
}

get CategoryID(){
  return this.TestPaperFilesForm.get('categoryid')
}

get SubcategoryID(){
  return this.TestPaperFilesForm.get('subCategoryid')
}

get Name(){
  return this.TestPaperFilesForm.get('name')
}

get TestFile(){
  return this.TestPaperFilesForm.get('testfile')
}

get Flag(){
  return this.TestPaperFilesForm.get('flag')
}

get TypeName(){
  return this.TestPaperFilesForm.get('typename')
}

get AnswerSheet(){
  return this.TestPaperFilesForm.get('answerSheet')
}

// onSelectCategory(){
//   this.SubcategoryListDropdown$ = this.testsubcategoryservice.GetTestsubCategoryListIdwithName();
// }


onTestFileUpload(event : any){
if(event.target.files.length> 0){
  const file = event?.target.files[0];
  this.TestPaperFilesForm.patchValue({
  'testfile' : file 
  }); 

  const reader = new FileReader() ;
  reader.onload = e => this.showTestFile = reader.result as string ;

  reader.readAsDataURL(file)

}

}


createTestPaperFiles() {
const categoryid = this.CategoryID?.value;
const subcategoryid = this.SubcategoryID?.value
const name = this.Name?.value;
const testfile = this.TestFile?.value;
const flag = this.Flag?.value ;
const typename = this.TypeName?.value;
const answersheet = this.AnswerSheet?.value;


this.testPaperFilesService.createTestPaperFiles(categoryid,subcategoryid,name,testfile,flag,typename,
  answersheet).subscribe({
    next : (response =>{
      if(this.dttable){
        this.dttable.reloadTable();
      }
    this.toasterService.success('Test Paper Fles Created Successfully','Test Paper Files Created');      
    }),
    error : (error =>{
      this.toasterService.error(error.message);
    })
  })

}

updateTestPaperFiles(TestPaperFilesUpdateID : string) {

const id = TestPaperFilesUpdateID ;
const categoryid = this.CategoryID?.value;
const subcategoryid = this.SubcategoryID?.value
const name = this.Name?.value;
const testfile = this.TestFile?.value;
const flag = this.Flag?.value ;
const typename = this.TypeName?.value;
const answersheet = this.AnswerSheet?.value;

this.testPaperFilesService.updateTestPaperFiles(id,categoryid,subcategoryid,name,testfile,flag,typename,
  answersheet).subscribe({
    next : (response =>{
      if(this.dttable){
        this.dttable.reloadTable();
      }
      this.toasterService.success('Test Paper Files Update Successfully', 'Test Paper Files Update');
    }),
    error : (error =>{
      this.toasterService.error(error.message);
    })
  })

}
  
deleteTestPaperFiles(data : any) {

  const id = data.id ;

  this.testPaperFilesService.deleteTestPaperFiles(id).subscribe({
    next : (response =>{
      if(this.dttable){
        this.dttable.reloadTable();
      }
      this.toasterService.success('Test Paper Files Deleted Successfully', 'Test Paper Files Delered');
    }),
    error : (error =>{
      this.toasterService.error(error.message);
    })
  })

}


editTestPaperFiles(data : any) {

  const id = data.id ;

  this.testPaperFilesService.getTestPaperFiles(id).subscribe({
    next : (response =>{

    this.editTestPaperFilesId = id ;
    this.isUpdateMode = true ;

    this.TestPaperFilesForm.patchValue({
    id : response.id ,
    categoryid : response.catId,
    subCategoryid : response.subCatId,
    name : response.name,
    testfile : null,
    flag : response.flag,
    typename : response.typeName,
    answerSheet : response.ansSheet 
    });
    }),
    error : (error =>{
      this.toasterService.error(error.message);
    })
  })

}

clearForm() {

  this.isUpdateMode = false ;
  this.editTestPaperFilesId = '';
  this.TestPaperFilesForm.reset();

}
}
