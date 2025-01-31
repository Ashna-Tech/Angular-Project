import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { Observable, of } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { PlanScheduleMasterService } from '../../../services/planScheduleMaster.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'jquery';

@Component({
  selector: 'app-plan-schedule-master',
  standalone: true,
  imports: [ReactiveFormsModule, DataTableComponent, FormsModule],
  templateUrl: './plan-schedule-master.component.html',
  styleUrl: './plan-schedule-master.component.scss',
})
export class PlanScheduleMasterComponent implements OnInit {
  isUpdateMode: boolean = false;
  isActiveValueOfPlan: boolean = false;

  PlanScheduleMasterForm: FormGroup = new FormGroup({
    categoryname: new FormControl('', []),
    schedulename: new FormControl('', []),
    schedule: new FormControl('', []),
  });

  dataObs: Observable<any> | undefined = of([
    { categoryName: '', scheduleName: '', schedule: '', isActive: true },
  ]);
  tableCols: TableColType[] = [];
  editPlanScheduleMasterId: string = '';

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  constructor(
    private planScheduleMasterService: PlanScheduleMasterService,
    private toatrservice: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataObs = this.planScheduleMasterService.getPlanScheduleMasterList();
    this.tableCols = [
      { title: 'Category Name', data: 'categoryName', type: 'text' },
      { title: 'Schedule Name', data: 'scheduleName', type: 'text' },
      { title: 'schedule', data: 'schedule', type: 'text' },
      { title: 'IsActive', data: 'isActive', type: 'toggle' },
    ];
  }

  get Categoryname() {
    return this.PlanScheduleMasterForm.get('categoryname');
  }
  get Schedulename() {
    return this.PlanScheduleMasterForm.get('schedulename');
  }
  get Schedule() {
    return this.PlanScheduleMasterForm.get('schedule');
  }
  get Isactive() {
    return this.PlanScheduleMasterForm.get('');
  }

  createPlanScheduleMaster() {
    const categoryname = this.Categoryname?.value;
    const schedulename = this.Schedulename?.value;
    const schedule = this.Schedule?.value;

    this.planScheduleMasterService
      .createPlanScheduleMaster(categoryname, schedulename, schedule)
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toatrservice.success(
            'Create Plan Schedule Master Successfully',
            'plan Schedule Master Created'
          );
        },
        error: (error) => {
          this.toatrservice.error(error.message);
        },
      });
  }

  updatePlanScheduleMaster(PlanSchedMasterID: string) {
    const id = PlanSchedMasterID;
    const categoryname = this.Categoryname?.value;
    const schedulename = this.Schedulename?.value;
    const schedule = this.Schedule?.value;

    this.planScheduleMasterService
      .updatePlanScheduleMaster(id, categoryname, schedulename, schedule, this.isActiveValueOfPlan)
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
        this.toatrservice.success('Plan Schedule Master Updated Successfully', 'Plan Schedule Master Updated');
        },  
        error : (error =>{
          this.toatrservice.error(error.message);
        })
  
      }
    )
  }

  deletePlanScheduleMaster(data: any) {
    const id = data.id;

    this.planScheduleMasterService.deletePlanScheduleMaster(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toatrservice.success('Plan Schedule Master Deleted Successfully','Plan Schedule Master Deleted');
      },
      error : (error =>{
        this.toatrservice.error(error.message);
      })

    });
  }

  editPlanScheduleMaster(data: any) {
    const id = data.id;

    this.planScheduleMasterService.getPlanScheduleMaster(id).subscribe({
      next: (response) => {
        this.editPlanScheduleMasterId = id;
        this.isUpdateMode = true;
        this.isActiveValueOfPlan = response.isActive;

        this.PlanScheduleMasterForm.patchValue({
          id: response.id,
          categoryname: response.categoryName,
          schedulename: response.scheduleName,
          schedule: response.schedule,
        });
      },
      error : (error =>{
        this.toatrservice.error(error.message)
      })
    });

    
  }

  toggleIsActive($event: any) {
    const id = $event.id;

    this.planScheduleMasterService.getPlanScheduleMaster(id).subscribe({
      next: (response) => {
        this.planScheduleMasterService.updatePlanScheduleMaster(response.id, response.categoryName, response.scheduleName, response.schedule, !response.isActive).subscribe({
          next:(resp => {
            this.toatrservice.success("Updated successfully.");
          }),
          error:(err => {
            this.toatrservice.error(err.message);
          })
        })
      },
      error : (error =>{
        this.toatrservice.error(error.message)
      })
    })
  }
          
  clearForm() {
    this.isActiveValueOfPlan = false;
    this.isUpdateMode = false;
    this.editPlanScheduleMasterId = '';
    this.PlanScheduleMasterForm.reset();
  }
}
