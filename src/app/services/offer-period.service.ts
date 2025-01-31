import { Injectable } from "@angular/core";
import { IofferPeriodService } from "../core/services/I offer-period.service";
import { HttpClient } from "@angular/common/http";
import { Observable,map } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { baseUrl } from "../../environement";
import { OfferPeriodListEntity } from "../entity/Offer-Period/offer-period-list-entity";
import { OfferPeriodListModel } from "../core/domain/Offer-Period/offer-period-list-model";
import { escapeSelector } from "jquery";
import { OfferPeriodModel } from "../core/domain/Offer-Period/offer-period-model";
import { OfferPeriodEntity } from "../entity/Offer-Period/offer-period-entity";

@Injectable({
    providedIn : 'root',
})

export class OfferPeriodService extends IofferPeriodService {

constructor (private http : HttpClient){
    super()
}

override createOfferPeriod(startDate: string, endDate: string, bannerStartDate: string, bannerEndDate: string,
     isShowTimer: string, isApplyOnAll: string, discountRate: number, offerEndingText: string,
      applicationName: string, isActive: string): Observable<SimpleResponse> {
    
       const url = `${baseUrl}/api/OfferPeriod`;
       return this.http.post<SimpleResponse>(url,{startDate : startDate, endDate : endDate, 
        bannerStartDate : bannerStartDate, bannerEndDate : bannerEndDate, isShowTimer : isShowTimer ==="Yes", 
        isApplyOnAll : isApplyOnAll ==="Yes", discountRate : discountRate , offerEndingText : offerEndingText,
    applicationName : applicationName, isActive : isActive ==="Yes"}).pipe(
        map ((response)=>{
            if(response.status){
                return response.data
            }else{
                throw new Error(response.msg);
            }
        })
       ) 
}

override getOfferPeriodList(): Observable<OfferPeriodListModel[]> {
    const url = `${baseUrl}/api/OfferPeriod`;
    return this.http.get<OfferPeriodListEntity>(url).pipe(
        map ((response)=>{
            if(response.status){
                return response.data;
            }else {
                throw new Error(response.msg);
            }
        })
    )
}


override updateOfferPeriod(id: string, startDate: string, endDate: string, bannerStartDate: string,
     bannerEndDate: string, isShowTimer: string, isApplyOnAll: string, discountRate: number,
      offerEndingText: string, applicationName: string, isActive: string): Observable<SimpleResponse> {
    
        const url = `${baseUrl}/api/OfferPeriod/${id}`;
        return this.http.put<SimpleResponse>(url,{id : id, startDate : startDate, endDate : endDate, bannerStartDate :
            bannerStartDate, bannerEndDate : bannerEndDate, isShowTimer : isShowTimer ==="Yes", 
            isApplyOnAll : isApplyOnAll ==="Yes", discountRate : discountRate ,offerEndingText : offerEndingText,
              applicationName : applicationName, isActive : isActive ==="Yes"}).pipe(
                map ((response)=>{
                    if(response.status){
                        return response.data;
                    }else{
                        throw new Error(response.msg);
                    }
                })
            )
    }
           
        
override deleteOfferPeriod(id: string): Observable<SimpleResponse> {
    
    const url = `${baseUrl}/api/OfferPeriod/${id}`;
    return this.http.delete<SimpleResponse>(url).pipe(
        map ((response)=>{
            if(response.status){
                return response.data;
            }else {
                throw new Error(response.msg);
            }
        })
    )    
}


override getOfferPeriod(id: string): Observable<OfferPeriodModel> {
    const url = `${baseUrl}/api/OfferPeriod/${id}`;
    return this.http.get<OfferPeriodEntity>(url).pipe(
        map ((response)=>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg);
            }
        })
    )
}








}