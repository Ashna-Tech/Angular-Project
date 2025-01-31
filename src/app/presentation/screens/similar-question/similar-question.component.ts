import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { AsyncPipe } from '@angular/common';
import { CkeditorComponent } from '../../components/ckeditor/ckeditor.component';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable } from 'rxjs';
import { SimilarQuestionService } from '../../../services/similar-question-service';
import { FormsUtilsService } from '../../../services/formsUtils.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-similar-question',
  standalone: true,
  imports: [ReactiveFormsModule,DataTableComponent,AsyncPipe,CkeditorComponent],
  templateUrl: './similar-question.component.html',
  styleUrl: './similar-question.component.scss'
})

export class SimilarQuestionComponent implements OnInit {
  
  isUpdateMode : boolean = false ;
  SimilarQuestionForm : FormGroup = new FormGroup({
    testid : new FormControl('',[Validators.required]),  
    question : new FormControl('',[Validators.required]),
    optionA : new FormControl('',[Validators.required]),
    optionB : new FormControl('',[Validators.required]),
    optionC : new FormControl('',[Validators.required]),
    optionD : new FormControl('',[Validators.required]),
    optionE : new FormControl('', [Validators.required]),
    optionF : new FormControl('',[Validators.required]),
    explanation : new FormControl('', [Validators.required]),
    correct : new FormControl('',[Validators.required]),
    flag : new FormControl('',[Validators.required]),
    similarid : new FormControl('',[Validators.required]),

  });

  dataObs: Observable<any>|undefined;
  tableCols: TableColType [] = [] ;
  editSimilarQuestionId : string = '';


@ViewChild('dttable') dttable : DataTableComponent | undefined 

@ViewChild('optionA')  optionAcomp :CkeditorComponent | undefined 

@ViewChild('optionB') optionBcomp : CkeditorComponent | undefined 

@ViewChild('optionC') optionCcomp : CkeditorComponent | undefined

@ViewChild('optionD') optionDcomp : CkeditorComponent | undefined

@ViewChild('optionE') optionEcomp : CkeditorComponent | undefined 

@ViewChild('optionF') optionFcomp : CkeditorComponent | undefined 

@ViewChild('explanation') explanationcomp : CkeditorComponent | undefined 

@ViewChild('correct') correctcomp : CkeditorComponent | undefined


TestListDropdown$ : Observable <any[]> | undefined 

SimilarListDropdown$ : Observable <any[]> | undefined 

constructor(private similarQuestionService : SimilarQuestionService,
  private formsUtilsService : FormsUtilsService,
  private toastrservice : ToastrService
){}

ngOnInit(): void {
  
this.dataObs = this.similarQuestionService.getSimilarQuestionList() ;

this.tableCols = [
{title : 'Option A', data :'optionA', type : 'text'},
{title : 'Option B', data : 'optionB', type :'text'},
{title : 'Option C', data :'optionC', type : 'text'},
{title : 'OptionD', data :'optionD', type : 'text'},
{title : 'OptionE', data : 'optionE', type :'text'},
{title :'OptionF', data :'optionF', type :'text'},
{title : 'Explanation', data :'explanation', type :'text'},
{title : 'Correct', data :'correct', type :'text'},
{title :'Flag', data :'flag', type : 'text'},

];

}

get TestId(){
  return this.SimilarQuestionForm.get('testid')
}

get Question(){
  return this.SimilarQuestionForm.get('question')
}

get OptionA(){
  return this.SimilarQuestionForm.get('optionA')
}

get OptionB(){
  return this.SimilarQuestionForm.get('optionB')
}

get optionC(){
  return this.SimilarQuestionForm.get('optionC')
}

get OptionD(){
  return this.SimilarQuestionForm.get('optionD')
}

get OptionE(){
   return this.SimilarQuestionForm.get('optionE')
}

get OptionF(){
  return this.SimilarQuestionForm.get('optionF')
}

get Explanation(){
  return this.SimilarQuestionForm.get('explanation')
}

get Correct(){
  return this.SimilarQuestionForm.get('correct')
}

get Flag(){
  return this.SimilarQuestionForm.get('flag')
}

get SimilarId(){
  return this.SimilarQuestionForm.get('similarid')
}


setDataFormfromCkeditor(){
  const ckInputs = [
{comp : this.optionAcomp , FormControlName : 'optionA'},
{comp : this.optionBcomp , FormControlName : 'optionB'},
{comp : this.optionCcomp, FormControlName : 'optionC'},
{comp : this.optionDcomp , FormControlName : 'optionD'},
{comp : this.optionEcomp , FormControlName : 'optionE'},
{comp : this.optionFcomp, FormControlName : 'optionF'},
{comp : this.explanationcomp , FormControlName : 'explanation'},
{comp : this.correctcomp , FormControlName : 'correct'},
  ];

  this.formsUtilsService.setDataFormCkEditorToForm(ckInputs,this.SimilarQuestionForm);
}

createSimilarQuestion() {
  
this.setDataFormfromCkeditor() ;
  if(this.formsUtilsService.checkValidationErrors(this.SimilarQuestionForm)){
  return
  }


const testid = this.TestId?.value;
const question = this.Question?.value;
const optionA = this.OptionA?.value;
const optionB = this.OptionB?.value;
const optionC = this.optionC?.value;
const optionD = this.OptionD?.value;
const optionE = this.OptionE?.value;
const optionF = this.OptionF?.value; 
const explanation = this.Explanation?.value;
const correct = this.Correct?.value;
const flag = this.Flag?.value;
const similarid = this.SimilarId?.value; 

this.similarQuestionService.createSimilarQuestion(testid,question,optionA,optionB,optionC,optionD,optionE,
  optionF,explanation,correct,flag,similarid).subscribe({
    next : (response =>{
      if(this.dttable){
        this.dttable.reloadTable();
      }
      this.toastrservice.success('Similar Question Created Successfully','Create Similar Question');
    }),
    error : (error =>{
      this.toastrservice.error(error.message);
    })
  })

  }
  

