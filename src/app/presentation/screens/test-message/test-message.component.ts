import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { TestmessageService } from '../../../services/testmessage.service';
import { ToastrService } from 'ngx-toastr';
import { ExamtypeService } from '../../../services/exam-type.service';
import { IdExamTypeListModel } from '../../../core/domain/Exam type/id-ExamtypeList.model';

@Component({
  selector: 'app-test-message',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,DataTableComponent,AsyncPipe],
  templateUrl: './test-message.component.html',
  styleUrl: './test-message.component.scss'
})

export class TestMessageComponent implements OnInit {

  isUpdateMode : boolean = false ;
  TestMessageForm : FormGroup = new FormGroup({
    examtypeid : new FormControl('',[Validators.required]),
    title : new FormControl('',[Validators.required]),
    message : new FormControl('',[Validators.required]),
    link : new FormControl('',[Validators.required]),
    loginRequired : new FormControl('Yes',[Validators.required]),
    });

dataObs : Observable<any>|undefined;
tableCols : TableColType [] = [] ;
editTestMessageId : string = '';

@ViewChild('dttable') dttable : DataTableComponent | undefined

ExamtypeListDropdown$ : Observable <IdExamTypeListModel[]> | undefined

constructor(private testmessageservice:TestmessageService,
  private toasterservice : ToastrService,
  private examtypeService : ExamtypeService
){}


ngOnInit(): void {

  // this.ExamtypeListDropdown$ = this.examtypeService.getExamTypeIdwithName()

  this.dataObs = this.testmessageservice.getTestmessageList();
this.tableCols = [
{title : 'Title', data : 'title', type :'text'},
{title : 'Message', data : 'message', type : 'text'},
];
}

get Examtype(){
  return this.TestMessageForm.get('examtypeid')
}

get Title(){
  return this.TestMessageForm.get('title')
}

get Message(){
  return this.TestMessageForm.get('message')
}

get Link(){
  return this.TestMessageForm.get('link')
}

get LoginRequired(){
return this.TestMessageForm.get('loginRequired')
}

createTestMessage() {

  const examtypeid = this.Examtype?.value;
  const title = this.Title?.value;
  const message = this.Message?.value;
  const link = this.Link?.value;
  const isLoginrequired = this.LoginRequired?.value;

this.testmessageservice.createTestmessage(examtypeid,title, message,link,isLoginrequired).subscribe({
  next : (response =>{
    if (this.dttable){
      this.dttable.reloadTable();
    }
    this.toasterservice.success('Test Message Created Successfully', 'Test Message Created');
  }),
  error : (error =>{
    this.toasterservice.error(error.message);
  })
})


  }

  updateTestMessage( TestMessageUpdateID : string) {

    const id = TestMessageUpdateID ;
    const examtypeid = this.Examtype?.value;
    const title = this.Title?.value;
    const message = this.Message?.value;
    const link = this.Link?.value;
    const loginrequired = this.LoginRequired?.value;
  
  this.testmessageservice.updateTestmessage(id,examtypeid,title,message,link,loginrequired).subscribe({
    next : (response =>{
      if(this.dttable){
        this.dttable.reloadTable();
      }
      this.toasterservice.success('Test Message Update Successfully', 'Test Message Updated');
    }),
    error : (error =>{
      this.toasterservice.error(error.message);
    })
  })
  
  }
  
deleteTestMessage(data : any) {

const id = data.id ;

this.testmessageservice.deleteTestmessage(id).subscribe({
  next : (response =>{
    if(this.dttable){
      this.dttable.reloadTable();
    }
  this.toasterservice.success('Test Message Delete Successfully', 'Test Message Deleted')
  }),
  error : (error =>{
    this.toasterservice.error(error.message);
  })
})


}
editTestMessage(data : any) {

const id = data.id ;

this.testmessageservice.getTestmessage(id).subscribe({
  next : (response =>{

    this.editTestMessageId = id ;
    this.isUpdateMode = true ;

this.TestMessageForm.patchValue({
  id : response.id,
  examtypeid : response.examTypeId,
  title : response.title,
  message : response.message,
  link : response.link,
  loginRequired : response.isLoginRequired ? "Yes" : "No",
});

  }),
  error : (error =>{
    this.toasterservice.error(error.message);
  })
})

}
clearForm() {

  this.editTestMessageId = '';
  this.isUpdateMode = false ;
  this.TestMessageForm.reset() ;

}


}
