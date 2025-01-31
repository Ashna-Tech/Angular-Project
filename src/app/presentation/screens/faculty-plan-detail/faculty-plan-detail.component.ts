import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { FacultyPlanDetailService } from '../../../services/facultyPlanDetail.service';
import { ToastrService } from 'ngx-toastr';
import { MultipleSelectExamplansComponent } from '../exam-type/multiple-select-examplans/multiple-select-examplans.component';


@Component({
  selector: 'app-faculty-plan-detail',
  standalone: true,
  imports: [ReactiveFormsModule,DataTableComponent,AsyncPipe,MultipleSelectExamplansComponent],
  templateUrl: './faculty-plan-detail.component.html',
  styleUrl: './faculty-plan-detail.component.scss'
})

export class FacultyPlanDetailComponent implements OnInit {

  isUpdateMode: boolean = false ;
  facultyPlanDetailForm : FormGroup = new FormGroup({
    facultyid : new FormControl('',[Validators.required]),
    planid : new FormControl('',[Validators.required]),
   
  });

dataObs: Observable<any>|undefined;
tableCols: TableColType [] = [] ;
editFacultyPlanDetailId: string = '';

@ViewChild('dttable') dttable : DataTableComponent | undefined

@ViewChild('multiSelect') multiSelect : MultipleSelectExamplansComponent | undefined 

facultyListDropdown$ : Observable <any[]> | undefined

PlanListDropdown$ : Observable <any> | undefined 


constructor(private facultyplandetailService : FacultyPlanDetailService,
  private toastrService : ToastrService
){}

ngOnInit(): void {
  
  this.dataObs = this.facultyplandetailService.GetFacultyPlanDetailList();

  this.tableCols = [
   {title :'Faculty', data :'facultyId', type : 'text'},
    {title : 'Plan', data :'planId', type :'text'},
  ];
}

get FacultyID(){
  return this.facultyPlanDetailForm.get('facultyid')
}

get PlanID(){
  return this.facultyPlanDetailForm.get('planid')
}



createFacultyPlanDetail() {
  
const facultyid = this.FacultyID?.value;
const planid = this.PlanID?.value;


this.facultyplandetailService.CreateFacultyPlanDetail(facultyid,planid).subscribe({
  next : (response =>{
    if(this.dttable){
      this.dttable.reloadTable();
    }
    this.toastrService.success('Faculty Plan Detail Created Succesfully', 'Create Faculty Plan Detail')

  }),
  error :(error =>{
    this.toastrService.error(error.message);
  })
})

  }

  updateFacultyPlanDetail(FacultyPlanDtlUpdateID : string) {
   
    const id = FacultyPlanDtlUpdateID ;
const facultyid = this.FacultyID?.value;
const planid = this.PlanID?.value;

this.facultyplandetailService.UpdateFacultyPlanDetail(id,facultyid,planid).subscribe({
  next : (response =>{
    if(this.dttable){
      this.dttable.reloadTable();
    }
    this.toastrService.success('Faculty Plan Detail Updated Successfully', 'Update Faculty Plan Detail')
  }),
  error : (error =>{
    this.toastrService.error(error.message);
  })
})

    }
    
deleteFacultyPlanDetail(data : any) {

  const id = data.id ;

  this.facultyplandetailService.DeleteFacultyPlanDetail(id).subscribe({
    next : (response =>{
      if (this.dttable){
        this.dttable.reloadTable();
      }
      this.toastrService.success('Faculty Plan Detail Deleted Successfully', 'Delete Faculty Plan Detail');
    }),
    error : (error =>{
      this.toastrService.error(error.message);
    })
  })

}
editFacultyPlanDetail(data : any) {

  const id = data.id ;

  this.facultyplandetailService.GetFacultyPlanDetail(id).subscribe({
    next : (response =>{
      
this.editFacultyPlanDetailId = id ,
this.isUpdateMode = true ;

this.facultyPlanDetailForm.patchValue({
  id : response.id ,
  facultyid : response.facultyId,
  planid : response.planId,
 
});

    }),error : (error =>{
      this.toastrService.error(error.message);
    })
  })

}
clearForm() {

  this.editFacultyPlanDetailId = '',
  this.isUpdateMode = false ;
  this.facultyPlanDetailForm.reset();

}





}
