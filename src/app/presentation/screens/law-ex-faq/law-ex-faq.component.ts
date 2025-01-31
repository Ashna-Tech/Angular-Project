import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { LawExFAQService } from '../../../services/law-ex-faq.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'jquery';


@Component({
  selector: 'app-law-ex-faq',
  standalone: true,
  imports: [ReactiveFormsModule,DataTableComponent,AsyncPipe],
  templateUrl: './law-ex-faq.component.html',
  styleUrl: './law-ex-faq.component.scss'
})

export class LawExFaqComponent implements OnInit {

  isUpdateMode : boolean = false ;
  LawExFaqForm : FormGroup = new FormGroup({
    mid : new FormControl('',[]),
    question : new FormControl('',[]),
    answer : new FormControl('',[]),
  });

dataObs : Observable<any>|undefined;
tableCols : TableColType [] = [] ;
editLawExFaqId: string = '';


@ViewChild('dttable') dttable : DataTableComponent | undefined 

MidListDropdown$ : Observable <any[]> | undefined 

constructor(private lawExamfaqservice : LawExFAQService,
  private toastrservice : ToastrService
){}

ngOnInit(): void {
  
this.dataObs = this.lawExamfaqservice.getLawExfAQList() ;

this.tableCols = [
{title : 'Questions', data : 'question', type :'text'},
{title :'Answers', data :'answer', type : 'text'},
];
}

get Mid(){
  return this.LawExFaqForm.get('mid')
}

get Question(){
  return this.LawExFaqForm.get('question')
}

get Answer(){
  return this.LawExFaqForm.get('answer')
}


createLawExFaq() {

  const mid = this.Mid?.value;
  const question = this.Question?.value;
  const answer = this.Answer?.value;

 this.lawExamfaqservice.createLawExfAQ(mid,question,answer).subscribe({
  next : (response =>{
    if(this.dttable){
      this.dttable.reloadTable();
    }
    this.toastrservice.success('Law Exam fAQ Create Successfully', 'Law Exam FAQ Created');
  }),
  error : (error =>{
    this.toastrservice.error(error.message);
  })
 })
  
  }

  updateLawExFaq(LawExFaqUpdateid : string) {
 
    const id = LawExFaqUpdateid ;
    const mid = this.Mid?.value ;
    const question = this.Question?.value;
    const answer = this.Answer?.value; 
 
   this.lawExamfaqservice.updateLawExfAQ(id,mid,question,answer).subscribe({
    next : (response =>{
      if(this.dttable){
        this.dttable.reloadTable();
      }
      this.toastrservice.success('Law Exam fAQ Update Successfully', 'Law Exam FAQ Update');
    }),
    error : (error =>{
      this.toastrservice.error(error.message);
    })
   })
   
    }

    deleteLawExFaq(data : any) {
      
      const id = data.id ;

      this.lawExamfaqservice.deleteLawExfAQ(id).subscribe({
        next : (response =>{
          if(this.dttable){
            this.dttable.reloadTable();
          }
          this.toastrservice.success('Law Exam FAQ Delete Successfully', 'Law Exam FAQ Deleted');
        }),
        error : (error =>{
          this.toastrservice.error(error.message);
        })
      })

      }


editLawExFaq(data : any) {
  
  const id = data.id ;

  this.lawExamfaqservice.getLawExfAQ(id).subscribe({
    next : (response =>{

    this.editLawExFaqId = id ;
    this.isUpdateMode = true ;

    this.LawExFaqForm.patchValue({
     id : response.id,
     mid : response.mId,
     question : response.question,
     answer : response.answer,
    })
    }),
    error : (error =>{
      this.toastrservice.error(error.message);
    })
  })
}

clearForm() {

this.editLawExFaqId = '';
this.isUpdateMode = false ;
this.LawExFaqForm.reset();
 
}

}
