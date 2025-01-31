import { Injectable } from '@angular/core';
import { IcouponAffilDetailService } from '../core/services/Icoupon-affiliateDetail.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { couponAffDetailModel } from '../core/domain/coupon-affiliate-detail/coupon-affiliate.model';
import { baseUrl } from '../../environement';
import { couponAffiDetailListEntity } from '../entity/coupon-affiliate-detail/couponAffiliate.list.entity';
import { couponAffilDetailListmodel } from '../core/domain/coupon-affiliate-detail/coupon-affiliate-list.model';
import { couponAffiDetailEntity } from '../entity/coupon-affiliate-detail/couponAffiliate.entity';

@Injectable({
  providedIn: 'root',
})
export class couponAffilDetailService extends IcouponAffilDetailService {
  constructor(private http: HttpClient) {
    super();
  }

  override createCouponAffiDetail(
    couponId: string,
    affId: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/CouponAffiliateDetail`;
    return this.http
      .post<SimpleResponse>(url, { couponId: couponId, affId: affId })
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

  override getCouponAffiDetailList(): Observable<couponAffilDetailListmodel[]> {
    const url = `${baseUrl}/api/CouponAffiliateDetail`;

    return this.http.get<couponAffiDetailListEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override updateCouponAffiDetail(
    id: string,
    couponId: string,
    affId: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/CouponAffiliateDetail/${id}`;
    return this.http
      .put<SimpleResponse>(url, { id: id, couponId: couponId, affId: affId })
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
  override deleteCouponAffiDetail(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/CouponAffiliateDetail/${id}`;

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

  override getCouponAffiDetail(id: string): Observable<couponAffDetailModel> {
    const url = `${baseUrl}/api/CouponAffiliateDetail/${id}`;

    return this.http.get<couponAffiDetailEntity>(url).pipe(
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
