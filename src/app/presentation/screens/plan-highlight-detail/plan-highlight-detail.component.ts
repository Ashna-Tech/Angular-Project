import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { PlanHighlightDetailService } from '../../../services/planHighlightDetail.Service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-plan-highlight-detail',
  standalone: true,
  imports: [ReactiveFormsModule,DataTableComponent,AsyncPipe],
  templateUrl: './plan-highlight-detail.component.html',
  styleUrl: './plan-highlight-detail.component.scss'
})
export class PlanHighlightDetailComponent implements OnInit {

  isUpdateMode : boolean = false ;

PlanHighlightDetailForm : FormGroup = new FormGroup({
  planhighId : new FormControl('',[]),
  planId : new FormControl('',[]),
}) ;

dataObs: Observable<any>|undefined;
tableCols: TableColType [] = [] ;
editPlanHighlightDetailId : string = '';

@ViewChild('dttable') dttable : DataTableComponent | undefined

planHighlightListDropdown$ : Observable <any[]> | undefined 

planListDropdown$ : Observable <any[]> | undefined


constructor(private planHighlightDetailService : PlanHighlightDetailService,
  private toastrService : ToastrService
){}

ngOnInit(): void {
  
this.dataObs = this.planHighlightDetailService.GetPlanHighlightDetailList();
this.tableCols = [
  {title : 'plan Highlight', data : 'phId', type : 'text'},
  {title : 'plan', data : 'planId', type : 'text'},
]

}


get PlanHighlightId(){
return this.PlanHighlightDetailForm.get('planhighId')
}

get PlanId(){
  return this.PlanHighlightDetailForm.get('planId')
} 


createPlanHighlightDetail() {
  
const planhighlightId = this.PlanHighlightId?.value;
const planId = this.PlanId?.value ;

this.planHighlightDetailService.CreatePlanHighlightDetail(planhighlightId,planId).subscribe({
  next : (response =>{
    if(this.dttable){
      this.dttable.reloadTable();
    }
    this.toastrService.success('Plan Higlight Detail Created Successfully!!', 'Created Plan Highlight Detail')
  }),
  error : (error =>{
    this.toastrService.error(error.message)
  })
})

  }

  updatePlanHighlightDetail(planHighDetailID : string) {
    
    const id = planHighDetailID ;
    const planHighlightId = this.PlanHighlightId?.value;
    const planId = this.PlanId?.value

this.planHighlightDetailService.UpdatePlanHighlightDetail(id,planHighlightId,planId).subscribe({
  next : (response =>{
    if(this.dttable){
      this.dttable.reloadTable();
    }
    this.toastrService.success('Plan Highlight Detail Updated Successfully !!', 'Update Plan Highligh Detail')
  }),
  error : (error =>{
    this.toastrService.error(error.message);
  })
})

    }

deletePlanHighlightDetail(data : any) {

  const id = data.id ;

  this.planHighlightDetailService.DeletePlanHighlightDetail(id).subscribe({
    next : (response =>{
      if(this.dttable){
        this.dttable.reloadTable();
      }
      this.toastrService.success('Plan Highlight Detail Deleted Successfully')
    }),
    error : (error =>{
      this.toastrService.error(error.message);
    })
  })

}

editPlanHighlightDetail(data : any) {

  const id = data.id ;

this.planHighlightDetailService.GetPlanHighlightDetail(id).subscribe({
  next : (response =>{

this.editPlanHighlightDetailId = id;
this.isUpdateMode = true ;


this.PlanHighlightDetailForm.patchValue({
id : response.id ,
planhighId : response.phId,
planId : response.planId
});

  }),
  error : (error =>{
    this.toastrService.error(error.message);
  })
})

 
}
clearForm() {

this.editPlanHighlightDetailId = '',
this.isUpdateMode = false ;
this.PlanHighlightDetailForm.reset();

}



}