import { AsyncPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { couponAffilDetailService } from '../../../services/coupon-affiliatedetail.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'jquery';
import { CouponMasterService } from '../../../services/couponMaster.service';
import { CouponMasterListIdwithnameModel } from '../../../core/domain/Coupon-Master/couponMaster.idwithname.model';
import { affiliateMasterService } from '../../../services/affiliatemaster.service';
import { affilMasterListIdwithnameModel } from '../../../core/domain/Affiliate-Master/affiliatemasteridwithname.model';

@Component({
  selector: 'app-coupon-affiliate-detail',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, AsyncPipe, DataTableComponent],
  templateUrl: './coupon-affiliate-detail.component.html',
  styleUrl: './coupon-affiliate-detail.component.scss',
})
export class CouponAffiliateDetailComponent implements OnInit {
  isUpdateMode: boolean = false;
  couponAffiForm: FormGroup = new FormGroup({
    couponId: new FormControl('', [Validators.required]),
    affiliateId: new FormControl('', [Validators.required]),
  });

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];
  editCouponAffDetailId: string = '';

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  CouponListDropdown$ : Observable <CouponMasterListIdwithnameModel[]> | undefined ;

  affiliateListDropdown$ : Observable <affilMasterListIdwithnameModel[]> | undefined ;

  constructor(
    private couponAffilDetailService: couponAffilDetailService,
    private toastrService: ToastrService,
    private couponmasterservice : CouponMasterService,
    private affiliatemasterservice : affiliateMasterService
  ) {}

  ngOnInit(): void {

    this.CouponListDropdown$ = this.couponmasterservice.GetCouponMasterListidwithname();

    this.dataObs = this.couponAffilDetailService.getCouponAffiDetailList();
    this.tableCols = [
      { title: 'Coupon', data: 'couponId', type: 'text' },
      { title: 'Affiliate', data: 'affId', type: 'text' },
    ];
  }

  get CouponId() {
    return this.couponAffiForm.get('couponId');
  }

  get AffiliateId() {
    return this.couponAffiForm.get('affiliateId');
}

onSelectCoupon(){
this.affiliateListDropdown$ = this.affiliatemasterservice.getAffiliateMasterListIdwithname();
}


  createCouponAffiDetail() {
    const CouponId = this.CouponId?.value;
    const AffiliateId = this.AffiliateId?.value;

    this.couponAffilDetailService
      .createCouponAffiDetail(CouponId, AffiliateId)
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
            this.toastrService.success(
              'Coupon Affiliate Detail Created Successfully !',
              'Created Coupon Affiliate Detail'
            );
          }
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  updateCouponAffDetail(couponAffilD: string) {
    const id = couponAffilD;
    const CouponId = this.CouponId?.value;
    const AffiliateId = this.AffiliateId?.value;
    this.couponAffilDetailService
      .updateCouponAffiDetail(id, CouponId, AffiliateId)
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
            this.toastrService.success(
              'Coupon Affiliate Detail Update Successfully !',
              'Update Coupon Affiliate Detail'
            );
          }
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  deleteCouponAffiDetail(data: any) {
    const id = data.id;

    this.couponAffilDetailService.deleteCouponAffiDetail(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
          this.toastrService.success(
            'Coupon Affiliate Detail Delete Successfully !',
            'Delete Coupon Affiliate Detail'
          );
        }
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  editCouponAffDetail(data: any) {
    const id = data.id ;

    this.couponAffilDetailService.getCouponAffiDetail(id).subscribe({
      next: (response) => {
        this.editCouponAffDetailId = id;
        this.isUpdateMode = true;

        this.couponAffiForm.patchValue({
          id: response.id,
          // couponId: response.couponId,
          // affiliateId: response.affId,
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  clearForm() {
    
    this.editCouponAffDetailId = '';
    this.isUpdateMode = false ;
    this.couponAffiForm.reset();
    
  }
}
