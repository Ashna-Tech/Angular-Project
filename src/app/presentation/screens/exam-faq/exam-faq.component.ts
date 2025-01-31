


import { AsyncPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable, of } from 'rxjs';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { ExamFAQService } from '../../../services/exam-FAQ-service';
import { ToastrService } from 'ngx-toastr';
import { examCategoryService } from '../../../services/exam-category.service';
import { examMasterService } from '../../../services/exam-master.service';
import { ExamtypeService } from '../../../services/exam-type.service';
import { examMasterListIdnameModel } from '../../../core/domain/exam-master-category/exam-masterList-Id-name.model';
import { CommonListItemModel } from '../../../core/domain/common model';
import { IdExamTypeListModel } from '../../../core/domain/Exam type/id-ExamtypeList.model';

@Component({
  selector: 'app-exam-faq',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,AsyncPipe,DataTableComponent],
  templateUrl: './exam-faq.component.html',
  styleUrl: './exam-faq.component.scss'
})

export class ExamFaqComponent implements OnInit {

  isUpdateMode : boolean = false ;
  ExamFAQForm : FormGroup = new FormGroup({
    maincategory : new FormControl('',[]),
    examCategory : new FormControl('',[]),
    examid : new FormControl('',[Validators.required]),
    question : new FormControl('',[Validators.required]),
    answer : new FormControl('',[Validators.required]),
    orderno : new FormControl('0',[Validators.required]),
  });

dataObs: Observable<any>|undefined = of([]);
tableCols : TableColType [] = [] ;
editExamFAQId : string = '';

@ViewChild('dttable') dttable : DataTableComponent | undefined  

MainCategoryListDropdown$ : Observable <examMasterListIdnameModel[]> | undefined 

ExamCategoryListDropdown$ : Observable <CommonListItemModel[]> | undefined 

ExamListDropdown$ : Observable <IdExamTypeListModel[]> | undefined 

constructor(private examFAQservice : ExamFAQService,
  private toastrService : ToastrService,
  private examMasterservice : examMasterService,
  private examcategoryservice : examCategoryService,
  private examtypeservice : ExamtypeService,
){}

ngOnInit(): void {

  this.MainCategoryListDropdown$ = this.examMasterservice.getexamMasterListIdwithName() ;
  
  this.tableCols = [
    {title : 'S.r No.', data :'orderNo', type :'text'},
    {title : 'Question', data :'question', type :'text'},
    ];
}

get MainCategory(){
  return this.ExamFAQForm.get('maincategory')
}

get ExamCategory(){
  return this.ExamFAQForm.get('examCategory')
}

get ExamId(){
  return this.ExamFAQForm.get('examid')
}

get Question(){
  return this.ExamFAQForm.get('question')
}

get Answer(){
  return this.ExamFAQForm.get('answer')
}

get OrderNumber(){
  return this.ExamFAQForm.get('orderno')
}

onSelectMaincategory(){
  const MainCatId = this.ExamFAQForm.get('maincategory')?.value ;
  this.ExamCategoryListDropdown$ = this.examcategoryservice.getExamCategoryListIdwithname(MainCatId);
}

onSelectExamCategory(){
  const ExamCatId = this.ExamFAQForm.get('examCategory')?.value
  this.ExamListDropdown$ = this.examtypeservice.getExamTypeIdwithName(ExamCatId);
}

onExamChoose(){
  const examtypeId = this.ExamFAQForm.get('examid')?.value;
  this.dataObs = this.examFAQservice.getExamFAQList(examtypeId);

  setTimeout(() => {
    this.dttable?.reloadTable() ; 
   });
}

createExamFAQ() {
const maincatid = this.MainCategory?.value;
const examcategory = this.ExamCategory?.value;
const examid = this.ExamId?.value;
const question = this.Question?.value;
const answer = this.Answer?.value;
const ordernumber = this.OrderNumber?.value
  
this.examFAQservice.createExamFAQ(examid,question,answer,ordernumber).subscribe({
  next : (response =>{
    setTimeout(() => {
      if(this.dttable){ 
        this.dttable.reloadTable();
      }    
    });
    
  this.toastrService.success('Exam FAQ Created Successfully', 'Exam FAQ Create');
  }),
  error : (error =>{
    this.toastrService.error(error.message);
  })
})

  }
  

  
updateExamFAQ( ExamFAQUpadteID : string) {

  const maincatid = this.MainCategory?.value;
  const examcategory = this.ExamCategory?.value;
  const id = ExamFAQUpadteID ;
  const examid = this.ExamId?.value;
  const question = this.Question?.value ;
  const answer = this.Answer?.value;
  const ordernumber = this.OrderNumber?.value;

this.examFAQservice.updateExamFAQ(id,examid,question,answer,ordernumber).subscribe({
  next : (response =>{
    if(this.dttable){
      this.dttable.reloadTable();
    }
    this.toastrService.success('Exam FAQ Update Successfully', 'Exam FAQ Updated');
  }),
  error :(error =>{
    this.toastrService.error(error.message);
  })
})

}

deleteExamFAQ( data : any) {

  const id = data.id ;

  this.examFAQservice.deleteExamFAQ(id).subscribe({
    next : (response =>{
      if(this.dttable){
        this.dttable.reloadTable();
      }
      this.toastrService.success('Exam FAQ Delete Successfully','Exam FAQ Delete');
    }),
    error : (error =>{
      this.toastrService.error(error.message);
    })
  })
 
}

editExamFAQ( data : any) {

  const id = data.id ;

  this.examFAQservice.getExamFAQSingle(id).subscribe({
    next : (response =>{
      
  this.editExamFAQId = id;
  this.isUpdateMode = true;

this.ExamFAQForm.patchValue({
  id : response.id ,
  maincategory : response.mainCatId ,
  examCategory : response.examCatId,
  examid : response.examId,
  question : response.question,
  answer : response.answer,
  orderno : response.orderNo
});
    }),
    error : (error =>{
      this.toastrService.error(error.message);
    })
  })
  
}

clearForm() {

  this.editExamFAQId = '' ;
  this.isUpdateMode = false ;
  this.ExamFAQForm.reset() ;

}


}