  updateSimilarQuestion(similarQuesUpdateId : string) {
  
    this.setDataFormfromCkeditor();
      if(this.formsUtilsService.checkValidationErrors(this.SimilarQuestionForm)){
     return 
      }
    
     
    const id = similarQuesUpdateId;
    const testid = this.TestId?.value;
    const question = this.Question?.value;
    const optionA = this.OptionA?.value;
    const optionB = this.OptionB?.value;
    const optionC = this.optionC?.value;
    const optionD = this.OptionD?.value;
    const optionE = this.OptionE?.value;
    const optionF = this.OptionF?.value;
    const explanation = this.Explanation?.value;
    const correct = this.Correct?.value;
    const flag = this.Flag?.value;
    const similarid = this.SimilarId?.value;


    this.similarQuestionService.updateSimilarQuestion(id,testid,question,optionA,optionB,optionC,optionD,
      optionE,optionF,explanation,correct,flag,similarid).subscribe({
        next : (response =>{
          if(this.dttable){
            this.dttable.reloadTable();
          }
         this.toastrservice.success('Similar Question Update Successfully', 'Similar Question Updated');
          }),
          error : (error =>{
            this.toastrservice.error(error.message);
          })
      })

  }
    

  deleteSimilarQuestion(data : any) {
    
    const id = data.id ;

    this.similarQuestionService.deleteSimilarQuestion(id).subscribe({
      next : (response =>{
        if(this.dttable){
          this.dttable.reloadTable();
        }
        this.toastrservice.success('Similar Question Delete Successfully', 'Similar Question Deleted');
      }),
      error : (error =>{
        this.toastrservice.error(error.message);
      })
    })
    
    
    }
    
editSimilarQuestion(data : any) {

  const id = data.id;

  this.similarQuestionService.getSimilarQuestion(id).subscribe({
    next : (response =>{
      
  this.editSimilarQuestionId = id ;
  this.isUpdateMode = true ;

this.SimilarQuestionForm.patchValue({
    id : response.id ,
    testid : response.testID,
    question : response.question,
    optionA : response.optionA,
    optionB : response.optionB,
    optionC : response.optionC,
    optionD : response.optionD,
    optionE : response.optionE,
    optionF : response.optionF,
    explanation : response.explanation,
    correct : response.correct,
    flag : response.flag,
    similarid : response.similarId,
});

    }),
    error : (error =>{
      this.toastrservice.error(error.message);
    })
  })
 
}

clearForm() {

  this.editSimilarQuestionId = '' ;
  this.isUpdateMode = false ;
  this.SimilarQuestionForm.reset() ;


}





}