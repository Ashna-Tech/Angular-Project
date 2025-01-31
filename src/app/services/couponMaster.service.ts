import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IcouponMasterService } from '../core/services/I coupon.Master.service';
import { Observable, map } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { baseUrl } from '../../environement';
import { CouponMasterListEntity } from '../entity/Coupon-Master/coupnMasterList.entity';
import { couponMasterListModel } from '../core/domain/Coupon-Master/coupon-masterList.model';
import { CouponMasterModel } from '../core/domain/Coupon-Master/coupon-master.model';
import { CouponMasterEntiy } from '../entity/Coupon-Master/couponMaster.entity';
import { CouponMasterListIdwithnameEntity } from '../entity/Coupon-Master/couponMaster.idwithname.entity';
import { CouponMasterListIdwithnameModel } from '../core/domain/Coupon-Master/couponMaster.idwithname.model';
@Injectable({
  providedIn: 'root',
})
export class CouponMasterService extends IcouponMasterService {
  constructor(private http: HttpClient) {
    super();
  }

  override CreateCouponMaster(
    couponCode: string,
    discountType: string,
    discount: number,
    startDate: string,
    endDate: string,
    couponPlanType: string,
    isSingleTimeCoupon: string,
    isUsed: string,
    applicationName: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/CouponMaster`;
    return this.http
      .post<SimpleResponse>(url, {
        couponCode: couponCode,
        discountType: discountType,
        discount: discount,
        startDate: startDate,
        endDate: endDate,
        couponPlanType: couponPlanType,
        isSingleTimeCoupon:( isSingleTimeCoupon =="Yes") ,
        isUsed: (isUsed =="Yes"),
        applicationName: applicationName,
      })
      .pipe(
        map((response) => {
          if (response.status) {
            return response.data;
          } else {
            throw new Error(response.msg);
          }
        })
      );
  }

  override GetCouponMasterList(): Observable<couponMasterListModel[]> {
    const url = `${baseUrl}/api/CouponMaster`;
    return this.http.get<CouponMasterListEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override UpdateCouponMaster(

    id: string,
    couponCode: string,
    discountType: string,
    discount: number,
    startDate: string,
    endDate: string,
    couponPlanType: string,
    isSingleTimeCoupon: string,
    isUsed: string,
    applicationName: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/CouponMaster/${id}`;

    return this.http
      .put<SimpleResponse>(url, {
        id: id,
        couponCode: couponCode,
        discountType: discountType,
        discount: discount,
        startDate: startDate,
        endDate: endDate,
        couponPlanType: couponPlanType,
        isSingleTimeCoupon: (isSingleTimeCoupon =="Yes"),
        isUsed:( isUsed =="Yes"),
        applicationName: applicationName,
      })
      .pipe(
        map((response) => {
          if (response.status) {
            return response.data;
          } else {
            throw new Error(response.msg);
          }
        })
      );
  }

  override DeleteCouponMaster(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/CouponMaster/${id}`;

    return this.http.delete<SimpleResponse>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override GetCouponMaster(id: string): Observable<CouponMasterModel> {
    const url = `${baseUrl}/api/CouponMaster/${id}`;

    return this.http.get<CouponMasterEntiy>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override GetCouponMasterListidwithname(): Observable<
    CouponMasterListIdwithnameModel[]
  > {
    const url = `${baseUrl}/api/CouponMaster`;
    return this.http.get<CouponMasterListIdwithnameEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }
}
