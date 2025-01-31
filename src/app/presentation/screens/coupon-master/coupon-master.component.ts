import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { CouponMasterService } from '../../../services/couponMaster.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-coupon-master',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    DataTableComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './coupon-master.component.html',
  styleUrl: './coupon-master.component.scss',
})
export class CouponMasterComponent implements OnInit {
  isUpdateMode: boolean = false;
  couponMasterForm: FormGroup = new FormGroup({
    couponcode: new FormControl('', [Validators.required]),
    discounttype: new FormControl('', [Validators.required]),
    discount: new FormControl(0, [Validators.required]),
    startdate: new FormControl('', [Validators.required]),
    enddate: new FormControl('', [Validators.required]),
    couponPlantype: new FormControl('', [Validators.required]),
    applicationName: new FormControl('', [Validators.required]),
    singleTimecoupon: new FormControl('Yes', [Validators.required]),
    isUsed: new FormControl('Yes', [Validators.required]),
  });

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];
  editCouponMasterId: string = '';

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  constructor(
    private couponmasterService: CouponMasterService,
    private toastrService: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    this.dataObs = this.couponmasterService.GetCouponMasterList();
    this.tableCols = [
      { title: 'Coupon Code', data: 'couponCode', type: 'text' },
      { title: 'Discount', data: 'discount', type: 'text' },
      { title: 'Start Date', data: 'startDate', type: 'text' },
      { title: 'End Date', data: 'endDate', type: 'text' },
      { title: 'Application Name', data: 'applicationName', type: 'text' },
    ];
  }

  get CouponCode() {
    return this.couponMasterForm.get('couponcode');
  }

  get DiscountType() {
    return this.couponMasterForm.get('discounttype');
  }

  get Discount() {
    return this.couponMasterForm.get('discount');
  }
  get StartDate() {
    return this.couponMasterForm.get('startdate');
  }
  get EndDate() {
    return this.couponMasterForm.get('enddate');
  }
  get couponPlanType() {
    return this.couponMasterForm.get('couponPlantype');
  }
  get ApplicationName() {
    return this.couponMasterForm.get('applicationName');
  }
  get IssingleTimecoupon() {
    return this.couponMasterForm.get('singleTimecoupon');
  }
  get IsUsed() {
    return this.couponMasterForm.get('isUsed');
  }

  createCouponMaster() {
    const couponcode = this.CouponCode?.value;
    const discounttype = this.DiscountType?.value;
    const discount = this.Discount?.value;
    const startdate = this.StartDate?.value;
    const enddate = this.EndDate?.value;
    const couponPlantype = this.couponPlanType?.value;
    const applicationname = this.ApplicationName?.value;
    const isSingletimeCoupon = this.IssingleTimecoupon?.value;
    const isused = this.IsUsed?.value;

    this.couponmasterService
      .CreateCouponMaster(
        couponcode,
        discounttype,
        discount,
        startdate,
        enddate,
        couponPlantype,
        isSingletimeCoupon,
        isused,
        applicationname
      )
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Create Coupon Master Successfully !',
            'Created Coupon Master'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  updateCouponMaster(couponMasterUpdateID: string) {
    const id = couponMasterUpdateID;
    const couponCode = this.CouponCode?.value;
    const discounttype = this.DiscountType?.value;
    const discount = this.Discount?.value;
    const startdate = this.StartDate?.value;
    const enddate = this.EndDate?.value;
    const couponPlantype = this.couponPlanType?.value;
    const singletimecoupon = this.IssingleTimecoupon?.value;
    const isused = this.IsUsed?.value;
    const applicationName = this.ApplicationName?.value;

    this.couponmasterService
      .UpdateCouponMaster(
        id,
        couponCode,
        discounttype,
        discount,
        startdate,
        enddate,
        couponPlantype,
        singletimecoupon,
        isused,
        applicationName
      )
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Coupon Master Update Successfully !',
            'Coupon Master Update'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  deleteCouponMaster(data: any) {
    const id = data.id;

    this.couponmasterService.DeleteCouponMaster(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          'Coupon Master Deleted Successfully !',
          'Delete Coupon Master'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }
  editCouponMaster(data: any) {
    const id = data.id;

    this.couponmasterService.GetCouponMaster(id).subscribe({
      next: (response) => {
        this.editCouponMasterId = id;
        this.isUpdateMode = true;

        this.couponMasterForm.patchValue({
          id: response.id,
          couponcode: response.couponCode,
          discounttype: response.discountType,
          discount: response.discount,
          startdate: response.startDate.substring(0,16),
          enddate: response.endDate.substring(0,16),
          couponPlantype: response.couponPlanType,
          singleTimecoupon: response.isSingleTimeCoupon ? 'Yes' : 'No',
          isUsed: response.isUsed ? 'Yes' : 'No',
          applicationName: response.applicationName,
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  clearForm() {
    this.editCouponMasterId = '';
    this.isUpdateMode = false;
    this.couponMasterForm.reset();
  }
}


