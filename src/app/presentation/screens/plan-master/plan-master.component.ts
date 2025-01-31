import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { Observable } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { PlanMasterService } from '../../../services/planmaster.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-plan-master',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, DataTableComponent],
  templateUrl: './plan-master.component.html',
  styleUrl: './plan-master.component.scss',
})
export class PlanMasterComponent implements OnInit {
  isUpdateMode: boolean = false;

  planMasterForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    taxPercent: new FormControl('', [Validators.required]),
    saveAmount: new FormControl('', [Validators.required]),
    memberFor: new FormControl('', [Validators.required]),
    currentPlan: new FormControl('', [Validators.required]),
    totalMonth: new FormControl('', [Validators.required]),
    totalDays: new FormControl('', [Validators.required]),
    planType: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
    planPermonth: new FormControl('', [Validators.required]),
  });

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];
  editPlanMasterId: string = '';

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  constructor(
    private planmasterService: PlanMasterService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataObs = this.planmasterService.getPlanMasterList();
    this.tableCols = [
      { title: 'Name', data: 'name', type: 'text'},
      { title: 'Amount', data: 'amount', type: 'text'},
      { title: 'Message', data: 'message', type: 'text'},
    ];
  }

  get Name() {
    return this.planMasterForm.get('name');
  }

  get Amount() {
    return this.planMasterForm.get('amount');
  }

  get TaxPercent() {
    return this.planMasterForm.get('taxPercent');
  }

  get SaveAmount() {
    return this.planMasterForm.get('saveAmount');
  }

  get MemberFor() {
    return this.planMasterForm.get('memberFor');
  }

  get CurrentPlan() {
    return this.planMasterForm.get('currentPlan');
  }

  get TotalMonth() {
    return this.planMasterForm.get('totalMonth');
  }

  get TotalDays() {
    return this.planMasterForm.get('totalDays');
  }

  get PlanType() {
    return this.planMasterForm.get('planType');
  }

  get Message() {
    return this.planMasterForm.get('message');
  }

  get PlanperMonth() {
    return this.planMasterForm.get('planPermonth');
  }

  updatePlanMaster(updatePlanMasterID: string) {
    const id = updatePlanMasterID;
    const name = this.Name?.value;
    const amount = this.Amount?.value;
    const taxPercent = this.TaxPercent?.value;
    const saveAmount = this.SaveAmount?.value;
    const memberFor = this.MemberFor?.value;
    const currentPlan = this.CurrentPlan?.value;
    const totalMonth = this.TotalMonth?.value;
    const totalDays = this.TotalDays?.value;
    const planType = this.PlanType?.value;
    const message = this.Message?.value;
    const planPerMonth = this.PlanperMonth?.value;

    this.planmasterService
      .updatePlanMaster(
        id,
        name,
        amount,
        taxPercent,
        saveAmount,
        memberFor,
        currentPlan,
        totalMonth,
        totalDays,
        planType,
        message,
        planPerMonth
      )
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.toastrService.success(
              'Plan Master Updated Successfully',
              'Update Plan Master'
            );
            this.dttable.reloadTable();
          }
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  editPlanMaster(data: any) {
    const id = data.id;

    this.planmasterService.getPlanMaster(id).subscribe({
      next: (response) => {
        this.editPlanMasterId = id;
        this.isUpdateMode = true;

        this.planMasterForm.patchValue({
          id: response.id,
          name: response.name,
          amount: response.amount,
          taxPercent: response.tax_Percent,
          saveAmount: response.save_amt,
          memberFor: response.member_for,
          currentPlan: response.current_plan,
          totalMonth: response.total_Month,
          totalDays: response.total_days,
          planType: response.ptype,
          message: response.message,
          planPermonth: response.plan_Per_month,
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  clearForm() {
    this.editPlanMasterId = '';
    this.isUpdateMode = false;
    this.planMasterForm.reset();
  }
}
