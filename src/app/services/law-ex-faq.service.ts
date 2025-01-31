import { Injectable } from "@angular/core";
import { ILawExFaqService } from "../core/services/I law-ex-faq-service";
import { HttpClient } from "@angular/common/http";
import { Observable,map } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { baseUrl } from "../../environement";
import { LawExFaqListEntity } from "../entity/Law-Ex-Faq/law-ex-faq-list-entity";
import { LawExFaqListModel } from "../core/domain/Law-Ex-Faq/law-ex-faq-list.model";
import { LawExfaqModel } from "../core/domain/Law-Ex-Faq/law-ex-faq-mode";
import { LawExFaqEntity } from "../entity/Law-Ex-Faq/law-ex-faq-entity";

@Injectable({
    providedIn : 'root',
})

export class LawExFAQService extends ILawExFaqService {

constructor(private http : HttpClient) {
    super()
}

override createLawExfAQ(mId: string, question: string, answer: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/LawExFAQ`;
    return this.http.post <SimpleResponse>(url,{mId : mId, question : question, answer : answer}).pipe(
        map ((response)=>{
            if(response.status){
                return response.data;
            }else {
                throw new Error(response.msg);
            }
        })
    )

}

override getLawExfAQList(): Observable<LawExFaqListModel[]> {
    const url = `${baseUrl}/api/LawExFAQ`;
    return this.http.get<LawExFaqListEntity>(url).pipe(
        map ((response)=>{
            if(response.status){
                return response.data ;
            }else {
                throw new Error(response.msg);
            }
        })
    )
}

override updateLawExfAQ(id: string, mId: string, question: string, answer: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/LawExFAQ/${id}`;
    return this.http.put<SimpleResponse>(url,{id : id, mId : mId , question : question, answer : answer}).pipe(
        map ((response)=>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg);
            }
        })
    )
}

override deleteLawExfAQ(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/LawExFAQ/${id}`;
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


override getLawExfAQ(id: string): Observable<LawExfaqModel> {
    const url = `${baseUrl}/api/LawExFAQ/${id}`
    return this.http.get<LawExFaqEntity>(url).pipe(
        map ((response)=>{
            if(response.status){
                return response.data ;
            }else{
                throw new Error(response.msg);
            }
        })
    )
}

}