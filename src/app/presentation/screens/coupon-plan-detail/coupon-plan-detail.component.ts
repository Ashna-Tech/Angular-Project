import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable } from 'rxjs';
import { CouponPlanDetailService } from '../../../services/coupon-plan-detail.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'jquery';
import { CouponMasterService } from '../../../services/couponMaster.service';
import { CouponMasterListIdwithnameModel } from '../../../core/domain/Coupon-Master/couponMaster.idwithname.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-coupon-plan-detail',
  standalone: true,
  imports: [ReactiveFormsModule, DataTableComponent,AsyncPipe],
  templateUrl: './coupon-plan-detail.component.html',
  styleUrl: './coupon-plan-detail.component.scss',
})
export class CouponPlanDetailComponent implements OnInit {
  isUpdateMode: boolean = false;
  couponPlanDetailForm: FormGroup = new FormGroup({
    couponId: new FormControl('', [Validators.required]),
    planId: new FormControl('', [Validators.required]),
  });

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];
  editCouponPlanDtlId: string = '';

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  CouponListDropdown$ : Observable <CouponMasterListIdwithnameModel[]> | undefined ;

  planListDropdown$ : Observable <any[]> | undefined ;

  constructor(
    private couponPlanDtlservice: CouponPlanDetailService,
    private toastrService: ToastrService,
    private couponMasterservice : CouponMasterService
  ) {}

  ngOnInit(): void {

    this.CouponListDropdown$ = this.couponMasterservice.GetCouponMasterListidwithname();

    this.dataObs = this.couponPlanDtlservice.getCouponPlanListDetail();
    this.tableCols = [
      { title: 'Coupon', data: 'couponId', type: 'text' },
      { title: 'Plan', data: 'planId', type: 'text' },
    ];
  }

  get couponId() {
    return this.couponPlanDetailForm.get('couponId');
  }
  get PlanId() {
    return this.couponPlanDetailForm.get('planId');
  }

  createCouponPlanDtl() {
    const couponid = this.couponId?.value;
    const planid = this.PlanId?.value;

    this.couponPlanDtlservice
      .createCouponPlandetail(couponid, planid)
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Coupon Plan Detail Created Successfully !!',
            ' Created Coupon Plan Detail'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  updateCouponPlanDtl(UpdateCouponPlandtlID: any) {
    const id = UpdateCouponPlandtlID;
    const couponId = this.couponId?.value;
    const planid = this.PlanId?.value;

    this.couponPlanDtlservice
      .updateCouponPlanDetail(id, couponId, planid)
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Coupon Plan Detail Update Successsfully !!',
            'Updated Coupon Plan Detail'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  deleteCouponPlanDtl(data: any) {
    const id = data.id;

    this.couponPlanDtlservice.deleteCouponPlanDetail(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          ' Delete Coupon plan Detail Successfully !!',
          'Deleted Coupon Plan Detail'
        );
      },
    });
  }
  editCouponPlanDtl(data: any) {
    const id = data.id;

    this.couponPlanDtlservice.getCouponPlanDetail(id).subscribe({
      next: (response) => {
        this.editCouponPlanDtlId = id;
        this.isUpdateMode = true;

        this.couponPlanDetailForm.patchValue({
          id: response.id,
          couponId: response.couponId,
          planId: response.planId,
        });
      },
    });
  }
  clearForm() {
    (this.editCouponPlanDtlId = ''), (this.isUpdateMode = false);
    this.couponPlanDetailForm.reset();
  }
}
