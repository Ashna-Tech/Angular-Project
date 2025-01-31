import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { OfferPeriodListModel } from "../domain/Offer-Period/offer-period-list-model";
import { OfferPeriodModel } from "../domain/Offer-Period/offer-period-model";

export abstract class IofferPeriodService {

abstract createOfferPeriod(startDate : string, endDate : string, bannerStartDate : string, 
    
bannerEndDate: string, isShowTimer : string, isApplyOnAll : string, discountRate : number,
offerEndingText : string, applicationName : string, isActive : string ) : Observable <SimpleResponse>

abstract getOfferPeriodList() : Observable <OfferPeriodListModel[]>

abstract updateOfferPeriod(id : string, startDate : string, endDate : string, bannerStartDate : string,
    bannerEndDate : string, isShowTimer : string, isApplyOnAll : string, discountRate : number,
 offerEndingText : string, applicationName : string, isActive : string  ) : Observable <SimpleResponse>

abstract deleteOfferPeriod(id : string) : Observable <SimpleResponse> 

abstract getOfferPeriod(id : string) : Observable <OfferPeriodModel>

}