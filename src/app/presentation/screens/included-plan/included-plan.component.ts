import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable } from 'rxjs';
import { includedPlanService } from '../../../services/included.plan.service';
import { AsyncPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-included-plan',
  standalone: true,
  imports: [ReactiveFormsModule, DataTableComponent, AsyncPipe],
  templateUrl: './included-plan.component.html',
  styleUrl: './included-plan.component.scss',
})
export class IncludedPlanComponent implements OnInit {
  isUpdateMode: boolean = false;
  includedPlanForm: FormGroup = new FormGroup({
    planId: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    isincluded: new FormControl('Yes', [Validators.required]),
  });

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];
  editIncludedPlanId: string = '';

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  PlanListDropdown$: Observable<any[]> | undefined;

  constructor(
    private IncludedPlanService: includedPlanService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataObs = this.IncludedPlanService.GetIncludedPlanList();
    this.tableCols = [
   
      {title : 'Plan', data : 'planId', type : 'text'},
      { title: 'Name', data: 'name', type: 'text' },
      { title: 'IsIncluded', data: 'isIncluded', type: 'text' },
    ];
  }

  get PlanId() {
    return this.includedPlanForm.get('planId');
  }
  get Name() {
    return this.includedPlanForm.get('name');
  }
  get Isincluded() {
    return this.includedPlanForm.get('isincluded');
  }


  createincludedPlan() {
    const Planid = this.PlanId?.value;
    const name = this.Name?.value;
    const isincluded = this.Isincluded?.value;

    this.IncludedPlanService.CreateIncludedPlan(Planid,name,isincluded).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          'Included Plan Created Successfully !!',
          'Create Included Plan'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }


      
    
  updateincludedPlan(IncludedPlanID: string) {
    const id = IncludedPlanID;
    const planid = this.PlanId?.value;
    const name = this.Name?.value;
    const isincluded = this.Isincluded?.value;

    this.IncludedPlanService.UpdateIncludedPlan(id,planid,name,isincluded ).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          'Update Included Plan Successfully !!',
          'Included Plan Update'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

      
   
  deleteIncludedPlan(data: any) {
    const id = data.id;

    this.IncludedPlanService.DeleteIncludedPlan(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          ' Delete Included Plan Successdfully !!',
          'Included Plan Deleted'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  editIncludedPlan(data: any) {
    const id = data.id;

    this.IncludedPlanService.GetIncludedPlan(id).subscribe({
      next: (response) => {
        this.editIncludedPlanId = id;
        this.isUpdateMode = true;

        this.includedPlanForm.patchValue({
          id: response.id,
          planId: response.planId,
          name: response.name,
          isincluded: response.isIncluded ? 'Yes' : 'No',
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }
  clearForm() {
    
this.editIncludedPlanId = '',
this.isUpdateMode = false ;
this.includedPlanForm.reset() ;


  }
}
