import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { couponAffilDetailListmodel } from '../domain/coupon-affiliate-detail/coupon-affiliate-list.model';
import { couponAffDetailModel } from '../domain/coupon-affiliate-detail/coupon-affiliate.model';

export abstract class IcouponAffilDetailService {
  abstract createCouponAffiDetail(
    couponId: string,
    affId: string
  ): Observable<SimpleResponse>;

  abstract getCouponAffiDetailList(): Observable<couponAffilDetailListmodel[]>;

  abstract updateCouponAffiDetail(
    id: string,
    couponId: string,
    affId: string
  ): Observable<SimpleResponse>;

  abstract deleteCouponAffiDetail(id: string): Observable<SimpleResponse>;

  abstract getCouponAffiDetail(id: string): Observable<couponAffDetailModel>;
}
