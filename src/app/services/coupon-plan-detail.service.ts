import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IcouponPlanDetailService } from '../core/services/I couponPlanDetail.service';
import { Observable, map, retry } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { baseUrl } from '../../environement';
import { CouponPlanDetailListModel } from '../core/domain/coupon-plan-detail/couponPlanDetailList.model';
import { CouponPlanDetailListEntity } from '../entity/coupon-plan-detail/couponPlanDetailList.entity';
import { BlogService } from './Blog.service';
import { CouponPlanDetailModel } from '../core/domain/coupon-plan-detail/couponPlanDetail.model';

@Injectable({
  providedIn: 'root',
})
export class CouponPlanDetailService extends IcouponPlanDetailService {
  constructor(private http: HttpClient) {
    super();
  }

  override createCouponPlandetail(
    couponId: string,
    planId: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/CouponPlanDetail`;
    return this.http
      .post<SimpleResponse>(url, { couponId: couponId, planId: planId })
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

  override getCouponPlanListDetail(): Observable<CouponPlanDetailListModel[]> {
    const url = `${baseUrl}/api/CouponPlanDetail`;
    return this.http.get<CouponPlanDetailListEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override updateCouponPlanDetail(
    id: string,
    couponId: string,
    planId: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/CouponPlanDetail/${id}`;
    return this.http
      .put<SimpleResponse>(url, { id: id, couponId: couponId, planId: planId })
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

  override deleteCouponPlanDetail(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/CouponPlanDetail/${id}`;
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

  override getCouponPlanDetail(id: string): Observable<CouponPlanDetailModel> {
    const url = `${baseUrl}/api/CouponPlanDetail/${id}`;

    return this.http.get<SimpleResponse>(url).pipe(
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
