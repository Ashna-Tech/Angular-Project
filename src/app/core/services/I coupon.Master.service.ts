import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { couponMasterListModel } from '../domain/Coupon-Master/coupon-masterList.model';
import { CouponMasterModel } from '../domain/Coupon-Master/coupon-master.model';
import { CouponMasterListIdwithnameModel } from '../domain/Coupon-Master/couponMaster.idwithname.model';

export abstract class IcouponMasterService {
  abstract CreateCouponMaster(
    couponCode: string,
    discountType: string,
    discount: number,
    startDate: string,
    endDate: string,
    couponPlanType: string,
    isSingleTimeCoupon: string,
    isUsed: string,
    applicationName: string
  ): Observable<SimpleResponse>;

  abstract GetCouponMasterList(): Observable<couponMasterListModel[]>;

  abstract UpdateCouponMaster(
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
  ): Observable<SimpleResponse>;

  abstract DeleteCouponMaster(id: string): Observable<SimpleResponse>;

  abstract GetCouponMaster(id: string): Observable<CouponMasterModel>;

  abstract GetCouponMasterListidwithname(): Observable<
    CouponMasterListIdwithnameModel[]
  >;
}
