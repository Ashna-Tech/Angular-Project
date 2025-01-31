import { couponMasterListModel } from "../../core/domain/Coupon-Master/coupon-masterList.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface CouponMasterListEntity extends ResponseModel <couponMasterListModel[]>{}