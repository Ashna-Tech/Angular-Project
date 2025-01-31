import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { CouponPlanDetailListModel } from '../domain/coupon-plan-detail/couponPlanDetailList.model';
import { CouponPlanDetailModel } from '../domain/coupon-plan-detail/couponPlanDetail.model';

export abstract class IcouponPlanDetailService {
  abstract createCouponPlandetail(
    couponId: string,
    planId: string
  ): Observable<SimpleResponse>;

  abstract getCouponPlanListDetail(): Observable<CouponPlanDetailListModel[]>;

  abstract updateCouponPlanDetail(
    id: string,
    couponId: string,
    planId: string
  ): Observable<SimpleResponse>;

  abstract deleteCouponPlanDetail(id : string): Observable<SimpleResponse>;

  abstract getCouponPlanDetail(id : string): Observable<CouponPlanDetailModel>;
}
