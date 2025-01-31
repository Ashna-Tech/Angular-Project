import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { AsyncPipe } from '@angular/common';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable } from 'rxjs';
import { QzSeoService } from '../../../services/QzSeo.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'jquery';
import { ExamtypeService } from '../../../services/exam-type.service';
import { IdExamTypeListModel } from '../../../core/domain/Exam type/id-ExamtypeList.model';


@Component({
  selector: 'app-qz-seo',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,DataTableComponent,AsyncPipe],
  templateUrl: './qz-seo.component.html',
  styleUrl: './qz-seo.component.scss'
})
export class QzSeoComponent implements OnInit {

  isUpdateMode: boolean = false ; 
  QzSeoForm : FormGroup = new FormGroup({
    examtypeID : new FormControl('',[Validators.required]),
    pagetitle : new FormControl('',[Validators.required]),
    kwordmeta : new FormControl('',[Validators.required]),
    pagedesc : new FormControl('',[Validators.required]),
  });
  tableCols : TableColType [] = [];
  dataObs: Observable<any>|undefined;
  editQzSeoId: string = '';
  
  
  examtypeListDropdown$ : Observable <IdExamTypeListModel[]> | undefined 
  
@ViewChild('dttable') dttable : DataTableComponent | undefined 

 constructor(private QzSeoService : QzSeoService,
  private toastrservice : ToastrService,
  private examtypeservice : ExamtypeService
 ){} 
ngOnInit(): void {
  
  // this.examtypeListDropdown$ = this.examtypeservice.getExamTypeIdwithName();

this.dataObs = this.QzSeoService.GetQzSEOList();
this.tableCols = [
{title :'Page Title', data : 'pageTitle', type :'text'},
{title :'K Word Meta', data :'kwordMeta', type :'text'},
{title:'Page Desc', data :'pageDesc',type :'text'}
];

}
get ExamtypeId(){
  return this.QzSeoForm.get('examtypeID')
}

get Pagetitle(){
  return this.QzSeoForm.get('pagetitle')
}

get Kwordmeta(){
  return this.QzSeoForm.get('kwordmeta')
}
get Pagedesc(){
  return this.QzSeoForm.get('pagedesc')
}


createQzSeo() {
  const examtypeid = this.ExamtypeId?.value;
const pagetitle = this.Pagetitle?.value;
const kwordmeta = this.Kwordmeta?.value;
const pagedesc = this.Pagedesc?.value


this.QzSeoService.CreateQzSEO(examtypeid,pagetitle,kwordmeta,pagedesc).subscribe({
  next : (response =>{
    if (this.dttable){
      this.dttable.reloadTable();
    }
    this.toastrservice.success('Qz SEO Created Successfully','Create Qz SEO');    
  }),
  error : (error =>{
    this.toastrservice.error(error.message);
  })
})
 
  }

  updateQzSeo(QZseoUpdateID : string) {

    const id = QZseoUpdateID ;
    const examtypeid = this.ExamtypeId?.value;
    const pagetitle = this.Pagetitle?.value;
    const kwordmeta = this.Kwordmeta?.value;
    const pagedesc = this.Pagedesc?.value ;

    this.QzSeoService.UpdateQzSEO(id,examtypeid,pagetitle,kwordmeta,pagedesc).subscribe({
      next : (response =>{
        if(this.dttable){
          this.dttable.reloadTable();
        }
        this.toastrservice.success('Qz SEO Updated Successfully', 'Qz SEO Updated');
      }),
      error : (error =>{
        this.toastrservice.error(error.message);
      })
    })
    
    }
    
deleteQzSeo(data : any) {

  const id = data.id ;

  this.QzSeoService.DeleteQzSEO(id).subscribe({
    next : (response =>{
      if(this.dttable){
        this.dttable.reloadTable();
      }
    }),
    error : (error =>{
      this.toastrservice.error(error.message);
    })
  })

}

clearForm() {

  this.editQzSeoId = '',
  this.isUpdateMode = false,
  this.QzSeoForm.reset()
}

editQzSeo(data : any) {

  const id = data.id ;

this.QzSeoService.GetQzSEO(id).subscribe({
  next : (response =>{

this.editQzSeoId = id ,
this.isUpdateMode = true;


this.QzSeoForm.patchValue({
  id : response.id ,
  examtypeID : response.examTypeID,
  pagetitle : response.pageTitle,
  kwordmeta : response.kwordMeta,
  pagedesc : response.pageDesc,
});

  }),
  error : (error =>{
    this.toastrservice.error(error.message);
  })
})


}
  
}
