import { Injectable } from "@angular/core";
import { IPricingFAQService } from "../core/services/I pricing-faq-service";
import { HttpClient } from "@angular/common/http";
import { Observable,map } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { baseUrl } from "../../environement";
import { PricingFAQListModel } from "../core/domain/Pricing-FAQ/pricing-faq-list.model";
import { PricingFAQListEntity } from "../entity/Pricing-FAQ/pricing-faq-list.entity";
import { PricingFAQModel } from "../core/domain/Pricing-FAQ/pricing-faq-model";
import { PricingFAQEntity } from "../entity/Pricing-FAQ/pricing-faq-entity";

@Injectable({
    providedIn : 'root',
})

export class PricingFAQService extends IPricingFAQService{

constructor(private http : HttpClient){
    super()
}

override createPricingFAQ(question: string, answer: string, orderNo: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/PricingFAQ`;
    return this.http.post<SimpleResponse>(url,{question : question, answer : answer, orderNo : orderNo}).pipe(
        map ((response)=>{
         if(response.status){
            return response.data;
         }else{
            throw new Error(response.msg);
         }
        })
    )
}

override getPricingFAQList(): Observable<PricingFAQListModel[]> {
    const url = `${baseUrl}/api/PricingFAQ`;
    return this.http.get<PricingFAQListEntity>(url).pipe(
        map ((response)=>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg);
            }
        })
    )
}

override updatePricingFAQ(id: string, question: string, answer: string, orderNo: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/PricingFAQ/${id}`;
    return this.http.put<SimpleResponse>(url,{id : id, question : question, answer: answer, orderNo : orderNo}).pipe(
        map ((response)=>{
            if(response.status){
                return response.data;
            }else {
                throw new Error(response.msg);
            }
        })
    )
}

override deletePricingFAQ(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/PricingFAQ/${id}`;
    return this.http.delete<SimpleResponse>(url).pipe(
        map ((response)=>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg);
            }
        })
    )
}

override getPricingFAQ(id: string): Observable<PricingFAQModel> {
    const url = `${baseUrl}/api/PricingFAQ/${id}`;
    return this.http.get<PricingFAQEntity>(url).pipe(
        map ((response)=>{
            if(response.status){
                return response.data;
            }else {
                throw new Error(response.msg);
            }
        })
    )
}



}