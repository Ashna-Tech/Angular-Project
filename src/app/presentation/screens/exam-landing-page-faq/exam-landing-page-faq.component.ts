import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { ExamLandingPageFaqService } from '../../../services/examLandingPageFaq.service';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exam-landing-page-faq',
  standalone: true,
  imports: [ReactiveFormsModule, DataTableComponent, AsyncPipe],
  templateUrl: './exam-landing-page-faq.component.html',
  styleUrl: './exam-landing-page-faq.component.scss',
})
export class ExamLandingPageFaqComponent implements OnInit {
  isUpdateMode: any;
  ExamLandingPageFAQForm: FormGroup = new FormGroup({
    pageid : new FormControl('',[Validators.required]),
    question : new FormControl('',[Validators.required]),
    answer : new FormControl('',[Validators.required]),
    orderNo : new FormControl('',[Validators.required])
  });

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];
  editExamLandingPageFAQId: string = '';

@ViewChild('dttable') dttable : DataTableComponent | undefined

  PageListDropdown$: Observable<any[]> | undefined;

constructor(private ExamlandingPageFAQservice :ExamLandingPageFaqService,

  private toastrservice : ToastrService
){}

ngOnInit(): void {
  
  this.dataObs = this.ExamlandingPageFAQservice.getExamLandingPageFaqList();

  this.tableCols = [
{title :'Question', data : 'question', type :'text'},
{title :'Answer', data :'answer', type :'text'},
{title :'Order No.', data :'orderNo', type :'text'}
  ];
}

get PageID(){
 return this.ExamLandingPageFAQForm.get('pageid')
}

get Question(){
  return this.ExamLandingPageFAQForm.get('question')
}

get Answer(){
  return this.ExamLandingPageFAQForm.get('answer')
}
  get OrderNumber(){
    return this.ExamLandingPageFAQForm.get('orderNo')
  }

  
  createExamLandingPageFAQ() {
    
const pageid = this.PageID?.value;
const question = this.Question?.value;
const answer = this.Answer?.value;
const orderno = this.OrderNumber?.value


this.ExamlandingPageFAQservice.CreateExamLandingPageFaq(pageid,question,answer,orderno).subscribe({
  next : (response =>{
   if(this.dttable){
    this.dttable.reloadTable();
   }
   this.toastrservice.success('Exam Landing Page FAQ Created Successfully','Exam Landing Page FAQ Created')
  }),
  error : (error =>{
    this,this.toastrservice.error(error.message);
  })
})
  }

  updateExamLandingPageFAQ(ExamLandingPageFaqUpdateID: string) {
   
    const id = ExamLandingPageFaqUpdateID ;
    const pageid = this.PageID?.value;
    const question = this.Question?.value;
    const answer = this.Answer?.value;
    const orderno = this.OrderNumber?.value;

    this.ExamlandingPageFAQservice.UpdateExamLandingPageFaq(id,pageid,question,answer,orderno).subscribe({
      next : (response =>{
        if(this.dttable){
          this.dttable.reloadTable();
        }
        this.toastrservice.success('Exam Landing Page FAQ Updated Successfully','Exam Landing Page FAQ Updated');
      }),
      error : (error =>{
        this.toastrservice.error(error.message);
      })
    })

  }

  deleteExamLandingPageFAQ(data : any) {
  
const id = data.id;

this.ExamlandingPageFAQservice.DeleteExamLandingPageFaq(id).subscribe({
  next : (response =>{
    if (this.dttable){
      this.dttable.reloadTable();
    }
    this.toastrservice.success('Exam Landing Page FAQ Deleted Successfully','Exam Landing Page FAQ Deleted')
  }),
  error : (error =>{
    this.toastrservice.error(error.message);
  })
})

  }
  editExamLandingPageFAQ(data : any) {
    
    const id = data.id ;

    this.ExamlandingPageFAQservice.GetExamLandingPageFaq(id).subscribe({
      next : (response =>{

this.editExamLandingPageFAQId = id ;
this.isUpdateMode = true;


this.ExamLandingPageFAQForm.patchValue({
  id : response.id ,
  pageid : response.pageId,
  question : response.question,
  answer : response.answer,
  orderNo : response.orderNo
})

      }),
      error : (error =>{
        this.toastrservice.error(error.message);
      })
    })


  }
  clearForm() {
    
    this.editExamLandingPageFAQId = '',
    this.isUpdateMode = false,
    this.ExamLandingPageFAQForm.reset();

  }

  


}

