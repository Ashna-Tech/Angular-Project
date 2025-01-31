import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { affiliateMasterListModel } from '../domain/Affiliate-Master/affiliatemaster.List.model';
import { affiliateMasterModel } from '../domain/Affiliate-Master/affiliatemaster.model';
import { affilMasterListIdwithnameModel } from '../domain/Affiliate-Master/affiliatemasteridwithname.model';

export abstract class IaffiliateService {
  abstract createAffiliateMaster(
    name: string,
    email: string,
    mobile: string,
    password: string,
    affDays: string,
    couponApplydays: string,
    canLogin: string,
    isStarted: string
  ): Observable<SimpleResponse>;

  abstract getAffiliateMasterList(): Observable<affiliateMasterListModel[]>;

  abstract updateAffiliateMaster(
    id: string,
    name: string,
    email: string,
    mobile: string,
    password: string,
    affDays: string,
    couponApplydays: string,
    canLogin: string,
    isStarted: string
  ): Observable<SimpleResponse>;

  abstract deleteAffiliateMaster(id: string): Observable<SimpleResponse>;

  abstract getAffiliateMaster(id: string): Observable<affiliateMasterModel>;

  abstract getAffiliateMasterListIdwithname(): Observable<
    affilMasterListIdwithnameModel[]
  >;
}
